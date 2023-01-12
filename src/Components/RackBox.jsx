import { Stack, Typography } from "@mui/material";
import rackbox_image from "../assets/rackbox_image.svg";
import box_image from "../assets/box_image.svg";
import arrow_up from "../assets/arrow_up.svg";

const RackBox = ({ number, ocNumber }) => {
  return (
    <Stack>
      <Stack
        height={60}
        width={90}
        alignItems="center"
        justifyContent="center"
        sx={{
          background: `url(${rackbox_image}) no-repeat center`,
        }}
      >
        <img src={box_image} />
      </Stack>
      <Stack
        py={2}
        alignItems="center"
        justifyContent="center"
        minHeight={80}
        sx={{
          backgroundColor: "#65B168",
        }}
        gap="8px"
      >
        <Typography fontSize={12} fontWeight={700} color="#292A31">
          {number}
        </Typography>
        <img src={arrow_up} />
        <Typography fontSize={14} fontWeight={700} color="#292A31">
          {ocNumber}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default RackBox;
