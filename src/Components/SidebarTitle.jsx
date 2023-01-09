import { Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";

const title = [
  "ช่วงเวลา",
  "ฝ่ายผลิต",
  "พื้นที่",
  "Conveyor",
  "Dummy",
  "Export",
];

const SidebarTitle = () => {
  return (
    <Stack
      mr={"2px"}
      justifyContent="center"
      alignItems={"center"}
      sx={{
        borderRadius: "5px",
        backgroundColor: "scgGray.gray4",
        maxWidth: "100px",
        maxHeight: "299px",
      }}
    >
      {title.map((t, i) => (
        <Stack
          key={i}
          py={3}
          px={2}
          minWidth={60}
          height={i === 3 ? 60 : 40}
          alignItems="center"
          justifyContent="center"
          color="#fff"
        >
          <Typography fontSize={14} fontWeight={700}>
            {t}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
};

export default SidebarTitle;
