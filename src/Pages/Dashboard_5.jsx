import { Box, Stack, Typography } from "@mui/material";
import AppMenuDrawer from "../Components/AppMenuDrawer";
import table_icon from "../assets/table_icon.svg";
import truck_loading_icon from "../assets/truck_loading_icon.svg";
import warehouse_icon from "../assets/warehouse_icon.svg";
import product_icon from "../assets/product_icon.svg";
import agv_example from "../assets/example/agv-example.png";
import ShipmentTableTitle from "../Components/ShipmentTableTitle";
import ShipmentTableData from "../Components/ShipmentTableData";
import DummyBox from "../Components/DummyBox";
import RackBox from "../Components/RackBox";

const Dashboard_5 = () => {
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

      <Stack direction="row" gap="16px" minHeight="360px">
        {/* AGV system */}
        <Stack
          mt={5}
          py={3}
          minHeight="45vh"
          pl={3}
          flex={2}
          sx={{
            borderRadius: "10px",
            backgroundColor: "scgGray.gray3",
            overflow: "hidden",
          }}
        >
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
            gap={1}
            sx={{
              backgroundColor: "scgGray.gray3",
              overflow: "hidden",
              overflowX: "scroll",
            }}
          >
            <img
              src={agv_example}
              height={225}
              style={{
                objectFit: "cover",
                minWidth: "425px",
              }}
            />
          </Stack>
        </Stack>
        {/* AGV system */}

        {/* Dummy */}
        <Stack
          mt={5}
          py={3}
          pl={3}
          flex={1.5}
          sx={{
            borderRadius: "10px",
            backgroundColor: "scgGray.gray3",
            overflow: "hidden",
          }}
        >
          <Box minHeight={25} display={"inline-flex"}>
            <img src={warehouse_icon} width="25px" height="25px" />
            <Typography
              ml={1}
              fontSize={14}
              fontWeight={700}
              color="scgGray.gray1"
            >
              Dummy
            </Typography>
          </Box>
          <Stack direction="row" gap="8px" height={"100%"}>
            <Stack flex={1} justifyContent="center">
              <img width={150} height={150} src={warehouse_icon} />
            </Stack>
            <Stack mr={2} flex={1} gap="4px">
              <DummyBox number={"0100441101"} />
              <DummyBox number={"0100441101"} />
              <DummyBox number={"0100441101"} />
            </Stack>
          </Stack>
        </Stack>

        {/* Dummy */}

        {/* Rack */}
        <Stack
          mt={5}
          py={3}
          pl={3}
          flex={2}
          sx={{
            borderRadius: "10px",
            backgroundColor: "scgGray.gray3",
            overflow: "hidden",
          }}
        >
          <Box minHeight={25} display={"inline-flex"}>
            <img src={product_icon} width="25px" height="25px" />
            <Typography
              ml={1}
              fontSize={14}
              fontWeight={700}
              color="scgGray.gray1"
            >
              Rack
            </Typography>
          </Box>
          <Stack mt={3} direction="row" gap="8px">
            <RackBox number="0100441101" ocNumber="oc3" />
            <RackBox number="0100441101" ocNumber="oc3" />
            <RackBox number="0100441101" ocNumber="oc3" />
          </Stack>
        </Stack>
      </Stack>

      {/* Rack */}

      <Stack
        mt={2}
        py={3}
        pl={3}
        direction="row"
        minHeight="360px"
        gap="16px"
        sx={{
          borderRadius: "10px",
          backgroundColor: "scgGray.gray3",
          overflow: "hidden",
        }}
      >
        <Box display="flex">
          <Box minWidth={300} display="flex" flexDirection="column">
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
            <Stack mt={3} direction="row">
              <ShipmentTableTitle />
              <ShipmentTableData
                shipmentNumber="0100441101"
                folkliftNumber="NO.1"
                stockNumber="MIX"
                destination="A1"
              />
              <ShipmentTableData
                shipmentNumber="0100441101"
                folkliftNumber="NO.1"
                stockNumber="MIX"
                destination="A1"
              />
              <ShipmentTableData
                shipmentNumber="0100441101"
                folkliftNumber="NO.1"
                stockNumber="MIX"
                destination="A1"
              />
              <ShipmentTableData
                shipmentNumber="0100441101"
                folkliftNumber="NO.1"
                stockNumber="MIX"
                destination="A1"
              />
            </Stack>
          </Box>
        </Box>
      </Stack>
    </Stack>
  );
};

export default Dashboard_5;
