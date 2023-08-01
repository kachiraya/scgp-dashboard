import { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import TitleTable from "../Components/TitleTable";
import DataTable from "../Components/DataTable";
import AppMenuDrawer from "../Components/AppMenuDrawer";
import { useLocation } from "react-router-dom";
import { apiService } from "../apiService";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../config";

let exampleData = [
  {
    id: 1,
    forkliftNumber: "LXN98000",
    shipmentNo: "0100441101",
    onGoingTime: "08:00",
    expectedTime: "08:45",
    status: "SUCCESS",
    destination: "A1",
  },
];

const emptyData = {
  forkliftNumber: null,
  shipmentNo: null,
  onGoingTime: null,
  expectedTime: null,
  status: null,
  destination: null,
};

const Dashboard_1 = () => {
  const location = useLocation();

  const [count, setCount] = useState(0);
  const [dumpData, setDumpData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    getData();

    const intervalId = setInterval(getData, 5000); // request every 5 secs

    return () => {
      clearInterval(intervalId);
    };
  }, [location]);

  useEffect(() => {
    let lmsData = dumpData ?? [];
    const lmsDataCount = lmsData.length;
    if (lmsDataCount < 10) {
      for (let i = 0; i < 10 - lmsDataCount; i++) {
        lmsData.push(emptyData);
      }
    }

    setDisplayData(lmsData.slice(0, 10));
  }, [dumpData]);

  const getData = () => {
    apiService
      .get(`${API_BASE_URL}/lms-data`)
      .then((response) => {
        const responseData = response.data;
        setCount(responseData.count ?? 0);

        let lmsData = responseData.lmsData ?? [];
        setDumpData(lmsData);

        if (isError) {
          // showInfoToast("Connection Restored")
          setIsError(false);
        }
        setFirstLoad(false);
      })
      .catch((err) => {
        if (isError) return;
        // showErrorToast(err.message);
        setIsError(true);
      });
  };

  const showErrorToast = (message) => {
    toast(message, {
      type: "error",
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const showInfoToast = (message) => {
    toast(message, {
      type: "info",
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

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
      {/* <Stack>
        <AppMenuDrawer />
      </Stack> */}
      <Stack mt={4} alignItems="center">
        <Typography fontSize={32} fontWeight={700}>
          ตารางแสดงสถานะคิวรถสำหรับพนักงานขับรถ
        </Typography>
      </Stack>
      <Stack
        minWidth={900}
        minHeight={400}
        sx={{
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <Typography fontSize={16} fontWeight={700} textAlign="right" mb="8px">
          จำนวนคิวทั้งหมด: {count}
        </Typography>
        <Stack position="relative">
          {firstLoad && (
            <Box
              display="flex"
              position="absolute"
              width="100%"
              height="100%"
              minHeight="45vh"
              sx={{
                backgroundColor: "rgba(0,0,0,0.2)",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backdropFilter: "blur(1px)",
              }}
              justifyContent="center"
              alignItems="center"
            >
              <CircularProgress />
            </Box>
          )}
          <TitleTable />
          {displayData.map((data, i) => (
            <DataTable
              key={`record-${data.id ? data.id : i}`}
              data={data}
              tableId={i + 1}
            />
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Dashboard_1;
