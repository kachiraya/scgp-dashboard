import express from "express";
import database from "./server.js";
import bodyParser from "body-parser";
import { formatDateToTimeStr, getAverageSetupTime, getEstimatedTimeStr, getStatus, isToday } from "./utilities/dashboard1.js";

const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Add headers before the routes are defined
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

app.get("/lms-data", (request, response) => {
  var request = new database.Request();

  // query to the database and get the records
  request.query("select * from V_LMSDATA", function (err, records) {
    if (err) console.log(err);
    // console.log(records);
    if (!records) {
      console.log("Cannot retrieve record");
      return;
    }

    const data = records?.recordset ?? [];
    const averageSetupTime = getAverageSetupTime(data);
    const todayLMSData = data.filter(
      (record) => record.SHIPMENTDATE && isToday(record.SHIPMENTDATE)
    );
    const uniqueLMSData = [
      ...new Map(todayLMSData.map((item) => [item.SHIPMENTNO, item])).values(),
    ];

    const lmsData = uniqueLMSData.map((record) => {
      const finishTime = record.FINISHPICKING
        ? formatDateToTimeStr(record.FINISHPICKING)
        : getEstimatedTimeStr(
            record.STARTPICKING_DATE,
            averageSetupTime[record.TRUCKTYPE]
          );
      return {
        id: `${record.SHIPMENTNO}-${record.DPNO}`,
        truck_id: record.TRUCKID,
        shipment_no: record.SHIPMENTNO,
        truck_wait_time: formatDateToTimeStr(record.TIMESTATUS2_4),
        picking_date: {
          start: formatDateToTimeStr(record.STARTPICKING_DATE),
          estimate_finish: finishTime,
        },
        status: getStatus(
          record.STARTPICKING_DATE,
          record.FINISHPICKING,
          record.Time_arriveWH,
          record.Time_exitWH
        ),
        location: `A${record.LOCATION_ID}`,
      };
    });
    // filter out records that already exit the warehouse (status > 4 or Time_exitWH exists)
    // const warehouseLMSData = lmsData.filter((record) => { return record.status !== status.COMPLETED })
    const warehouseLMSData =
      lmsData.length > 10
        ? lmsData.slice(lmsData.length - 10, lmsData.length)
        : lmsData;
    response.json({ count: lmsData.length, lmsData: warehouseLMSData });
  });
});

export default app;
