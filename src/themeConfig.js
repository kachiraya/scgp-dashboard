import { createTheme } from "@mui/material/styles";

export const themeConfig = createTheme({
  palette: {
    scgGray: {
      gray1: "#F0F0F1",
      gray2: "#E1E1E3",
      gray3: "#5A5B6A",
      gray4: "#292A31",
    },
    scgBlue: {
      blue1: "#9DC2FF",
      blue2: "#4F91FF",
      blue3: "#2979FF",
      blue4: "#1B4EA3",
    },
    scgGreen: {
      green1: "#A9D3AB",
      green2: "#65B168",
      green3: "#43A047",
      green4: "#2B662E",
    },
    scgOrange: {
      orange1: "#FFDC99",
      orange2: "#FFC147",
      orange3: "#FFB41F",
      orange4: "#A37314",
    },
    scgRed: {
      red1: "#FAA9A3",
      red2: "#F6655A",
      red3: "#F44336",
      red4: "#9C2B23",
    },
  },
  typography: {
    fontFamily: ["Kanit", "Inter", "Roboto", "Arial"].join(","),
  },
  breakpoints: {
    values: {
      xs: 300,
      s: 350,
      sm: 400,
      md: 768,
      lg: 1200,
      xl: 1536,
      xxl: 2560,
    },
  },
});
