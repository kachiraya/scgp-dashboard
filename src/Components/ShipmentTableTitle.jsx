import { Stack, Typography } from "@mui/material";

const tableTextTitle = ["Shipment", "Forklift", "Sloc", "จุดรับสินค้า", "จุดจ่ายสินค้า"];

const ShipmentTableTitle = () => {
  return (
    <Stack
      sx={{
        backgroundColor: "#3A3A44",
      }}
      direction="row"
    >
      {tableTextTitle.map((title, i) => (
        <Stack
          key={i}
          minHeight={60}
          minWidth={150}
          width={1}
          justifyContent="center"
          alignItems="center"
          sx={{
            border: "1px solid #FFF",
            borderTopColor: "transparent"
          }}
        >
          <Typography color="#FFF" fontSize={20} fontWeight={700}>
            {title}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
};

export default ShipmentTableTitle;
