import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AssignmentIcon from "@mui/icons-material/Assignment";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const menuItems = [
  { name: "Dashboard 1", path: "/" },
  { name: "Dashboard 2,3", path: "/dashboard-2" },
  { name: "Dashboard 4", path: "/dashboard-4" },
  { name: "Dashboard 5", path: "/dashboard-5" },
  { name: "AGV", path: "/agv" },
];

function AppMenuDrawer({ mode }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const toggleDrawerOpen = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={toggleDrawerOpen}
        edge="start"
        sx={{
          mr: 2,
          top: 16,
          left: 16,
        }}
      >
        <MenuIcon
          sx={{
            color: mode === "dark" ? "#FFF" : "#000",
          }}
        />
      </IconButton>
      <Drawer
        sx={{
          width: 250,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 250,
            boxSizing: "border-box",
            backgroundColor: mode === "dark" ? "#292A31" : "#F4F4F4",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={toggleDrawerOpen}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon
                sx={{ color: mode === "dark" ? "#FFF" : "##5A5B6A" }}
              />
            ) : (
              <ChevronRightIcon
                sx={{ color: mode === "dark" ? "#FFF" : "##5A5B6A" }}
              />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menuItems.map((item, index) => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton onClick={() => navigate(item.path)}>
                <ListItemIcon>
                  <AssignmentIcon
                    sx={{ color: mode === "dark" ? "#F4F4F4" : "##5A5B6A" }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  sx={{ color: mode === "dark" ? "#FFF" : "#292A31" }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
}

export default AppMenuDrawer;
