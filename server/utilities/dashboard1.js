export const getDifferenceInMinutes = (startDate, endDate) => {
  const _MS_TO_MINUTES = 1000 * 60;
  const start = new Date(startDate);
  const end = new Date(endDate);

  const minutes = (end.getTime() - start.getTime()) / _MS_TO_MINUTES;
  return minutes <= 30 ? minutes : null;
};

export const truckType = {
  SIX_WHEELED: "6 ล้อ",
  TEN_WHEELED: "10 ล้อ",
  TRAILOR: "เทรลเลอร์",
};

export const getAverageSetupTime = (records) => {
  const dataWithSetupTime = records.map((record) => {
    let setupTime = null;
    if (record.STARTPICKING_DATE && record.FINISHPICKING) {
      setupTime = getDifferenceInMinutes(
        record.STARTPICKING_DATE,
        record.FINISHPICKING
      );
    }
    return { ...record, setup_time: setupTime };
  });

  const sixWheeledTruckRecords = dataWithSetupTime.filter(
    (record) =>
      record.TRUCKTYPE === truckType.SIX_WHEELED && record.setup_time !== null
  );
  const sixWheeledTruckAverageTime =
    sixWheeledTruckRecords.reduce((sum, record) => {
      return record.setup_time ? sum + record.setup_time : sum;
    }, 0) /
    (sixWheeledTruckRecords.length > 0 ? sixWheeledTruckRecords.length : 1);

  const tenWheeledTruckRecords = dataWithSetupTime.filter(
    (record) =>
      record.TRUCKTYPE === truckType.TEN_WHEELED && record.setup_time !== null
  );
  const tenWheeledTruckAverageTime =
    tenWheeledTruckRecords.reduce((sum, record) => {
      return record.setup_time ? sum + record.setup_time : sum;
    }, 0) /
    (tenWheeledTruckRecords.length > 0 ? tenWheeledTruckRecords.length : 1);

  const trailorTruckRecords = dataWithSetupTime.filter(
    (record) =>
      record.TRUCKTYPE === truckType.TRAILOR && record.setup_time !== null
  );
  const trailorTruckAverageTime =
    trailorTruckRecords.reduce((sum, record) => {
      return record.setup_time ? sum + record.setup_time : sum;
    }, 0) / (trailorTruckRecords.length > 0 ? trailorTruckRecords.length : 1);

  return {
    [`${truckType.SIX_WHEELED}`]: sixWheeledTruckAverageTime,
    [`${truckType.TEN_WHEELED}`]: tenWheeledTruckAverageTime,
    [`${truckType.TRAILOR}`]: trailorTruckAverageTime,
  };
};

export const getEstimatedTimeStr = (startDate, minutes) => {
  if (!startDate) return null;

  let start = new Date(startDate);
  start.setMinutes(start.getMinutes() + minutes);
  start.setHours(start.getHours() - 7);
  const hours = start.getHours();
  const mins = start.getMinutes();
  return `${hours >= 10 ? hours : "0" + hours}:${
    mins >= 10 ? mins : "0" + mins
  }`;
};

export const formatDateToTimeStr = (date) => {
  if (!date) return null;

  const tempDate = new Date(date);
  tempDate.setHours(tempDate.getHours() - 7);
  const hours = tempDate.getHours();
  const mins = tempDate.getMinutes();
  return `${hours >= 10 ? hours : "0" + hours}:${
    mins >= 10 ? mins : "0" + mins
  }`;
};

export const isToday = (dateStr) => {
  const date = new Date(dateStr);
  const today = new Date();

  if (
    today.getFullYear() === date.getFullYear() &&
    today.getMonth() === date.getMonth() &&
    today.getDate() === date.getDate()
  ) {
    return true;
  }

  return false;
};

export const status = {
  WAITING: "WAITING",
  ONGOING: "ONGOING",
  SUCCESS: "SUCCESS",
  LOADING: "LOADING",
  COMPLETED: "COMPLETED",
};

export const getStatus = (
  start_picking_date,
  finish_picking_date,
  arrive_wh_date,
  exit_wh_date,
  current_status
) => {
  if (current_status || exit_wh_date) {
    return status.COMPLETED;
  } else if (!start_picking_date && !finish_picking_date) {
    return status.WAITING;
  } else if (start_picking_date && !finish_picking_date) {
    return status.ONGOING;
  } else if (start_picking_date && finish_picking_date && !arrive_wh_date) {
    return status.SUCCESS;
  } else if (start_picking_date && finish_picking_date && arrive_wh_date) {
    return status.LOADING;
  } else {
    return null;
  }
};
