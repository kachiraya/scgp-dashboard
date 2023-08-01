import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

const DisplayDataBox = ({
  width,
  height,
  backgroundColor,
  data,
  fontSize,
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
      width={width ?? "100%"}
      height={height ?? "100%"}
      justifyContent="center"
      alignItems={"center"}
      sx={{
        backgroundColor: backgroundColor,
        flex:flex
      }}
      border={"1px solid #FFF"}
    >
      <Typography fontSize={fontSize} fontWeight={700} color={color} >
        {data}
      </Typography>
    </Stack>
  );
};

export default DisplayDataBox;
