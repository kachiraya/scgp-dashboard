import { CircularProgress, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";

import DisplayDataTable from "../Components/DisplayDataTable";
import DisplayRackAndDummyBox from "../Components/DisplayRackAndDummyBox";
import AppMenuDrawer from "../Components/AppMenuDrawer";

import table_icon from "../assets/table_icon.svg";
import warehouse_icon from "../assets/warehouse_icon.svg";
import product_icon from "../assets/product_icon.svg";
import truck_loading_icon from "../assets/truck_loading_icon.svg";
import rollpaper_icon from "../assets/rollpaper_icon.svg";
import wms_example from "../assets/example/wms-example.png";
import agv_example from "../assets/example/agv-example.png";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { apiService } from "../apiService";
import { API_BASE_URL } from "../config";

const AGV_Link = "http://172.29.159.56/#/en/map";

const Dashboard_2 = () => {
  const location = useLocation();
  const [rackData, setRackdata] = useState(null);
  const [dummyData, setDummydata] = useState(null);
  const [allDeliveryData, setAllDeliveryData] = useState(null);
  const [previousDeliveryData, setPreviousDeliveryData] = useState(null);
  const [currentDeliveryData, setCurrentDeliveryData] = useState(null);
  const [nextDeliveryData, setNextDeliveryData] = useState(null);
  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    setFirstLoad(true);
    getWarehousePercentage();
    getDeliveryData();
  }, [location]);

  const customizeAGVMapWebView = () => {
    console.log("on load iframe completed!")
    const agvIframe = document.getElementById("agv-iframe");
    
    const agvMapElem = document.getElementById("map");
    if (agvMapElem) {
      console.log("map available!")
      agvMapElem.style.transform = "rotate(90deg)"
      agvMapElem.scrollIntoView({
        block: "center",
        inline: "center"
      })
    }
    
    const agvHeaders = document.getElementsByClassName("app-Header.app-header-live");
    if (agvHeaders && agvHeaders.length > 0) {
      agvHeaders[0].remove();
    }

    const agvGutters = document.getElementsByClassName("gutter.gutter-vertical");
    if (agvGutters && agvGutters.length > 0) {
      agvGutters[0].remove();
    }

    const agvTableContainers = document.getElementsByClassName("table-container");
    if (agvTableContainers && agvTableContainers.length > 0) {
      agvTableContainers[0].remove();
    }

    const agvHistoryLiveToggle = document.getElementsByClassName("history-live-toggle");
    if (agvHistoryLiveToggle && agvHistoryLiveToggle.length > 0) {
      agvHistoryLiveToggle[0].remove();
    }
  }

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

        // if (isError) {
        // showInfoToast("Connection Restored")
        // setIsError(false);
        // }
        setFirstLoad(false);
      })
      .catch((err) => {
        if (isError) return;
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
        if (isError) return;
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
        <Box display="flex" gap="8px" pr="8px">
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
              gap={1}
              sx={{
                backgroundColor: "scgGray.gray3",
                overflow: "hidden",
                overflowX: "scroll",
              }}
            >
              <DisplayDataTable deliveryData={previousDeliveryData} />
              <DisplayDataTable deliveryData={currentDeliveryData} />
              <DisplayDataTable showPlanOnly deliveryData={nextDeliveryData} />
            </Stack>
          </Box>
          <Box display="flex" flexDirection="column">
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
              mt={2}
              gap={1}
              direction="row"
              sx={{
                backgroundColor: "scgGray.gray3",
              }}
            >
              <DisplayDataTable deliveryData={allDeliveryData} isAllDelivery />
              <Stack ml={2} gap={2}>
                <DisplayRackAndDummyBox
                  icon={warehouse_icon}
                  title="Rack"
                  pallets={rackData?.pallet ?? 0}
                  percentage={rackData?.usagePercent ?? 0}
                />
                <DisplayRackAndDummyBox
                  icon={product_icon}
                  title="Dummy"
                  pallets={dummyData?.pallet ?? 0}
                  percentage={dummyData?.usagePercent ?? 0}
                />
              </Stack>
            </Stack>
          </Box>
        </Box>
      </Stack>

      {/* upper section */}
      <Stack direction="row" gap={2}>
        <Stack
          display="flex"
          mt={2}
          py={3}
          pl={3}
          direction="row"
          minWidth="65%"
          minHeight="40vh"
          sx={{
            borderRadius: "10px",
            backgroundColor: "scgGray.gray3",
          }}
        >
          <Stack display="flex" flex={1}>
            <Box display={"inline-flex"}>
              <img src={warehouse_icon} width="25px" height="25px" />
              <Typography
                ml={1}
                fontSize={14}
                fontWeight={700}
                color="scgGray.gray1"
              >
                ระบบ WMS
              </Typography>
            </Box>
            <img
              src={wms_example}
              mt={3}
              width="100%"
              height={"100%"}
              style={{
                marginTop: "16px",
                borderRadius: "20px",
                border: "1px solid #fff",
                objectFit: "cover",
                aspectRatio: "16/9",
              }}
            />
          </Stack>

          <Stack display="flex" flex={1} ml={2} mr={2}>
            <Box display={"inline-flex"}>
              <img src={truck_loading_icon} width="25px" height="25px" />
              <Typography
                ml={1}
                fontSize={14}
                fontWeight={700}
                color="scgGray.gray1"
              >
                ระบบ AGV
              </Typography>
            </Box>
            <Box
              display="flex"
              style={{
                marginTop: "16px",
                borderRadius: "20px",
                border: "1px solid #fff",
              }}
              // sx={{ position: "relative" }}
              height={1}
              width={1}
            >
              <iframe
                id="agv-iframe"
                src={AGV_Link}
                align="middle"
                style={{
                  display: "flex",
                  width: "100%",
                  height: "100%",
                  borderRadius: "20px",
                }}
                onLoad={customizeAGVMapWebView}
              />
            </Box>
          </Stack>
        </Stack>

        <Stack
          mt={2}
          py={3}
          pl={3}
          direction="row"
          flex={1}
          // minWidth="33.6%"
          minHeight="360px"
          sx={{
            borderRadius: "10px",
            backgroundColor: "scgGray.gray3",
          }}
        >
          <Stack>
            <Box display={"inline-flex"}>
              <img src={rollpaper_icon} width="25px" height="25px" />
              <Typography
                ml={1}
                fontSize={14}
                fontWeight={700}
                color="scgGray.gray1"
              >
                Roll Paper
              </Typography>
            </Box>
            {/* <img
              width={370}
              height={270}
              style={{
                marginTop: "16px",
                borderRadius: "20px",
                border: "1px solid #fff",
              }}
            /> */}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Dashboard_2;
