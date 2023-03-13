import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import StatusBox from "./StatusBox";

const DataTable = ({ data, tableId }) => {
  return (
    <Stack
      direction="row"
      minHeight={"7vh"}
      sx={{
        background: tableId % 2 === 0 ? "#fff" : "#F0F0F1",
      }}
    >
      <Stack
        flex={"0 0 calc(100%/7)"}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Typography fontSize={18} fontWeight={700}>
          {tableId}
        </Typography>
      </Stack>
      <Stack
        flex={"0 0 calc(100%/7)"}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Typography fontSize={18} fontWeight={700}>
          {data.truck_id}
        </Typography>
      </Stack>
      <Stack
        flex={"0 0 calc(100%/7)"}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Typography fontSize={18} fontWeight={700}>
          {data.shipment_no}
        </Typography>
      </Stack>
      <Stack
        flex={"0 0 calc(100%/7)"}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Typography fontSize={18} fontWeight={700}>
          {data.picking_date?.start ? data.picking_date?.start : "-"}
        </Typography>
      </Stack>
      <Stack
        flex={"0 0 calc(100%/7)"}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Typography fontSize={18} fontWeight={700}>
          {data.picking_date?.estimate_finish ? data.picking_date?.estimate_finish : "-"}
        </Typography>
      </Stack>
      <Stack
        flex={"0 0 calc(100%/7)"}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <StatusBox data={data.status} />
      </Stack>
      <Stack
        flex={"0 0 calc(100%/7)"}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Typography fontSize={18} fontWeight={700}>
          {data.location ? data.location : "-"}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default DataTable;
