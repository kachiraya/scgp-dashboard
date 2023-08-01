import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { unstable_createMuiStrictModeTheme } from "@mui/material/styles";
import { themeConfig } from "./themeConfig";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import Dashboard_1 from "./Pages/Dashboard_1";
import Dashboard_2 from "./Pages/Dashboard_2";
import Dashboard_4 from "./Pages/Dashboard_4";
import Dashboard_5 from "./Pages/Dashboard_5";
import AGVPage from "./Pages/AGVPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard_1 />,
  },
  {
    path: "/dashboard-2",
    element: <Dashboard_2 />,
  },
  {
    path: "/dashboard-4",
    element: <Dashboard_4 />,
  },
  {
    path: "/dashboard-5",
    element: <Dashboard_5 />,
  },
  {
    path: "/agv",
    element: <AGVPage />,
  },
]);

const theme = unstable_createMuiStrictModeTheme(themeConfig);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={themeConfig}>
      <RouterProvider router={router} />
      <ToastContainer />
    </ThemeProvider>
  </React.StrictMode>
);
