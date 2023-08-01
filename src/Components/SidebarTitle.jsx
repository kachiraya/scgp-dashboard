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
      justifyContent="center"
      alignItems={"center"}
      sx={{
        borderRadius: "5px",
        backgroundColor: "scgGray.gray4",
      }}
    >
      {title.map((t, i) => (
        <Stack
          key={i}
          // py={3}
          px={2}
          minWidth={'4vw'}
          width="100%"
          height={i === 3 ? '7vh' : '6vh'} // if conveyor
          alignItems="center"
          justifyContent="center"
          color="#fff"
          border={"1px solid #FFF"}
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
