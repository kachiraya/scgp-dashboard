import express from "express";
import database from "./server.js";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Add headers before the routes are defined
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.get("/lms-data", (request, response) => {
  var request = new database.Request();

  // query to the database and get the records
  request.query("select * from V_LMSDATA", function (err, records) {
    if (err) console.log(err);
    console.log(records);
    const count = records?.rowsAffected[0] ?? 0;
    const data = records.recordset;
    const averageSetupTime = getAverageSetupTime(data);
    const lmsData = data.map((record) => {
      return {
        id: `${record.SHIPMENTNO}-${record.DPNO}`,
        truck_id: record.TRUCKID,
        shipment_no: record.SHIPMENTNO,
        picking_date: {
          start: formatDateToTimeStr(record.STARTPICKING_DATE),
          estimate_finish: getEstimatedTimeStr(
            record.STARTPICKING_DATE,
            averageSetupTime[record.TRUCKTYPE]
          ),
        },
        status: getStatus(
          record.STARTPICKING_DATE,
          record.FINISHPICKING,
          record.Time_arriveWH
        ),
        location: `A${record.LOCATION_ID}`,
      };
    });
    response.json({ count: count, lmsData: lmsData });
  });
});

const getDifferenceInMinutes = (startDate, endDate) => {
  const _MS_TO_MINUTES = 1000 * 60;
  const start = new Date(startDate);
  const end = new Date(endDate);

  const minutes = (end.getTime() - start.getTime()) / _MS_TO_MINUTES;
  return minutes <= 30 ? minutes : null;
};

const truckType = {
  SIX_WHEELED: "6 ล้อ",
  TEN_WHEELED: "10 ล้อ",
  TRAILOR: "เทรลเลอร์",
};

const getAverageSetupTime = (records) => {
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

const getEstimatedTimeStr = (startDate, minutes) => {
  let start = new Date(startDate);
  start.setMinutes(start.getMinutes() + minutes);
  const hours = start.getHours();
  const mins = start.getMinutes();
  return `${hours > 10 ? hours : "0" + hours}:${mins > 10 ? mins : "0" + mins}`;
};

const formatDateToTimeStr = (date) => {
  const tempDate = new Date(date);
  const hours = tempDate.getHours();
  const mins = tempDate.getMinutes();
  return `${hours > 10 ? hours : "0" + hours}:${mins > 10 ? mins : "0" + mins}`;
};

const status = {
  WAITING: "WAITING",
  ONGOING: "ONGOING",
  SUCCESS: "SUCCESS",
  LOADING: "LOADING",
};

const getStatus = (start_picking_date, finish_picking_date, arrive_wh_date) => {
  if (!start_picking_date && !finish_picking_date) {
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

export default app;
