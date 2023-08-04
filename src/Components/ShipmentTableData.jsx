import { Stack, Typography } from "@mui/material";

export const status = {
  SUCCESS: {
    backgroundColor: "#65B168",
    color: "#2B662E",
    text: "ตั้งเสร็จ",
  },
  ONGOING: {
    backgroundColor: "#FFC147",
    color: "#A37314",
    text: "กำลังตั้ง",
  },
  WAITING: {
    backgroundColor: "#F6655A",
    color: "#9C2B23",
    text: "รอตั้ง",
  },
  LOADING: {
    backgroundColor: "#4F91FF",
    color: "#1B4EA3",
    text: "โหลดสินค้า",
  },
  AVAILABLE: {
    backgroundColor: "#7E7E7E",
    color: "#7E7E7E",
    text: "คิวว่าง",
  },
  COMPLETED: {
    backgroundColor: "#2B8E1F",
    color: "#2B665F",
    text: "เสร็จสิ้น",
  },
};

const ShipmentTableData = ({ data, index }) => {
  return (
    <Stack
      direction="row"
      width={1}
      minHeight={"7vh"}
      sx={{
        backgroundColor: index % 2 === 0 ? "#E1E1E3" : "#F0F0F1",
      }}
    >
      <Stack
        display="flex"
        minHeight={60}
        minWidth={150}
        width={1}
        justifyContent="center"
        alignItems="center"
        sx={{
          backgroundColor: status[`${data?.status}`] ?? "#7E7E7E",
          border: "1px solid #FFF",
        }}
      >
        <Typography fontSize={20} fontWeight={700} color="#F0F0F1">
          {data?.shipment_no ?? "-"}
        </Typography>
      </Stack>
      <Stack
        display="flex"
        minHeight={60}
        minWidth={150}
        width={1}
        justifyContent="center"
        alignItems="center"
        sx={{
          border: "1px solid #FFF",
        }}
      >
        <Typography fontSize={20} fontWeight={600} color="#292A31">
          {data?.forkLift_no ?? "-"}
        </Typography>
      </Stack>
      <Stack
        display="flex"
        minHeight={60}
        minWidth={150}
        width={1}
        justifyContent="center"
        alignItems="center"
        sx={{
          border: "1px solid #FFF",
        }}
      >
        <Typography fontSize={20} fontWeight={600} color="#292A31">
          {data?.sloc ?? "-"}
        </Typography>
      </Stack>
      <Stack
        display="flex"
        minHeight={60}
        minWidth={150}
        width={1}
        justifyContent="center"
        alignItems="center"
        sx={{
          border: "1px solid #FFF",
        }}
      >
        <Typography fontSize={20} fontWeight={600} color="#292A31">
          {data?.pickup_location ?? "-"}
        </Typography>
      </Stack>
      <Stack
        display="flex"
        minHeight={60}
        minWidth={150}
        width={1}
        justifyContent="center"
        alignItems="center"
        sx={{
          border: "1px solid #FFF",
        }}
      >
        <Typography fontSize={20} fontWeight={600} color="#292A31">
          {data?.location ?? "-"}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default ShipmentTableData;
