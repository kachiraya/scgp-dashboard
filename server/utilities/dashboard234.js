export const getTimeByHour = (hour) => {
  if (hour >= 10) {
    return `${hour}:00`;
  }
  return `0${hour}:00`;
};

export const getShiftStartEndHours = () => {
  const date = new Date();
  const currentHour = date.getHours();

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
  // FGs/Planning 
  const fGConveyor = plsData.filter(
    (record) =>
      record.Time_Plus1H >= start &&
      record.Time_Plus1H < end &&
      record.Delivery_type === "Domestic" &&
      record.Location === "W9"
  );
  const fGDummy = plsData.filter(
    (record) =>
      record.Time_Plus1H >= start &&
      record.Time_Plus1H < end &&
      record.Delivery_type === "Domestic" &&
      record.Location === "9"
  );
  const fGExport = plsData.filter(
    (record) =>
      record.Time_Plus1H >= start &&
      record.Time_Plus1H < end &&
      record.Delivery_type === "Export" &&
      record.Location === "9"
  );

  const fGConveyorCount = fGConveyor?.length ?? 0;
  const fGDummyCount = fGDummy?.length ?? 0;
  const fGExportCount = fGExport?.length ?? 0;

  // Doing
  const doingPalletConveyor = wmsData.filter((record) => {
    if (!record.whtime) return false;
    const wareHouseTime = new Date(record.whtime);
    const whHour = wareHouseTime.getHours();
    return (
      whHour >= start &&
      whHour < end &&
      record.locaton_name?.includes("-") &&
      record.storage === "W9" &&
      record.pallet_length < 47
      // record.Delivery_type === "Domestic"
    );
  });
  const doingPalletConveyorDummy = wmsData.filter((record) => {
    if (!record.whtime) return false;
    const wareHouseTime = new Date(record.whtime);
    const whHour = wareHouseTime.getHours();
    return (
      whHour >= start &&
      whHour < end &&
      record.locaton_name === "Dummy" &&
      record.storage === "W9" &&
      record.pallet_length < 47
      // record.Delivery_type === "Domestic"
    );
  });
  const doingPalletDummy = wmsData.filter((record) => {
    if (!record.whtime) return false;
    const wareHouseTime = new Date(record.whtime);
    const whHour = wareHouseTime.getHours();
    return (
      whHour >= start &&
      whHour < end &&
      record.locaton_name === "Dummy" &&
      record.storage === "9" &&
      record.pallet_length >= 47
      // record.Delivery_type === "Domestic"
    );
  });
  const doingPalletExport = wmsData.filter((record) => {
    if (!record.whtime) return false;
    const wareHouseTime = new Date(record.whtime);
    const whHour = wareHouseTime.getHours();
    return (
      whHour >= start &&
      whHour < end &&
      record.locaton_name === "Dummy" &&
      record.storage === "9" &&
      record.Delivery_type === "Export" // TODO: confirm
    );
  });

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
    receive: {
      conveyor: doingPalletConveyorCount,
      coveyor_dummy: doingPalletConveyorDummyCount,
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
