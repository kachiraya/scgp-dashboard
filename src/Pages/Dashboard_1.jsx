import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import TitleTable from "../Components/TitleTable";
import DataTable from "../Components/DataTable";
import AppMenuDrawer from "../Components/AppMenuDrawer";

const dumpData = [
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
          <DataTable key={i} data={data} />
        ))}
      </Stack>
    </Stack>
  );
};

export default Dashboard_1;
