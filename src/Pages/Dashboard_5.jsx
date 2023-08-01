import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { apiService } from "../apiService";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../config";

import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import AppMenuDrawer from "../Components/AppMenuDrawer";
import table_icon from "../assets/table_icon.svg";
import ShipmentTableTitle from "../Components/ShipmentTableTitle";
import ShipmentTableData from "../Components/ShipmentTableData";

const AGV_Link = "http://172.29.159.56/#/en/map";

const emptyData = {
  forkliftNumber: null,
  shipmentNo: null,
  onGoingTime: null,
  expectedTime: null,
  status: null,
  destination: null,
};

const Dashboard_5 = () => {
  const location = useLocation();

  const [count, setCount] = useState(0);
  const [dumpData, setDumpData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [firstLoad, setFirstLoad] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getData();

    const intervalId = setInterval(getData, 30000); // request every 30 secs

    return () => {
      clearInterval(intervalId);
    };
  }, [location]);

  useEffect(() => {
    let taskAssignData = dumpData ?? [];
    const dataCount = taskAssignData.length;
    if (dataCount < 10) {
      for (let i = 0; i < 10 - dataCount; i++) {
        taskAssignData.push(emptyData);
      }
    }

    setDisplayData(taskAssignData.slice(0, 10));
  }, [dumpData]);

  const getData = () => {
    apiService
      .get(`${API_BASE_URL}/task-assign-data`)
      .then((response) => {
        const responseData = response.data;
        setCount(responseData.count ?? 0);

        let taskAssignData = responseData.taskAssignData ?? [];
        setDumpData(taskAssignData);

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

  return (
    <Stack
      minHeight="100vh"
      px={3}
      pb={4}
      sx={{
        backgroundColor: "scgGray.gray4",
      }}
    >
      <Stack>
        <AppMenuDrawer mode="dark" />
      </Stack>

      <Stack
        mt={2}
        py={3}
        px={3}
        direction="row"
        minHeight="360px"
        gap="16px"
        sx={{
          borderRadius: "10px",
          backgroundColor: "scgGray.gray3",
          overflow: "scroll",
        }}
        position="relative"
      >
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
        <Box display="flex" width={1}>
          <Box
            minWidth={800}
            width={1}
            display="flex"
            flexDirection="column"
            overflow="scroll"
          >
            <Box minHeight={25} display={"inline-flex"}>
              <img src={table_icon} width="20px" height="20px" />
              <Typography
                ml={1}
                fontSize={14}
                fontWeight={700}
                color="scgGray.gray1"
              >
                ตารางแสดงข้อมูลการรับส่งสินค้า
              </Typography>
            </Box>
            <Stack
              mt={3}
              width={1}
              direction="column"
              sx={{
                overflow: "hidden",
                borderRadius: "24px",
                border: "1px solid #FFF",
              }}
            >
              <ShipmentTableTitle />
              {displayData.map((data, index) => {
                return (
                  <ShipmentTableData
                    key={`record-${data.shipmentNo}-${index}`}
                    data={data}
                    index={index}
                  />
                );
              })}
            </Stack>
          </Box>
        </Box>
      </Stack>
    </Stack>
  );
};

export default Dashboard_5;
