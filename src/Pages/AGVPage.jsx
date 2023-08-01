import { CircularProgress, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";

import DisplayDataTable from "../Components/DisplayDataTable";
import DisplayRackAndDummyBox from "../Components/DisplayRackAndDummyBox";
import AppMenuDrawer from "../Components/AppMenuDrawer";

import table_icon from "../assets/table_icon.svg";
import warehouse_icon from "../assets/warehouse_icon.svg";
import product_icon from "../assets/product_icon.svg";
import truck_loading_icon from "../assets/truck_loading_icon.svg";
import rollpaper_icon from "../assets/rollpaper_icon.svg";
import wms_example from "../assets/example/wms-example.png";
import agv_example from "../assets/example/agv-example.png";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { apiService } from "../apiService";
import { API_BASE_URL } from "../config";

const AGV_Link = "http://172.29.159.56/#/en/map";

const AGVPage = () => {
  const location = useLocation();

  const [firstLoad, setFirstLoad] = useState(true);
  const [didRotateMap, setDidRotateMap] = useState(false);

  useEffect(() => {
    setFirstLoad(true);

    const intervalId = setInterval(() => {
      getWarehousePercentage();
      getDeliveryData();
    }, 30000); // request every 30 secs

    const iframe = document.getElementById("agv-iframe");
    iframe.addEventListener("load", rotateAGVMapWebView, true);
    // rotateAGVMapWebView();
    return () => {
      clearInterval(intervalId);

      // iframe.removeEventListener("load", () => {
      //   console.log("remove load event");
      // });
    };
  }, [location]);

  const rotateAGVMapWebView = (event) => {
    if (didRotateMap) return;

    // var naturalWidth = event.currentTarget.naturalWidth
    // var naturalHeight = event.currentTarget.naturalHeight

    // const scale = naturalWidth > naturalHeight ? naturalHeight / naturalWidth : 1;
    // const yshift = -100 * scale;
    // const style = `transform:rotate(90deg) translateY(${yshift}%) scale(${scale}); transform-origin: top left;`

    const agvIframeBox = document.getElementById("agv-iframe-box");
    const agvIframe = document.getElementById("agv-iframe");

    const iframeWidth = agvIframeBox.offsetWidth;
    const iframeHeight = agvIframeBox.offsetHeight;
    // console.log(iframeWidth, iframeHeight);
    // agvIframe.style.height = `${340}px`;
    // agvIframe.style.width = `${271}px`;

    // agvIframe.style.height = `${iframeWidth}px !important`;
    // agvIframe.style.width = `${iframeHeight}px !important`;

    // agvIframeBox.style.transform = "rotate(90deg) translateY(100%)";
    // agvIframeBox.style.transformOrigin = "bottom left";
    // agvIframeBox.style.height = iframeWidth;
    // agvIframeBox.style.width = iframeHeight;

    // agvIframeBox.style.height = iframeHeight;
    // agvIframeBox.style.width = iframeWidth;

    var rad = (90 * Math.PI) / 180,
      sin = Math.sin(rad),
      cos = Math.cos(rad);

    var newWidth = Math.abs(iframeWidth * cos) + Math.abs(iframeHeight * sin),
      newHeight = Math.abs(iframeWidth * sin) + Math.abs(iframeHeight * cos);

    console.log(newWidth, newHeight);

    // agvIframe.style.height = `${340}px`;
    // agvIframe.style.width = `${271}px`;

    agvIframe.style.transform = "rotate(90deg) translateX(-240%)";
    // agvIframe.style.transformOrigin = "39vw 60vh";
    agvIframe.style.transformOrigin = "bottom left";

    // agvIframe.style.height = newHeight;
    // agvIframe.style.width = newWidth;

    agvIframe.style.height = `${iframeHeight}px`;
    agvIframe.style.width = `${iframeWidth}px`;

    agvIframeBox.style.height = `${newHeight}px`;
    agvIframeBox.style.width = `${newWidth}px`;

    //  agvIframe.style.height = "100%";
    // agvIframe.style.width = "100%";

    // agvIframe.style = style;

    setDidRotateMap(true);
  };

  const customizeAGVMapWebView = () => {
    console.log("on load iframe completed!");
    const agvIframe = document.getElementById("agv-iframe");

    const agvMapElem = agvIframe.contentWindow?.document?.getElementById("map");
    if (agvMapElem) {
      console.log("map available!");
      agvMapElem.style.transform = "rotate(90deg)";
      agvMapElem.scrollIntoView({
        block: "center",
        inline: "center",
      });
    }

    const agvHeaders =
      agvIframe.contentWindow?.document?.getElementsByClassName(
        "app-Header.app-header-live"
      );
    if (agvHeaders && agvHeaders.length > 0) {
      agvHeaders[0].remove();
    }

    const agvGutters =
      agvIframe.contentWindow?.document?.getElementsByClassName(
        "gutter.gutter-vertical"
      );
    if (agvGutters && agvGutters.length > 0) {
      agvGutters[0].remove();
    }

    const agvTableContainers =
      agvIframe.contentWindow?.document?.getElementsByClassName(
        "table-container"
      );
    if (agvTableContainers && agvTableContainers.length > 0) {
      agvTableContainers[0].remove();
    }

    const agvHistoryLiveToggle =
      agvIframe.contentWindow?.document?.getElementsByClassName(
        "history-live-toggle"
      );
    if (agvHistoryLiveToggle && agvHistoryLiveToggle.length > 0) {
      agvHistoryLiveToggle[0].remove();
    }
  };

  return (
    <Stack
      minHeight="100vh"
      px={3}
      pb={4}
      sx={{
        backgroundColor: "scgGray.gray4",
      }}
    >
      <Stack>
        <AppMenuDrawer mode="dark" />
      </Stack>
      {/* upper section */}
      <Stack
        mt={5}
        py={3}
        pl={3}
        direction="row"
        minHeight="90vh"
        gap="8px"
        sx={{
          borderRadius: "10px",
          backgroundColor: "scgGray.gray3",
          overflowX: "scroll",
        }}
        position="relative"
      >
        <Box display="flex" gap="8px" pr="8px">
          <Box display="flex" flexDirection="column">
          <Box display={"inline-flex"}>
              <img src={truck_loading_icon} width="25px" height="25px" />
              <Typography
                ml={1}
                fontSize={14}
                fontWeight={700}
                color="scgGray.gray1"
              >
                ระบบ AGV
              </Typography>
            </Box>
            <Box
              id="agv-iframe-box"
              display="flex"
              style={{
                marginTop: "16px",
                borderRadius: "20px",
                // border: "1px solid #fff",
              }}
              // sx={{ position: "relative" }}
            //   minHeight={"80vh"}
            //   width="93vw"
              width="80vh"
              height="90vw"
            >
              <iframe
                id="agv-iframe"
                src={AGV_Link}
                align="middle"
                style={{
                  display: "flex",
                  width: "100%",
                  height: "100%",
                  borderRadius: "20px",
                }}
                // onLoadedData={customizeAGVMapWebView}
              />
            </Box>
          </Box>
        </Box>
      </Stack>

      
    </Stack>
  );
};

export default AGVPage;
