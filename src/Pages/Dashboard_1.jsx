import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import TitleTable from "../Components/TitleTable";
import DataTable from "../Components/DataTable";
import AppMenuDrawer from "../Components/AppMenuDrawer";
import { useLocation } from "react-router-dom";

const status = {
  WAITING: "WAITING",
  ONGOING: "ONGOING",
  SUCCESS: "SUCCESS",
  LOADING: "LOADING"
}

let tempData = [
  {
    id: 1,
    forkliftNumber: "LXN98000",
    shipmentNo: "0100441101",
    onGoingTime: "08:00",
    expectedTime: "08:45",
    status: "SUCCESS",
    destination: "A1",
  },
  {
    id: 2,
    forkliftNumber: "LXN98002",
    shipmentNo: "0100441102",
    onGoingTime: "09:00",
    expectedTime: "09:45",
    status: "SUCCESS",
    destination: "A2",
  },
  {
    id: 3,
    forkliftNumber: "LXN98003",
    shipmentNo: "0100441103",
    onGoingTime: "10:00",
    expectedTime: "10:50",
    status: "ONGOING",
    destination: "-",
  },
  {
    id: 4,
    forkliftNumber: "LXN98004",
    shipmentNo: "0100441104",
    onGoingTime: "11:00",
    expectedTime: "08:45",
    status: "ONGOING",
    destination: "-",
  },
  {
    id: 5,
    forkliftNumber: "LXN98005",
    shipmentNo: "0100441105",
    onGoingTime: "-",
    expectedTime: "-",
    status: "WAITING",
    destination: "-",
  },
  {
    id: 6,
    forkliftNumber: "LXN98006",
    shipmentNo: "0100441106",
    onGoingTime: "12:00",
    expectedTime: "12:45",
    status: "LOADING",
    destination: "A3",
  },
  {
    id: 7,
    forkliftNumber: "LXN98007",
    shipmentNo: "0100441107",
    onGoingTime: "13:00",
    expectedTime: "13:45",
    status: "LOADING",
    destination: "A4",
  },
  {
    id: 8,
    forkliftNumber: "LXN98008",
    shipmentNo: "0100441108",
    onGoingTime: "14:00",
    expectedTime: "14:45",
    status: "ONGOING",
    destination: "-",
  },
  {
    id: 9,
    forkliftNumber: "LXN98009",
    shipmentNo: "0100441109",
    onGoingTime: "-",
    expectedTime: "-",
    status: "WAITING",
    destination: "-",
  },
  {
    id: 10,
    forkliftNumber: "LXN980010",
    shipmentNo: "01004411010",
    onGoingTime: "-",
    expectedTime: "-",
    status: "WAITING",
    destination: "-",
  },
];

const Dashboard_1 = () => {
  const location = useLocation();

  const [count, setCount] = useState(10);
  const [dumpData, setDumpData] = useState(tempData);

  const randomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  useEffect(() => {
    initData();

    const intervalId = setInterval(updateData, 5000);

    return () => {
      clearInterval(intervalId);
    }
  }, [location]);

  useEffect(() => {
    if (dumpData.lenth === 10) return;

    

  }, [dumpData]);

  const initData = () => {
    const data = dumpData.map((data) => {
      let tempData = data;
      let date = new Date();
      date.setMinutes(date.getMinutes() - randomInteger(0, 45));
      tempData.onGoingTime = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
      date.setMinutes(date.getMinutes() + 45);
      tempData.expectedTime = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;

      return tempData
    });

    setDumpData(data);
  }

  function generateOrderID() {
    const min = 1000000000; // minimum value of 10-digit number
    const max = 9999999999; // maximum value of 10-digit number
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNum.toString();
  }
  

  const updateData = () => {
    let tempCount = count + 1;
    // let data = dumpData;
    const filteredData = dumpData.filter((data) => data.status !== "LOADING");

    const dataCount = filteredData.length
    console.log(dataCount)
    let data = filteredData;
    for (let i = 0; i < 10-dataCount; i++) {
      let date = new Date();
      date.setMinutes(date.getMinutes() - randomInteger(0, 45));
      const onGoingTime = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
      date.setMinutes(date.getMinutes() + 45);
      const expectedTime = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;

      let temp = {
        id: tempCount,
        forkliftNumber: `LXN98${randomInteger(1, 9999).toString().padStart(4, '0')}`,
        shipmentNo: generateOrderID(),
        onGoingTime: onGoingTime,
        expectedTime: expectedTime,
        status: "WAITING",
        destination: `A${randomInteger(1, 5)}`,
      }
      data.push(temp); 
      tempCount += 1
    }

    let updatedData = data.map((d) => {
      const shouldUpdateStatus = randomInteger(0, 1) === 0;
      if (!shouldUpdateStatus) return d;

      let tempD = d;
      switch (d.status) {
        case status.WAITING:
          tempD.status = status.ONGOING
          break;
        case status.ONGOING:
          tempD.status = status.SUCCESS
          break;
        case status.SUCCESS:
          tempD.status = status.LOADING
          break;
        default: break;
      }

      return tempD;
    })

    setDumpData(prev => updatedData);
    setCount(prev => tempCount);
  }

  console.log(dumpData)

  return (
    <Stack
      minWidth="100vw"
      minHeight="100vh"
      px={3}
      pb={4}
      sx={{
        backgroundColor: "#D5D5D5",
      }}
    >
      <Stack>
        <AppMenuDrawer />
      </Stack>
      <Stack mt={4} alignItems="center">
        <Typography fontSize={32} fontWeight={700}>
          ตารางแสดงสถานะคิวรถสำหรับพนักงานขับรถ
        </Typography>
      </Stack>
      <Stack
        mt={4}
        minWidth={900}
        minHeight={400}
        sx={{
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <TitleTable />
        {dumpData.map((data, i) => (
          <DataTable key={data.id} data={data} tableId={i+1} />
        ))}
      </Stack>
    </Stack>
  );
};

export default Dashboard_1;
