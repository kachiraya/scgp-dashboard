import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

const DisplayDataBox = ({
  width,
  height,
  backgroundColor,
  data,
  fonSize,
  my,
  mx,
  ml,
  flex,
  color
}) => {
  return (
    <Stack
      my={my}
      ml={ml}
      width={width}
      height={height}
      justifyContent="center"
      alignItems={"center"}
      sx={{
        backgroundColor: backgroundColor,
        borderRadius: "3px",
        flex:flex
      }}
    >
      <Typography fontSize={fonSize} fontWeight={700} color={color} >
        {data}
      </Typography>
    </Stack>
  );
};

export default DisplayDataBox;
