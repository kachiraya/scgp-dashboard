import { Typography } from "@mui/material";
import { Stack } from "@mui/system";

const DisplayRackAndDummyBox = ({ icon, title, pallets, percentage }) => {
  return (
    <Stack
      pt={1}
      minWidth={200}
      minHeight={100}
      height="100%"
      direction="column"
      gap={2}
      alignItems="flex-start"
      justifyContent="center"
      padding="15px 12px"
      sx={{
        border: "5px solid #E1E1E3",
        borderRadius: "10px",
      }}
    >
      <Stack direction="row" alignItems="center">
        <img src={icon} width={"40px"} height={"40px"} />
        <Typography ml={2} fontSize={18} fontWeight={700} color="#E1E1E3">
          {title} :
        </Typography>
        <Typography fontSize={18} fontWeight={700} color="#E1E1E3" ml={1}>
          {pallets} Pallets
        </Typography>
      </Stack>
      <Stack direction="row" alignItems="center">
        <img src={icon} width={"40px"} height={"40px"} />
        <Typography ml={2} fontSize={18} fontWeight={700} color="#E1E1E3">
          {title} :
        </Typography>
        <Typography fontSize={18} fontWeight={700} color="#E1E1E3" ml={1}>
          {percentage} %
        </Typography>
      </Stack>
    </Stack>
  );
};

export default DisplayRackAndDummyBox;
