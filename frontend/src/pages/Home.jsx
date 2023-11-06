import * as React from "react";
import { useEffect } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
// import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
// import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
// import Container from '@mui/material/Container';
// import Grid from '@mui/material/Grid';
// import Paper from '@mui/material/Paper';
// import MenuIcon from "@mui/icons-material/Menu";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import { sideMenu } from "./SideMenu";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import WelcomeGif from "../images/welcome.gif";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined"; // import Chart from './Chart';
// import Deposits from './Deposits';
// import Orders from './Orders';
import "../css/home.css";
import Typography from "@mui/material/Typography";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const BootstrapDialogSettings = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

// const drawerWidth = 240;

//⭐️ DILOG MODEL
// WELCOME DIALOG BOX
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

// SIDE MENU BAR
// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(["width", "margin"], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(["width", "margin"], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// const Drawer = styled(MuiDrawer, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   "& .MuiDrawer-paper": {
//     position: "relative",
//     whiteSpace: "nowrap",
//     width: drawerWidth,
//     transition: theme.transitions.create("width", {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//     boxSizing: "border-box",
//     ...(!open && {
//       overflowX: "hidden",
//       transition: theme.transitions.create("width", {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.leavingScreen,
//       }),
//       width: theme.spacing(7),
//       [theme.breakpoints.up("sm")]: {
//         width: theme.spacing(9),
//       },
//     }),
//   },
// }));

const defaultTheme = createTheme();

export default function Home() {
  //⭐️ STATES
  const [open, setOpen] = React.useState(false);
  const [welcomeOpen, setWelcomeOpen] = React.useState(false);

  const handleClickOpensettings = () => {
    setOpen(true);
  };
  const handleClosesettings = () => {
    setOpen(false);
  };

  //⭐️ DRAWER MENU
  // const toggleDrawer = () => {
  //   setOpen(!open);
  // };

  //⭐️ WELCOME MODEL
  //⭐️ USERNAME SET
  //⭐️ TODAYS DATE AND DAY
  useEffect(() => {
    const localStorageValue = localStorage.getItem("welcomeOpen");
    if (!localStorageValue || localStorageValue === "false") {
      setWelcomeOpen(true);
      // localStorage.setItem("welcomeOpen", "true");
    }
  }, []);

  const handleClose = () => {
    setWelcomeOpen(false);

    var username = localStorage.getItem("username");
    var usernameInput = document.getElementsByClassName("username")[0];

    if (usernameInput) {
      usernameInput.value = username;
    } else {
      console.log("usernameInput not found");
    }

    const topTodayElement = document.querySelector(".top_today");

    if (topTodayElement) {
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      const todayDate = new Date().toLocaleDateString(undefined, options);

      topTodayElement.textContent = todayDate;
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light" ? "#f5f5f5" : "white",
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          {/* main contents start from here */}
          <div className="main_outer">
            <div className="top-greetings">
              Welcome <span className="username"></span> 👋 !
            </div>
            <div className="top_today"></div>

            <div className="top-right">
            {/* <IconButton color="inherit" style={{ backgroundColor: "white",
                    height: "50px",
                    width: "200px",
                    borderRadius: "5px",
                    paddingLeft:'20px',
                    alignItems: "center",
                    float:'left',
                   
                    }}>
      
                  <KeyboardArrowDownIcon
                    style={{ color: "black", fontSize: "35px", marginLeft:'-130px'}}
                  />
              </IconButton> */}

              <IconButton color="inherit">
                <Badge
                  style={{
                    backgroundColor: "white",
                    height: "50px",
                    width: "50px",
                    borderRadius: "5px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <NotificationsNoneOutlinedIcon
                    style={{ color: "black", fontSize: "30px" }}
                  />
                </Badge>
              </IconButton>

              <IconButton color="inherit" onClick={handleClickOpensettings}>
                <Badge
                  style={{
                    backgroundColor: "white",
                    height: "50px",
                    width: "50px",
                    borderRadius: "5px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <DragHandleIcon
                    style={{ color: "black", fontSize: "35px" }}
                  />
                </Badge>
              </IconButton>
            </div>
          </div>

          <Toolbar />
        </Box>
      </Box>

      {/* ⭐️ WELCOME DIALOG BOX STARTS */}
      <BootstrapDialog
        onClose={handleClosesettings}
        aria-labelledby="customized-dialog-title"
        open={welcomeOpen}
      >
        <DialogTitle
          sx={{ m: 1, p: 2 }}
          id="customized-dialog-title"
        ></DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <img src={WelcomeGif} height="300px" width="300px" />
          {/* <Typography gutterBottom>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros.
          </Typography>
          <Typography gutterBottom>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
          </Typography>
          <Typography gutterBottom>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
            magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
            ullamcorper nulla non metus auctor fringilla.
          </Typography> */}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClosesettings}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>

      {/*⭐️ SETTINGS MODEL */}
      <BootstrapDialogSettings
        onClose={handleClosesettings}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Modal title
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClosesettings}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </Typography>
          <Typography gutterBottom>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
            auctor.
          </Typography>
          <Typography gutterBottom>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
            cursus magna, vel scelerisque nisl consectetur et. Donec sed odio
            dui. Donec ullamcorper nulla non metus auctor fringilla.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClosesettings}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialogSettings>
    </ThemeProvider>
  );
}