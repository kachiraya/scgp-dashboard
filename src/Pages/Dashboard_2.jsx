import { CircularProgress, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";

import DisplayDataTable from "../Components/DisplayDataTable";
import DisplayRackAndDummyBox from "../Components/DisplayRackAndDummyBox";
import AppMenuDrawer from "../Components/AppMenuDrawer";

import table_icon from "../assets/table_icon.svg";
import warehouse_icon from "../assets/warehouse_icon.svg";
import product_icon from "../assets/product_icon.svg";
import dummy_icon from "../assets/dummy_icon.svg";
import rollpaper_icon from "../assets/rollpaper_icon.svg";
import wms_example from "../assets/example/wms-example.png";
import agv_example from "../assets/example/agv-example.png";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { apiService } from "../apiService";
import { API_BASE_URL } from "../config";

const Dashboard_2 = () => {
  const location = useLocation();
  const [rackData, setRackdata] = useState(null);
  const [dummyData, setDummydata] = useState(null);
  const [allDeliveryData, setAllDeliveryData] = useState(null);
  const [morningDeliveryData, setMorningDeliveryData] = useState(null);
  const [previousDeliveryData, setPreviousDeliveryData] = useState(null);
  const [currentDeliveryData, setCurrentDeliveryData] = useState(null);
  const [nextDeliveryData, setNextDeliveryData] = useState(null);
  const [firstLoad, setFirstLoad] = useState(true);
  const [didRotateMap, setDidRotateMap] = useState(false);

  useEffect(() => {
    setFirstLoad(true);

    const intervalId = setInterval(() => {
      getWarehousePercentage();
      getDeliveryData();
    }, 30000); // request every 30 secs

    return () => {
      clearInterval(intervalId);

      // iframe.removeEventListener("load", () => {
      //   console.log("remove load event");
      // });
    };
  }, [location]);

  const getDeliveryData = () => {
    apiService
      .get(`${API_BASE_URL}/warehouse-progress`)
      .then((response) => {
        const responseData = response.data;
        console.log(responseData);

        setPreviousDeliveryData(responseData.previousDeliveryData ?? null);
        setCurrentDeliveryData(responseData.currentDeliveryData ?? null);
        setNextDeliveryData(responseData.nextDeliveryData ?? null);

        setAllDeliveryData(responseData.allDeliveryData ?? null);
        setMorningDeliveryData(responseData.morningDeliveryData ?? null);

        // if (isError) {
        // showInfoToast("Connection Restored")
        // setIsError(false);
        // }
        setFirstLoad(false);
      })
      .catch((err) => {
        // if (isError) return;
        // showErrorToast(err.message);
        // setIsError(true);
      });
  };

  const getWarehousePercentage = () => {
    apiService
      .get(`${API_BASE_URL}/warehouse-percentage`)
      .then((response) => {
        const responseData = response.data;

        setRackdata(responseData.rack ?? null);
        setDummydata(responseData.dummy ?? null);

        // if (isError) {
        // showInfoToast("Connection Restored")
        // setIsError(false);
        // }
      })
      .catch((err) => {
        // if (isError) return;
        // showErrorToast(err.message);
        // setIsError(true);
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
      {/* upper section */}
      <Stack
        mt={5}
        py={3}
        pl={3}
        direction="row"
        minHeight="45vh"
        gap="8px"
        sx={{
          borderRadius: "10px",
          backgroundColor: "scgGray.gray3",
          overflowX: "scroll",
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
        <Box display="flex" gap="10px" minWidth="100px">
          <Box minWidth={"50vw"} display="flex" flexDirection="column">
            <Box display={"inline-flex"}>
              <img src={table_icon} width="20px" height="20px" />
              <Typography
                ml={1}
                fontSize={14}
                fontWeight={700}
                color="scgGray.gray1"
              >
                ตารางแสดงข้อมูลการส่งสินค้าทั้งหมดใน 3 ชั่วโมง
              </Typography>
            </Box>
            <Stack
              mt={2}
              direction="row"
              gap={2}
              sx={{
                backgroundColor: "scgGray.gray3",
                // overflow: "hidden",
                overflowX: "scroll",
              }}
            >
              <DisplayDataTable deliveryData={previousDeliveryData} />
              <DisplayDataTable deliveryData={currentDeliveryData} />
              <DisplayDataTable showPlanOnly deliveryData={nextDeliveryData} />
            </Stack>
          </Box>
        </Box>
      </Stack>

      {/* upper section */}

      {/* bottom section */}
      <Stack direction="row" gap={2} position="relative">
        {firstLoad && (
          <Box
            display="flex"
            position="absolute"
            width="100%"
            height="100%"
            minHeight="45vh"
            sx={{
              backgroundColor: "rgba(0,0,0,0.2)",
              top: 10,
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

        <Stack
          display="flex"
          mt={2}
          py={3}
          pl={3}
          direction="row"
          width={1}
          minHeight="40vh"
          sx={{
            borderRadius: "10px",
            backgroundColor: "scgGray.gray3",
          }}
          gap="20px"
        >
          <Box display="flex" flexDirection="column">
            <Box display={"inline-flex"}>
              <img src={table_icon} width="20px" height="20px" />
              <Typography
                ml={1}
                fontSize={14}
                fontWeight={700}
                color="scgGray.gray1"
              >
                ตารางแสดงข้อมูลการส่งสินค้าของกะเช้า
              </Typography>
            </Box>
            <Stack
              mt={2}
              gap={1}
              direction="row"
              sx={{
                backgroundColor: "scgGray.gray3",
              }}
            >
              <DisplayDataTable deliveryData={morningDeliveryData} minWidth="32vw" />
            </Stack>
          </Box>

          <Box width={1}>
            <Box display={"inline-flex"}>
              <img src={table_icon} width="20px" height="20px" />
              <Typography
                ml={1}
                fontSize={14}
                fontWeight={700}
                color="scgGray.gray1"
              >
                ตารางแสดงข้อมูลการส่งสินค้าทั้งหมด
              </Typography>
            </Box>

            <Stack
              mt="14px"
              gap={1}
              direction="row"
              sx={{
                backgroundColor: "scgGray.gray3",
              }}
            >
              <DisplayDataTable
                deliveryData={allDeliveryData}
                isAllDelivery
                minWidth="32vw"
              />
              <Stack ml={2} gap={2}>
                <DisplayRackAndDummyBox
                  icon={warehouse_icon}
                  title="Rack"
                  pallets={rackData?.pallet ?? 0}
                  percentage={rackData?.usagePercent ?? 0}
                />
                <DisplayRackAndDummyBox
                  icon={dummy_icon}
                  title="Dummy"
                  pallets={dummyData?.pallet ?? 0}
                  percentage={dummyData?.usagePercent ?? 0}
                />
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Dashboard_2;
