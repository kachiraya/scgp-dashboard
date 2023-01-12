import { Stack, Typography } from "@mui/material";

const ShipmentTableData = ({
  shipmentNumber,
  folkliftNumber,
  stockNumber,
  destination,
}) => {
  return (
    <Stack
      sx={{
        backgroundColor: "scgGray.gray2",
      }}
    >
      <Stack
        minHeight={76}
        minWidth={110}
        justifyContent="center"
        alignItems="center"
        sx={{
          backgroundColor: "#65B168",
        }}
      >
        <Typography fontSize={14} fontWeight={700} color="#F0F0F1">
          {shipmentNumber}
        </Typography>
      </Stack>
      <Stack
        minHeight={76}
        minWidth={110}
        justifyContent="center"
        alignItems="center"
      >
        <Typography fontSize={16} fontWeight={700} color="#292A31">
          {folkliftNumber}
        </Typography>
      </Stack>
      <Stack
        minHeight={76}
        minWidth={110}
        justifyContent="center"
        alignItems="center"
      >
        <Typography fontSize={16} fontWeight={700} color="#292A31">
          {stockNumber}
        </Typography>
      </Stack>
      <Stack
        minHeight={76}
        minWidth={110}
        justifyContent="center"
        alignItems="center"
      >
        <Typography fontSize={16} fontWeight={700} color="#292A31">
          {destination}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default ShipmentTableData;
