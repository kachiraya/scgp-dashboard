import { Typography } from "@mui/material";
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

const Dashboard_2 = () => {
  return (
    <Stack
      minWidth="100vw"
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
        minHeight="360px"
        sx={{
          borderRadius: "10px",
          backgroundColor: "scgGray.gray3",
          overflow: "hidden",
        }}
      >
        <Box display="flex">
          <Box
            minWidth={{ md: "55%", xl: "65%" }}
            display="flex"
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
                overflow: "hidden",
                overflowX: "scroll",
              }}
            >
              <DisplayDataTable />
              <DisplayDataTable />
              <DisplayDataTable />
            </Stack>
          </Box>
          <Box minWidth={"42%"} ml={1} display="flex" flexDirection="column">
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
              <DisplayDataTable total />
              <Stack ml={2} gap={2}>
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
          </Box>
        </Box>
      </Stack>
      {/* upper section */}
      <Stack direction="row" gap={2}>
        <Stack
          mt={5}
          py={3}
          pl={3}
          direction="row"
          minWidth="65%"
          minHeight="360px"
          sx={{
            borderRadius: "10px",
            backgroundColor: "scgGray.gray3",
          }}
        >
          <Stack>
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
              width={370}
              height={270}
              style={{
                marginTop: "16px",
                borderRadius: "20px",
                border: "1px solid #fff",
                objectFit: "cover",
              }}
            />
          </Stack>

          <Stack ml={2}>
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
            <img
              src={agv_example}
              width={370}
              height={270}
              style={{
                marginTop: "16px",
                borderRadius: "20px",
                border: "1px solid #fff",
                objectFit: "cover",
              }}
            />
          </Stack>
        </Stack>

        <Stack
          mt={5}
          py={3}
          pl={3}
          direction="row"
          minWidth="33.6%"
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
