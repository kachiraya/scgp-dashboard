import { Box, Stack, Typography } from "@mui/material";
import AppMenuDrawer from "../Components/AppMenuDrawer";
import table_icon from "../assets/table_icon.svg";
import ShipmentTableTitle from "../Components/ShipmentTableTitle";

const Dashboard_5 = () => {
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
      <Stack
        mt={5}
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
            </Stack>
          </Box>
        </Box>
      </Stack>
    </Stack>
  );
};

export default Dashboard_5;
