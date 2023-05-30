import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { Avatar, Icon } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SideBarItem from "./SideBarItem";

const drawerWidth = 222;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  backgroundColor: "white",
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  userSelect: "none",
  ...theme.mixins.toolbar,
  justifyContent: "center",
}));

const DtxLayout = ({ render }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(false);

  const profileImg = "no-image.png";
  const currentPage = location?.pathname?.split?.("/")?.[1];

  useEffect(() => {
    setTimeout(() => {
      setOpen(true);
    }, 500);
  }, []);

  const handleDrawerToggle = () => {
    setOpen((prevValue) => !prevValue);
  };

  const handleTestClick = () => {
    navigate("/test", { replace: true });
  };

  const handlePacientesClick = () => {
    navigate("/pacientes", { replace: true });
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{ mr: 2, color: "#39CAB0" }}
          >
            <Icon>menu_open</Icon>
          </IconButton>
          <Box flexGrow={1} />
          <IconButton>
            <Icon sx={{ color: "#39CAB0" }}>notifications</Icon>
          </IconButton>
          <IconButton>
            <Avatar src={profileImg} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <img
            src={"/assets/img/aura.png"}
            alt="Aura"
            onDragStart={(event) => event.preventDefault()}
          />
          <img
            src={"/assets/img/Logo.png"}
            alt="DentelX Logo"
            className="mb-5"
            onDragStart={(event) => event.preventDefault()}
          />
        </DrawerHeader>
        <Divider />
        <List>
          <SideBarItem
            onClick={handlePacientesClick}
            currentPage={currentPage}
            icon={<Icon>groups</Icon>}
            label={"Pacientes"}
            tabId={"pacientes"}
          />
          <SideBarItem
            onClick={handleTestClick}
            currentPage={currentPage}
            icon={<Icon>bug_report</Icon>}
            label={"Test page"}
            tabId={"test"}
          />
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {render}
      </Main>
    </Box>
  );
};

export default DtxLayout;
