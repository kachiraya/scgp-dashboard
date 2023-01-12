import { Stack, Typography } from "@mui/material";

const DummyBox = ({ number }) => {
  return (
    <Stack
      maxHeight={45}
      flex={1}
      alignItems="center"
      justifyContent="center"
      sx={{
        backgroundColor: "#65B168",
      }}
    >
      <Typography fontSize={16} fontWeight={700} color="#292A31">
        {number}
      </Typography>
    </Stack>
  );
};

export default DummyBox;
