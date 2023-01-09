import { Typography } from "@mui/material";
import { Stack } from "@mui/system";

const DisplayRackAndDummyBox = ({ icon, title, pallets, percentage }) => {
  return (
    <Stack
      pt={1}
      minWidth={195}
      minHeight={100}
      direction="column"
      gap={2}
      alignItems="flex-start"
      padding="15px 12px"
      sx={{
        border: "3px solid #E1E1E3",
        borderRadius: "10px",
      }}
    >
      <Stack direction="row" alignItems="center">
        <img src={icon} width={"30px"} height={"30px"} />
        <Typography ml={2} fontSize={14} fontWeight={700} color="#E1E1E3">
          {title} :
        </Typography>
        <Typography fontSize={14} fontWeight={400} color="#E1E1E3">
          {pallets}
        </Typography>
      </Stack>
      <Stack direction="row" alignItems="center">
        <img src={icon} width={"30px"} height={"30px"} />
        <Typography ml={2} fontSize={14} fontWeight={700} color="#E1E1E3">
          {title} :
        </Typography>
        <Typography fontSize={14} fontWeight={400} color="#E1E1E3">
          {percentage}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default DisplayRackAndDummyBox;
