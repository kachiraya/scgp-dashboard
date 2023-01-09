import { Stack, Typography } from "@mui/material";

const tableTextTitle = ["Shipment", "Forklift", "Stock", "จุดรับสินค้า"];

const ShipmentTableTitle = () => {
  return (
    <Stack
      sx={{
        backgroundColor: "#3A3A44",
      }}
    >
      {tableTextTitle.map((title, i) => (
        <Stack
          key={i}
          minHeight={76}
          minWidth={90}
          justifyContent="center"
          alignItems="center"
        >
          <Typography color="scgGray.gray1" fontSize={16} fontWeight={700}>
            {title}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
};

export default ShipmentTableTitle;
