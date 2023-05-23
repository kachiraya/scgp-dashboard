import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import AppMenuDrawer from "../Components/AppMenuDrawer";
import truck_loading_icon from "../assets/truck_loading_icon.svg";
import table_icon from "../assets/table_icon.svg";
import wms_example from "../assets/example/wms-example.png";
import agv_example from "../assets/example/agv-example.png";
import camera_icon from "../assets/camera_icon.svg";
import camera_example from "../assets/example/camera-example.png";
import warehouse_icon from "../assets/warehouse_icon.svg";
import product_icon from "../assets/product_icon.svg";
import DisplayDataTable from "../Components/DisplayDataTable";
import DisplayRackAndDummyBox from "../Components/DisplayRackAndDummyBox";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { apiService } from "../apiService";

const CCTV_Link = "http://172.31.170.85";
const AGV_Link = "http://172.29.159.56/#/en/map";

const Dashboard_4 = () => {
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

  const getDeliveryData = () => {
    apiService
      .get("http://localhost:5001/warehouse-progress")
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
      .get("http://localhost:5001/warehouse-percentage")
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
  }

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
        px={3}
        direction="row"
        minHeight="40vh"
        minWidth={"55vw"}
        gap="16px"
        sx={{
          borderRadius: "10px",
          backgroundColor: "scgGray.gray3",
          overflowX: "scroll",
        }}
      >
        {/* web cam1  */}
        <Box display="flex">
          <Box minWidth={300} display="flex" flexDirection="column">
            <Box minHeight={25} display={"inline-flex"}>
              <img src={camera_icon} width="20px" height="20px" />
              <Typography
                ml={1}
                fontSize={14}
                fontWeight={700}
                color="scgGray.gray1"
              >
                SCGWS-Converting-CAM74
              </Typography>
            </Box>
            <Stack
              mt={2}
              direction="row"
              gap={1}
              flex={1}
              sx={{
                backgroundColor: "scgGray.gray3",
              }}
              width="30vw"
            >
              <Box
                display="flex"
                style={{
                  borderRadius: "20px",
                  border: "1px solid #fff",
                }}
                // sx={{ position: "relative" }}
                height={1}
                width={1}
              >
                <iframe
                  src={CCTV_Link}
                  style={{
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    width: "100%",
                    height: "100%",
                    borderRadius: "20px",
                  }}
                />
              </Box>
            </Stack>
          </Box>
        </Box>
        {/* web cam1  */}

        {/* AVG system */}
        <Stack minWidth={"40vw"}>
          <Box minHeight={25} display={"inline-flex"}>
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
          <Stack
            mt={2}
            direction="row"
            flex={1}
            gap={1}
            sx={{
              backgroundColor: "scgGray.gray3",
            }}
          >
            <Box
              display="flex"
              style={{
                borderRadius: "20px",
                border: "1px solid #fff",
              }}
              sx={{ position: "relative" }}
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
              />
            </Box>
          </Stack>
        </Stack>
        {/* AVG system */}

        <Stack minHeight={225} flex={1} maxWidth={220}>
          <Stack minHeight={25} />

          <Stack mt={2} ml={2} gap={2}>
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
      </Stack>

      {/* upper section */}

      <Stack
        mt={2}
        py={3}
        pl={3}
        direction="row"
        minHeight="360px"
        sx={{
          borderRadius: "10px",
          backgroundColor: "scgGray.gray3",
          overflow: "hidden",
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
        <Box display="flex">
          <Box
            // minWidth={{ md: "55%", xl: "65%" }}
            minWidth={"50vw"}
            width={"100%"}
            display="flex"
            flex={2}
            flexDirection="column"
          >
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
              }}
            >
              <DisplayDataTable deliveryData={previousDeliveryData} />
              <DisplayDataTable deliveryData={currentDeliveryData} />
              <DisplayDataTable showPlanOnly deliveryData={nextDeliveryData} />
            </Stack>
          </Box>
          <Box flex={1} ml={1} display="flex" flexDirection="column">
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
                flexWrap: "wrap",
              }}
            >
              <DisplayDataTable deliveryData={allDeliveryData} isAllDelivery />
            </Stack>
          </Box>
        </Box>
      </Stack>
    </Stack>
  );
};

export default Dashboard_4;
