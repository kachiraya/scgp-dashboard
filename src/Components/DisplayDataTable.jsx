import { Stack } from "@mui/system";
import DisplayDataBox from "./DisplayDataBox";
import SidebarTitle from "./SidebarTitle";

const DisplayDataTable = ({total}) => {
  return (
    <Stack direction="row">
      <SidebarTitle />
      <Stack direction="column">
        <DisplayDataBox
          ml={"2px"}
          data="8:00"
          width={208}
          height={44}
          backgroundColor="scgGray.gray2"
        />
        <DisplayDataBox
          ml={"2px"}
          data="7"
          width={208}
          height={44}
          backgroundColor="scgOrange.orange2"
          my="2px"
        />

        {/* area */}
        <Stack width={210} gap="3.8px" direction="row">
          <DisplayDataBox
            ml={"1px"}
            data={total ? "FGs" : "Plan"}
            flex={1}
            height={44}
            backgroundColor="scgGray.gray2"
            fonSize={12}
          />
          <DisplayDataBox
            // ml={"2px"}
            data={total ? "Receive" : "Doing"}
            // width={68}
            flex={1}
            height={44}
            backgroundColor="scgGray.gray2"
            fonSize={12}
          />
          <DisplayDataBox
            // ml={"2px"}
            data="Remaining"
            flex={1}
            // width={68}
            height={44}
            backgroundColor="scgGray.gray2"
            fonSize={12}
          />
        </Stack>
        {/* area */}

        {/* Conveyor */}
        <Stack direction="row" my={"2px"} gap="3px">
          <DisplayDataBox
            my={"1px"}
            data="7"
            backgroundColor="scgBlue.blue2"
            height={65}
            width={68}
            color="#DCEDDD"
          />
          <Stack my={"1px"} gap="1px" justifyContent="space-between">
            <DisplayDataBox
              data="5"
              width={68}
              height={32}
              backgroundColor={"scgGreen.green2"}
              color="#DCEDDD"
            />
            <DisplayDataBox
              data="5"
              width={68}
              height={32}
              backgroundColor={"scgGreen.green2"}
              color="#DCEDDD"
            />
          </Stack>
          <DisplayDataBox
            my={"1px"}
            data="7"
            backgroundColor="scgRed.red2"
            height={65}
            width={68}
            color="#DCEDDD"
          />
        </Stack>
        {/* Conveyor */}

        {/* dummy */}
        <Stack width={210} gap="3.8px" direction="row">
          <DisplayDataBox
            my={"1px"}
            data="7"
            backgroundColor="scgBlue.blue2"
            flex={1}
            height={44}
            color="#DCEDDD"
          />
          <DisplayDataBox
            my={"1px"}
            data="7"
            backgroundColor="scgGreen.green2"
            flex={1}
            height={44}
            color="#DCEDDD"
          />
          <DisplayDataBox
            my={"1px"}
            data="7"
            backgroundColor="scgRed.red2"
            flex={1}
            height={44}
            color="#DCEDDD"
          />
        </Stack>
        {/* dummy */}

        {/* export */}
        <Stack width={210} gap="3.8px" direction="row">
          <DisplayDataBox
            my={"1px"}
            data="7"
            backgroundColor="scgBlue.blue2"
            flex={1}
            height={44}
            color="#DCEDDD"
          />
          <DisplayDataBox
            my={"1px"}
            data="7"
            backgroundColor="scgGreen.green2"
            flex={1}
            height={44}
            color="#DCEDDD"
          />
          <DisplayDataBox
            my={"1px"}
            data="7"
            backgroundColor="scgRed.red2"
            flex={1}
            height={44}
            color="#DCEDDD"
          />
        </Stack>
        {/* export */}
      </Stack>
    </Stack>
  );
};

export default DisplayDataTable;
