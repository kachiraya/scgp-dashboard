import { Stack } from "@mui/system";
import DisplayDataBox from "./DisplayDataBox";
import SidebarTitle from "./SidebarTitle";

const DisplayDataTable = ({ deliveryData, isAllDelivery, showPlanOnly, minWidth }) => {
  return (
    <Stack
      direction="row"
      minWidth={minWidth ? minWidth : showPlanOnly ? "20vw" : "35vw"}
      borderRadius="24px"
      overflow="hidden"
      border={"1px solid #FFF"}
    >
      <SidebarTitle />
      <Stack direction="column" width="100%">
        <DisplayDataBox
          data={
            isAllDelivery
              ? `Total (${deliveryData?.time_range ?? "-"})`
              : deliveryData?.time_range ?? "-"
          }
          width={"100%"}
          height={"6vh"}
          backgroundColor="scgGray.gray2"
          fontSize={20}
        />
        <DisplayDataBox
          data={deliveryData?.fg.total_count ?? 0}
          width={"100%"}
          height={"6vh"}
          backgroundColor="scgOrange.orange2"
          fontSize={20}
        />

        {/* area */}
        <Stack width={"100%"} direction="row">
          <DisplayDataBox
            data={isAllDelivery ? "FGs" : "Plan"}
            flex={1}
            height={"6vh"}
            backgroundColor="scgGray.gray2"
            fontSize={16}
          />
          {!showPlanOnly && (
            <>
              <DisplayDataBox
                data={isAllDelivery ? "Receive" : "Doing"}
                // width={68}
                flex={1}
                height={"6vh"}
                backgroundColor="scgGray.gray2"
                fontSize={16}
              />
              <DisplayDataBox
                data="Remaining"
                flex={1}
                // width={68}
                height={"6vh"}
                backgroundColor="scgGray.gray2"
                fontSize={16}
              />
            </>
          )}
        </Stack>
        {/* area */}

        {/* Conveyor */}
        <Stack direction="row" width={"100%"}>
          <DisplayDataBox
            data={deliveryData?.fg?.conveyor ?? 0}
            backgroundColor="scgBlue.blue2"
            // height={65}
            height={"7vh"}
            // width={68}
            flex={1}
            color="#DCEDDD"
            fontSize={18}
          />
          {!showPlanOnly && (
            <>
              <Stack flex={1} justifyContent="space-between">
                <DisplayDataBox
                  data={deliveryData?.doing?.conveyor ?? 0}
                  // width={68}
                  flex={1}
                  height={32}
                  backgroundColor={"scgGreen.green2"}
                  color="#DCEDDD"
                  fontSize={18}
                />
                <DisplayDataBox
                  data={deliveryData?.doing?.conveyor_dummy ?? 0}
                  // width={68}
                  flex={1}
                  height={32}
                  backgroundColor={"scgGreen.green2"}
                  color="#DCEDDD"
                  fontSize={18}
                />
              </Stack>
              <DisplayDataBox
                data={deliveryData?.remaining?.conveyor ?? 0}
                backgroundColor="scgRed.red2"
                // height={65}
                height={"7vh"}
                // width={68}
                flex={1}
                color="#DCEDDD"
                fontSize={18}
              />
            </>
          )}
        </Stack>
        {/* Conveyor */}

        {/* dummy */}
        <Stack width={"100%"} direction="row">
          <DisplayDataBox
            data={deliveryData?.fg?.dummy ?? 0}
            backgroundColor="scgBlue.blue2"
            flex={1}
            // height={44}
            height={"6vh"}
            color="#DCEDDD"
            fontSize={18}
          />
          {!showPlanOnly && (
            <>
              <DisplayDataBox
                data={deliveryData?.doing?.dummy ?? 0}
                backgroundColor="scgGreen.green2"
                flex={1}
                // height={44}
                height={"6vh"}
                color="#DCEDDD"
                fontSize={18}
              />
              <DisplayDataBox
                data={deliveryData?.remaining?.dummy ?? 0}
                backgroundColor="scgRed.red2"
                flex={1}
                // height={44}
                height={"6vh"}
                color="#DCEDDD"
                fontSize={18}
              />
            </>
          )}
        </Stack>
        {/* dummy */}

        {/* export */}
        <Stack width={"100%"} direction="row">
          <DisplayDataBox
            data={deliveryData?.fg?.export ?? 0}
            backgroundColor="scgBlue.blue2"
            flex={1}
            // height={44}
            height={"6vh"}
            color="#DCEDDD"
            fontSize={18}
          />
          {!showPlanOnly && (
            <>
              <DisplayDataBox
                data={deliveryData?.doing?.export ?? 0}
                backgroundColor="scgGreen.green2"
                flex={1}
                // height={44}
                height={"6vh"}
                color="#DCEDDD"
                fontSize={18}
              />
              <DisplayDataBox
                data={deliveryData?.remaining?.export ?? 0}
                backgroundColor="scgRed.red2"
                flex={1}
                // height={44}
                height={"6vh"}
                color="#DCEDDD"
                fontSize={18}
              />
            </>
          )}
        </Stack>
        {/* export */}
      </Stack>
    </Stack>
  );
};

export default DisplayDataTable;
