import { Box, Stack, Typography } from "@mui/material";
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

const Dashboard_4 = () => {
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
            >
              <img
                src={camera_example}
                height={"100%"}
                style={{
                  objectFit: "cover",
                  minWidth: "20vw",
                  aspectRatio: "16/9",
                }}
              />
            </Stack>
          </Box>
        </Box>
        {/* web cam1  */}

        {/* web cam2  */}
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
              flex={1}
              gap={1}
              sx={{
                backgroundColor: "scgGray.gray3",
              }}
            >
              <img
                src={camera_example}
                height={"100%"}
                style={{
                  objectFit: "cover",
                  minWidth: "20vw",
                  aspectRatio: "16/9",
                }}
              />
            </Stack>
          </Box>
        </Box>
        {/* web cam2  */}

        {/* AVG system */}
        <Stack minWidth={"25vw"}>
          <Box minHeight={25} display={"inline-flex"}>
            <img src={truck_loading_icon} width="25px" height="25px" />
            <Typography
              ml={1}
              fontSize={14}
              fontWeight={700}
              color="scgGray.gray1"
            >
              ???????????? AGV
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
            <img
              src={agv_example}
              height={"100%"}
              style={{
                objectFit: "cover",
                minWidth: "31vw",
                aspectRatio: "16/9",
              }}
            />
          </Stack>
        </Stack>
        {/* AVG system */}

        <Stack minHeight={225} flex={1} maxWidth={200}>
          <Stack minHeight={25} />

          <Stack mt={2} ml={2} gap={2}>
            <DisplayRackAndDummyBox
              icon={warehouse_icon}
              title="Rack"
              pallets="13 Pallets"
              percentage="20%"
            />
            <DisplayRackAndDummyBox
              icon={product_icon}
              title="Dummy"
              pallets="13 Pallets"
              percentage="83%"
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
      >
        <Box display="flex">
          <Box
            // minWidth={{ md: "55%", xl: "65%" }}
            minWidth={"65vw"}
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
                ???????????????????????????????????????????????????????????????????????????????????????????????????????????? 3 ?????????????????????
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
              <DisplayDataTable />
              <DisplayDataTable />
              <DisplayDataTable />
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
                ??????????????????????????????????????????????????????????????????????????????????????????????????????
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
              <DisplayDataTable total />
            </Stack>
          </Box>
        </Box>
      </Stack>
    </Stack>
  );
};

export default Dashboard_4;
