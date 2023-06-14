export const getTimeByHour = (hour) => {
  if (hour === 24) {
    return `00:00`;
  } else if (hour >= 10) {
    return `${hour}:00`;
  }
  return `0${hour}:00`;
};

export const getShiftStartEndHours = (currentHour) => {
  if (currentHour >= 7 && currentHour < 16) {
    return { start: 7, end: 16 };
  } else if (currentHour >= 16 && currentHour < 24) {
    return { start: 16, end: 24 };
  } else if (currentHour >= 0 && currentHour < 7) {
    return { start: 0, end: 7 };
  }
  return { start: currentHour, end: currentHour };
};

export const calculateAllWarehouseDelivery = (plsData, wmsData, start, end) => {
  console.log(`start: ${start} -- end: ${end}`);
  // FGs/Planning
  const fGConveyor = plsData.filter((record) => {
    if (!record.User_Create_Date) return false;
    const wareHouseTime = new Date(record.User_Create_Date);
    const createTime = wareHouseTime.getUTCHours() + 1;

    return (
      createTime >= start &&
      createTime < end &&
      record.Delivery_type === "Domestic" &&
      record.Location === "W9"
    );
  });
  const fGDummy = plsData.filter((record) => {
    if (!record.User_Create_Date) return false;
    const wareHouseTime = new Date(record.User_Create_Date);
    const createTime = wareHouseTime.getUTCHours() + 1;
    return (
      createTime >= start &&
      createTime < end &&
      record.Delivery_type === "Domestic" &&
      record.Location === "9"
    );
  });
  const fGExport = plsData.filter((record) => {
    if (!record.User_Create_Date) return false;
    const wareHouseTime = new Date(record.User_Create_Date);
    const createTime = wareHouseTime.getUTCHours() + 1;
    return (
      createTime >= start &&
      createTime < end &&
      record.Delivery_type === "Export" &&
      record.Location === "W9"
    );
  });

  const fGConveyorCount = fGConveyor?.length ?? 0;
  const fGDummyCount = fGDummy?.length ?? 0;
  const fGExportCount = fGExport?.length ?? 0;

  // Doing
  const doingPalletConveyor = wmsData.filter((record) => {
    if (!record.locationtime) return false;
    const wareHouseTime = new Date(record.locationtime);
    const createTime = wareHouseTime.getUTCHours();
    const joinedPlsRecord = getPLSRecordByBatchNoDeliveryType(
      plsData,
      record.batchno,
      "Domestic"
    );
    return (
      joinedPlsRecord &&
      createTime >= start &&
      createTime < end &&
      record.location_name !== "Dummy" &&
      (record.storage === "W9" && joinedPlsRecord.Location === "W9") &&
      record.pallet_length < 47
    );
  });
  console.log("doingPalletConveyor", doingPalletConveyor?.length);

  const doingPalletConveyorDummy = wmsData.filter((record) => {
    if (!record.locationtime) return false;
    const wareHouseTime = new Date(record.locationtime);
    const createTime = wareHouseTime.getUTCHours();
    const joinedPlsRecord = getPLSRecordByBatchNoDeliveryType(
      plsData,
      record.batchno,
      "Domestic"
    );
    return (
      joinedPlsRecord &&
      createTime >= start &&
      createTime < end &&
      record.location_name === "Dummy" &&
      ((record.storage === "W9" &&
        joinedPlsRecord.Location === "W9" &&
        record.pallet_length < 47) ||
        (record.storage === "W9" && joinedPlsRecord.Location === "9"))
    );
  });
  console.log("doingPalletConveyorDummy", doingPalletConveyorDummy?.length);

  const doingPalletDummy = wmsData.filter((record) => {
    if (!record.locationtime) return false;
    const wareHouseTime = new Date(record.locationtime);
    const createTime = wareHouseTime.getUTCHours();
    const joinedPlsRecord = getPLSRecordByBatchNoDeliveryType(
      plsData,
      record.batchno,
      "Domestic"
    );
    return (
      joinedPlsRecord &&
      createTime >= start &&
      createTime < end &&
      record.location_name === "Dummy" &&
      (record.storage === "9" && joinedPlsRecord.Location === "9") &&
      record.pallet_length >= 47
    );
  });
  console.log("doingPalletDummy", doingPalletDummy?.length);
  const doingPalletExport = wmsData.filter((record) => {
    if (!record.locationtime) return false;
    const wareHouseTime = new Date(record.locationtime);
    const createTime = wareHouseTime.getUTCHours();
    const joinedPlsRecord = getPLSRecordByBatchNoDeliveryType(
      plsData,
      record.batchno,
      "Export"
    );
    return (
      joinedPlsRecord &&
      createTime >= start &&
      createTime < end &&
      record.location_name === "Dummy" &&
      (record.storage === "W9" || joinedPlsRecord.Location === "W9")
    );
  });
  console.log("doingPalletExport", doingPalletExport?.length);

  const doingPalletConveyorCount = doingPalletConveyor?.length ?? 0;
  const doingPalletConveyorDummyCount = doingPalletConveyorDummy?.length ?? 0;
  const doingPalletDummyCount = doingPalletDummy?.length ?? 0;
  const doingPalletExportCount = doingPalletExport?.length ?? 0;

  // Remaining
  const remainingConveyorCount =
    fGConveyorCount -
    (doingPalletConveyorCount + doingPalletConveyorDummyCount);
  const remainingDoingCount = fGDummyCount - doingPalletDummyCount;
  const remainingExportCount = fGExportCount - doingPalletExportCount;

  const fgCount = fGConveyorCount + fGDummyCount + fGExportCount;
  const doingCount =
    doingPalletConveyorCount +
    doingPalletConveyorDummyCount +
    doingPalletDummyCount +
    doingPalletExportCount;
  const remainingCount =
    remainingConveyorCount + remainingDoingCount + remainingExportCount;

  return {
    fg: {
      conveyor: fGConveyorCount,
      dummy: fGDummyCount,
      export: fGExportCount,
      total_count: fgCount,
    },
    doing: {
      conveyor: doingPalletConveyorCount,
      conveyor_dummy: doingPalletConveyorDummyCount,
      dummy: doingPalletDummyCount,
      export: doingPalletExportCount,
      total_count: doingCount,
    },
    remaining: {
      conveyor: remainingConveyorCount,
      dummy: remainingDoingCount,
      export: remainingExportCount,
      total_count: remainingCount,
    },
  };
};

const getPLSRecordByBatchNoDeliveryType = (plsData, batchNo, deliveryType) => {
  const result = plsData.find(
    (record) =>
      record.Batch_Number === batchNo && record.Delivery_type === deliveryType
  );
  return result;
};
