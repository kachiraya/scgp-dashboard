import { Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";

export const status = {
  SUCCESS: {
    backgroundColor: "#A9D3AB",
    color: "#2B662E",
    text: "ตั้งเสร็จ",
  },
  ONGOING: {
    backgroundColor: "#FFDC99",
    color: "#A37314",
    text: "กำลังตั้ง",
  },
  WAITING: {
    backgroundColor: "#FAA9A3",
    color: "#9C2B23",
    text: "รอตั้ง",
  },
  LOADING: {
    backgroundColor: "#9DC2FF",
    color: "#1B4EA3",
    text: "โหลดสินค้า",
  },
  AVAILABLE: {
    backgroundColor: "#DCDEE2",
    color: "#7E7E7E",
    text: "คิวว่าง",
  },
};

const StatusBox = ({ data }) => {
  return (
    <Stack
      direction="row"
      minHeight={35}
      minWidth={130}
      pl={"16px"}
      alignItems="center"
      sx={{
        borderRadius: "5px",
        background: status[data] ? status[data]?.backgroundColor : status.AVAILABLE.backgroundColor,
      }}
    >
      <Box
        width={12}
        height={12}
        sx={{
          borderRadius: "50%",
          background: status[data] ? status[data]?.color : status.AVAILABLE.color,
        }}
      />
      <Typography
        ml={"6px"}
        fontSize={18}
        fontWeight={700}
        color={status[data] ? status[data]?.color : status.AVAILABLE.color}
      >
        {status[data] ? status[data]?.text : status.AVAILABLE.text}
      </Typography>
    </Stack>
  );
};

export default StatusBox;
