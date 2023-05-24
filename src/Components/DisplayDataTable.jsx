import { Stack } from "@mui/system";
import DisplayDataBox from "./DisplayDataBox";
import SidebarTitle from "./SidebarTitle";

const DisplayDataTable = ({ deliveryData, isAllDelivery, showPlanOnly }) => {
  return (
    <Stack direction="row">
      <SidebarTitle />
      <Stack direction="column">
        <DisplayDataBox
          ml={"2px"}
          data={isAllDelivery ? `Total (${deliveryData?.time_range ?? "-"})` : deliveryData?.time_range ?? "-"}
          width={showPlanOnly ? "7vw" : "14vw"}
          height={"6vh"}
          backgroundColor="scgGray.gray2"
        />
        <DisplayDataBox
          ml={"2px"}
          data={deliveryData?.fg.total_count ?? 0}
          width={showPlanOnly ? "7vw" : "14vw"}
          height={"6vh"}
          backgroundColor="scgOrange.orange2"
          my="2px"
        />

        {/* area */}
        <Stack width={showPlanOnly ? "7vw" : "14vw"} ml="2px" gap="3.8px" direction="row">
          <DisplayDataBox
            // ml={"1px"}
            data={isAllDelivery ? "FGs" : "Plan"}
            flex={1}
            height={"6vh"}
            backgroundColor="scgGray.gray2"
            fonSize={12}
          />
          {!showPlanOnly && (
            <>
              <DisplayDataBox
                // ml={"2px"}
                data={isAllDelivery ? "Receive" : "Doing"}
                // width={68}
                flex={1}
                height={"6vh"}
                backgroundColor="scgGray.gray2"
                fonSize={12}
              />
              <DisplayDataBox
                // ml={"2px"}
                data="Remaining"
                flex={1}
                // width={68}
                height={"6vh"}
                backgroundColor="scgGray.gray2"
                fonSize={12}
              />
            </>
          )}
        </Stack>
        {/* area */}

        {/* Conveyor */}
        <Stack ml="2px" direction="row" width={showPlanOnly ? "7vw" : "14vw"} my={"1px"} gap="3.8px">
          <DisplayDataBox
            my={"1px"}
            data={deliveryData?.fg?.conveyor ?? 0}
            backgroundColor="scgBlue.blue2"
            // height={65}
            height={"7vh"}
            // width={68}
            flex={1}
            color="#DCEDDD"
          />
          {!showPlanOnly && (
            <>
              <Stack
                my={"1px"}
                flex={1}
                gap="2px"
                justifyContent="space-between"
              >
                <DisplayDataBox
                  data={deliveryData?.doing?.conveyor ?? 0}
                  // width={68}
                  flex={1}
                  height={32}
                  backgroundColor={"scgGreen.green2"}
                  color="#DCEDDD"
                />
                <DisplayDataBox
                  data={deliveryData?.doing?.conveyor_dummy ?? 0}
                  // width={68}
                  flex={1}
                  height={32}
                  backgroundColor={"scgGreen.green2"}
                  color="#DCEDDD"
                />
              </Stack>
              <DisplayDataBox
                my={"1px"}
                data={deliveryData?.remaining?.conveyor ?? 0}
                backgroundColor="scgRed.red2"
                // height={65}
                height={"7vh"}
                // width={68}
                flex={1}
                color="#DCEDDD"
              />
            </>
          )}
        </Stack>
        {/* Conveyor */}

        {/* dummy */}
        <Stack ml="2px" width={showPlanOnly ? "7vw" : "14vw"} gap="3.8px" direction="row">
          <DisplayDataBox
            my={"1px"}
            data={deliveryData?.fg?.dummy ?? 0}
            backgroundColor="scgBlue.blue2"
            flex={1}
            // height={44}
            height={"6vh"}
            color="#DCEDDD"
          />
          {!showPlanOnly && (
            <>
              <DisplayDataBox
                my={"1px"}
                data={deliveryData?.doing?.dummy ?? 0}
                backgroundColor="scgGreen.green2"
                flex={1}
                // height={44}
                height={"6vh"}
                color="#DCEDDD"
              />
              <DisplayDataBox
                my={"1px"}
                data={deliveryData?.remaining?.dummy ?? 0}
                backgroundColor="scgRed.red2"
                flex={1}
                // height={44}
                height={"6vh"}
                color="#DCEDDD"
              />
            </>
          )}
        </Stack>
        {/* dummy */}

        {/* export */}
        <Stack ml="2px" width={showPlanOnly ? "7vw" : "14vw"} gap="3.8px" direction="row">
          <DisplayDataBox
            my={"1px"}
            data={deliveryData?.fg?.export ?? 0}
            backgroundColor="scgBlue.blue2"
            flex={1}
            // height={44}
            height={"6vh"}
            color="#DCEDDD"
          />
          {!showPlanOnly && (
            <>
              <DisplayDataBox
                my={"1px"}
                data={deliveryData?.doing?.export ?? 0}
                backgroundColor="scgGreen.green2"
                flex={1}
                // height={44}
                height={"6vh"}
                color="#DCEDDD"
              />
              <DisplayDataBox
                my={"1px"}
                data={deliveryData?.remaining?.export ?? 0}
                backgroundColor="scgRed.red2"
                flex={1}
                // height={44}
                height={"6vh"}
                color="#DCEDDD"
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
