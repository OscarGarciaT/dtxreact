import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { Avatar, Icon, Typography } from "@mui/material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SideBarItem from "./SideBarItem";
import { useSelector } from "react-redux";

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
  const user = useSelector(({ user }) => user)

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

  const handlePacientesClick = () => {
    navigate("/pacientes", { replace: true });
  };

  const handleCalendarioClick = () => {
    navigate("/calendario", { replace: true });
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{ mr: 2 }}
          >
            <Icon color="primary">menu_open</Icon>
          </IconButton>
          <IconButton>
            <Icon color="primary">notifications</Icon>
          </IconButton>
          <Box flexGrow={1} />
          <Typography color="black">
            {user?.doctor_nombre}
          </Typography>
          <IconButton>
            <Avatar src={profileImg} alt={user?.doctor_nombre} />
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
            src={"/assets/img/curva.png"}
            alt="Aura"
            onDragStart={(event) => event.preventDefault()}
          />
          <img
            src={"/assets/img/iconT2.png"}
            alt="DentelX Logo"
            className="mb-1"
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
            onClick={handleCalendarioClick}
            currentPage={currentPage}
            icon={<CalendarMonthIcon />}
            label={"Calendario"}
            tabId={"calendario"}
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
