import { Typography } from "@mui/material";
import { Stack } from "@mui/system";

const titleText = [
  "คิวที่",
  "เบอร์รถ",
  "Shipment No.",
  "กำลังตั้งสินค้า",
  "คาดว่าจะตั้งสินค้าเสร็จ",
  "สถานะสินค้า",
  "ท่าที่ขึ้นสินค้า",
];

const TitleTable = () => {
  return (
    <Stack
      direction="row"
      minHeight={"6vh"}
      sx={{
        background: "#292A31",
      }}
    >
      {titleText.map((title, i) => (
        <Stack
          key={i}
          flex={"0 0 calc(100%/7)"}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Typography fontSize={16} fontWeight={700} color="#fff">
            {title}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
};

export default TitleTable;
