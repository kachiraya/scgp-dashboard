import express from "express";
import database from "./server.js";
import bodyParser from "body-parser";
import {
  formatDateToTimeStr,
  getAverageSetupTime,
  getEstimatedTimeStr,
  getStatus,
  isToday,
  status,
} from "./utilities/dashboard1.js";
import {
  calculateAllWarehouseDelivery,
  getPreviousShiftStartEndHours,
  getShiftStartEndHours,
  getTimeByHour,
} from "./utilities/dashboard234.js";

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
      console.log("Cannot retrieve LMS records");
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

    const processingLMSData = lmsData.filter((record) => {
      return record.status !== status.COMPLETED;
    });
    const completedLMSData = lmsData.filter((record) => {
      return record.status === status.COMPLETED;
    });
    const warehouseLMSData =
      processingLMSData > 10
        ? processingLMSData.slice(0, 10)
        : completedLMSData
            .slice(
              completedLMSData.length - (10 - processingLMSData.length),
              completedLMSData.length
            )
            .concat(processingLMSData);
    // const warehouseLMSData =
    //   lmsData.length > 10
    //     ? lmsData.slice(lmsData.length - 10, lmsData.length)
    //     : lmsData;
    response.json({ count: lmsData.length, lmsData: warehouseLMSData });
  });
});

app.get("/warehouse-progress", async (request, response) => {
  var request = new database.Request();

  const date = new Date();
  const currentHour = date.getHours();

  const [plsTableData, wmsTableData] = await Promise.all([
    request.query(
      "select Time_Plus1H, Delivery_type, Location, User_Create_Date, Batch_Number from V_PLSData"
    ),
    // WMS: today's record
    request.query(
      currentHour >= 8
        ? "select cre_date, location_name, storage, pallet_length, batchno, locationtime from V_STOCKWMS WHERE CAST(cre_date AS DATE) = CAST(GETDATE() AS DATE) AND location_name != 'PROD' ORDER BY locationtime"
        : "select cre_date, location_name, storage, pallet_length, batchno, locationtime from V_STOCKWMS WHERE CAST(cre_date AS DATE) between CAST( GETDATE() -1 AS DATE) and CAST( GETDATE() AS DATE) AND location_name != 'PROD' ORDER BY locationtime"
    ),
  ]);

  const plsData = plsTableData.recordset ?? [];
  const wmsData = wmsTableData.recordset ?? [];

  const { start, end } = getShiftStartEndHours(currentHour);
  console.log("current hour", currentHour);
  const deliveryData = calculateAllWarehouseDelivery(
    plsData,
    wmsData,
    start,
    end
  );
  const allDeliveryData = {
    time_range: `${getTimeByHour(start)}-${getTimeByHour(end)}`,
    ...deliveryData,
  };

  const { start: previousShiftStart, end: previousShiftEnd } =
    getPreviousShiftStartEndHours(currentHour);
  const previousShiftData = calculateAllWarehouseDelivery(
    plsData,
    wmsData,
    previousShiftStart,
    previousShiftEnd
  );
  const previousShiftDeliveryData = {
    time_range: `${getTimeByHour(previousShiftStart)}-${getTimeByHour(
      previousShiftEnd
    )}`,
    ...previousShiftData,
  };

  const previousData = calculateAllWarehouseDelivery(
    plsData,
    wmsData,
    currentHour - 1,
    currentHour
  );
  const previousDeliveryData = {
    time_range: `${getTimeByHour(currentHour - 1)}-${getTimeByHour(
      currentHour
    )}`,
    ...previousData,
  };

  let currentData = calculateAllWarehouseDelivery(
    plsData,
    wmsData,
    currentHour,
    currentHour + 1
  );
  currentData.remaining.conveyor =
    currentData.remaining.conveyor + previousData.remaining.conveyor;
  currentData.remaining.dummy =
    currentData.remaining.dummy + previousData.remaining.dummy;
  currentData.remaining.export =
    currentData.remaining.export + previousData.remaining.export;
  const currentDeliveryData = {
    time_range: `${getTimeByHour(currentHour)}-${getTimeByHour(
      currentHour + 1
    )}`,
    ...currentData,
  };

  const nextData = calculateAllWarehouseDelivery(
    plsData,
    wmsData,
    currentHour + 1,
    currentHour + 2
  );
  const nextDeliveryData = {
    time_range: `${getTimeByHour(currentHour + 1)}`,
    ...nextData,
  };

  response.json({
    previousDeliveryData: previousDeliveryData,
    currentDeliveryData: currentDeliveryData,
    nextDeliveryData: nextDeliveryData,
    allDeliveryData: allDeliveryData,
    previousShiftDeliveryData: previousShiftDeliveryData,
  });
});

app.get("/warehouse-percentage", async (request, response) => {
  var request = new database.Request();

  const [percentUsageData, palletDummyUsageData] = await Promise.all([
    request.query("select * from V_PercentUsage"),
    request.query("select * from V_PalletDummy"),
  ]);

  // rack
  const percentageData =
    percentUsageData.recordset?.length > 0
      ? percentUsageData.recordset[0]
      : null;
  const rackData = {
    pallet: percentageData?.ToatlPallets ?? 0,
    usagePercent: percentageData["%usage"] ?? 0,
  };

  // dummy
  const dummyUsageData =
    palletDummyUsageData.recordset?.length > 0
      ? palletDummyUsageData.recordset[0]
      : null;
  const dummyData = {
    pallet: dummyUsageData["Act Pallet"] ?? 0,
    usagePercent: dummyUsageData["% Use"] ?? 0,
  };

  response.json({
    rack: rackData,
    dummy: dummyData,
  });
});

app.get("/task-assign-data", async (request, response) => {
  var request = new database.Request();

  const [lmsTableData, taskAssignTableData] = await Promise.all([
    request.query("select * from V_LMSDATA"),
    // Task Assign
    request.query("select * from V_TaskAssign"),
  ]);

  const data = lmsTableData?.recordset ?? [];
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

  const processingLMSData = lmsData.filter((record) => {
    return record.status !== status.COMPLETED;
  });
  const completedLMSData = lmsData.filter((record) => {
    return record.status === status.COMPLETED;
  });
  const warehouseLMSData =
    processingLMSData > 10
      ? processingLMSData.slice(0, 10)
      : completedLMSData
          .slice(
            completedLMSData.length - (10 - processingLMSData.length),
            completedLMSData.length
          )
          .concat(processingLMSData);

  const taskAssignData = taskAssignTableData?.recordset ?? [];
  const taskAssignList = warehouseLMSData.map((record) => {
    let taskAssignRecords = taskAssignData.reduce((prev, curr) => {
      if (curr.ShipmentNo === record.shipment_no) {
        const status =
        curr.Status === "MIX" || prev.sloc === "MIX"
            ? "MIX"
            : curr.Status;
        const pickupLocation = curr.GI_Conveyor && prev.pickup_location
          ? [prev.pickup_location, curr.GI_Conveyor].join("+")
          : curr.GI_Conveyor;
        return {
          shipment_no: curr.ShipmentNo,
          forkLift_no: curr.CarCode,
          sloc: status,
          pickup_location: pickupLocation,
        };
      }
      return prev;
    }, {});

    if (taskAssignRecords.sloc === "MIX") {
      taskAssignRecords.pickup_location = `${taskAssignRecords.pickup_location}+Dummy`
    }
    return { ...record, ...taskAssignRecords };
  });

  response.json({ count: lmsData.length, taskAssignData: taskAssignList });
});

export default app;
