/* eslint-disable no-unused-vars */
import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
// import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
// import MuiAppBar from "@mui/material/AppBar";
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
import { Button, Divider } from "@mui/material";
import WelcomeGif from "../images/welcome.gif";
import verified from "../images/verified.png";
import todo from "../images/todo.png";
import welcomeImage from "../images/welcomebw.png";
import bot from "../images/bot.png";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined"; // import Chart from './Chart';
// import Deposits from './Deposits';
// import Orders from './Orders';
import "../css/home.css";
import Typography from "@mui/material/Typography";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import axios from "axios";
import man from "../images/man.png";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import TaskList from "../components/TaskList";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import menai from "../images/menai.png";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import aibot from "../images/aibot.png";
import RestoreIcon from "@mui/icons-material/Restore";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import HistorySidebar from "../components/HistorySidebar";
import Analysis from "../components/Analysis";
import AddButton from "../components/AddTask";


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
//⭐️ WELCOME DIALOG BOX
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

//HISTORY DIALOG
const HistoryDialog = styled(Dialog)(({ theme }) => ({
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
  const navigate = useNavigate();
  //⭐️ STATES
  const [open, setOpen] = React.useState(false);
  const [addTaskOpen, setOsetAddTaskOpen] = React.useState(false);
  const [welcomeOpen, setWelcomeOpen] = React.useState(false);
  const [user, setUser] = useState(null);
  const [todayDate, setTodayDate] = useState("");
  const [verified, setVerified] = useState(false);
  const [autoAwesomeOpen, setAutoAwesomeOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // State to control loading state when generating a task
  const [loadingTask, setLoadingTask] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(false);
  // HISTORY DIALOG
  const [historySidebarOpen, setHistorySidebarOpen] = React.useState(false);

  // AI MODEL OPEN
  const handleOpenAutoAwesome = () => {
    setShowSkeleton(true);
    setAutoAwesomeOpen(true);
  };

  // AI MODEL CLOSE
  const handleCloseAutoAwesome = () => {
    setShowSkeleton(false);
    setAutoAwesomeOpen(false);
  };

  const handleGenerateTask = async () => {
    setLoadingTask(true);
    setShowSkeleton(true);

    try {
      // Call your Google Palm API here to fetch tasks
      // Example:
      // const response = await axios.get("YOUR_API_ENDPOINT");
      // const tasks = response.data;

      // Simulating API call with setTimeout
      setTimeout(() => {
        // Update state to hide skeleton and stop loading
        setShowSkeleton(false);
        setLoadingTask(false);

        // Fetch tasks and do something with them
        // fetchTasks();
      }, 4000); // show skeleton for 4 seconds
    } catch (error) {
      console.error("Error fetching tasks:", error);

      // Update state to hide skeleton and stop loading in case of an error
      setShowSkeleton(false);
      setLoadingTask(false);
    }
  };

  //⭐️ SETTINGS MENU OPEN CLOSE FUNCTIONS
  const handleClickOpensettings = () => {
    setOpen(true);
  };
  const handleClosesettings = () => {
    setOpen(false);
  };

  //⭐️ ADD TASK MENU OPEN CLOSE FUNCTIONS
  const handleClickOpenAddTask = () => {
    setOpen(true);
  };
  const handleCloseAddTask = () => {
    setOpen(false);
  };

  //⭐️ AXIOS GET USE FUNCTION

  const getUser = async () => {
    try {
      const { data } = await axios.get("/api/users/profile");
      setUser(data);
      // console.log(response.data);
      // setVerified(response.data.verified)
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  //⭐️ DRAWER MENU
  // const toggleDrawer = () => {
  //   setOpen(!open);
  // };

  //⭐️ WELCOME MODEL
  //⭐️ USERNAME SET
  //⭐️ TODAYS DATE AND DAY

  useEffect(() => {
    //⭐️ GET USE INFORMATION FUNCTION
    getUser();

    //⭐️ WELCOME POPUP CALLING AND LOCALSTORAGE VALUE SETTING FUNCTION
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

    // const topTodayElement = document.querySelector(".top_today");

    // if (topTodayElement) {
    //   const options = {
    //     weekday: "long",
    //     year: "numeric",
    //     month: "long",
    //     day: "numeric",
    //   };
    //   const todayDate = new Date().toLocaleDateString(undefined, options);

    //   topTodayElement.innerHTML = todayDate;
    // }
  };

  useEffect(() => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const today = new Date().toLocaleDateString(undefined, options);
    setTodayDate(today);
  }, []);

  if (!user) {
    return null;
  }

  const handleLogout = async () => {
    try {
      await axios.get("/api/auth/logout");
      setUser(null);
      toast.success("Logged outt successfully");
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  //   // Move these functions outside
  // const handleHistoryClick = () => {
  //   console.log("HISTORY CLICKED SUCCESSFULLY")
  //   setHistoryDialogOpen(true);
  // };

  // const handleCloseHistoryDialog = () => {
  //   setHistoryDialogOpen(false);
  // };

  const handleHistoryClick = () => {
    setHistorySidebarOpen(true);
  };

  const handleCloseHistorySidebar = () => {
    setHistorySidebarOpen(false);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />

      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            //theme.palette.mode === "light" ? "#f6f9fb" : "white",
            theme.palette.mode === "light" ? "white" : "white",
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Box display="flex" height="100%" >
          {/* Left Section (35%) */}
          <Box width="30%" sx={{ overflowY: 'auto' ,}}>
            <div className="main_outer">
              <div className="top-greetings">
                Welcome <span className="username">{user.name}</span> 👋 !
              </div>
              <div className="top_today">{todayDate}</div>
            </div>
            <Analysis/>
          </Box>

          {/* Space between sections (5%) */}
          <Box width="5%" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
  <div
    style={{
      borderLeft: '1px solid #a7a7a7',
      height: '100%',
      marginLeft: '10px', // Adjust the margin as needed
    }}
  />
</Box>

          {/*🌟 Right Section (60%) */}
          <Box width="60%" backgroundColor="#ffffff">
            <div className="top-right">
              <IconButton color="inherit" onClick={handleOpenAutoAwesome}>
                <Badge
                 style={{
                  height: "40px",
                  width: "40px",
                  borderRadius: "10px",
                  justifyContent: "center",
                  alignItems: "center",
                  border:'1px solid #7a7a7a',
                
                }}
                >
                  <AutoAwesomeIcon
                    style={{ color: "#7a7a7a", fontSize: "20px" }}
                  />
                </Badge>
              </IconButton>

              <HistorySidebar
                open={historySidebarOpen}
                onClose={handleCloseHistorySidebar}
              />

              <IconButton color="inherit" onClick={handleHistoryClick}>
                <Badge
                 style={{
                  height: "40px",
                  width: "40px",
                  borderRadius: "10px",
                  justifyContent: "center",
                  alignItems: "center",
                  border:'1px solid #7a7a7a',
                
                  
                  }}
                >
                  <RestoreIcon  style={{ color: "#7a7a7a", fontSize: "20px" }}/>
                </Badge>
              </IconButton>

              <IconButton color="inherit" onClick={handleClickOpensettings}>
                <Badge
                  style={{
                    height: "40px",
                    width: "40px",
                    borderRadius: "10px",
                    justifyContent: "center",
                    alignItems: "center",
                    border:'1px solid #7a7a7a',
                  
                  
                  }}
                >
                  <DragHandleIcon
                     style={{ color: "#7a7a7a", fontSize: "20px" }}
                  />
                </Badge>
              </IconButton>
            </div>
            
            
            <div style={{paddingTop:'100px',justifyContent:'center'}}>
            {/* <AddButton /> */}
            <TaskList />
            </div>

          </Box>
        </Box>
      </Box>

      {/*-------------------------------DIALOG MODEL CODES BELOW-------------------------------------*/}
      {/* ⭐️ WELCOME DIALOG BOX STARTS */}
      <BootstrapDialog
        onClose={handleClosesettings}
        aria-labelledby="customized-dialog-title"
        open={welcomeOpen}
      >
        <DialogTitle sx={{ m: 3, p: 2 }} id="customized-dialog-title">
          <h1>Welcome 🎉</h1>
          <span
            style={{ color: "grey", fontSize: "20px", marginTop: "-220px" }}
          >
            Your now a member of MERNAI
          </span>
        </DialogTitle>
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
        <DialogContent
          style={{
            marginTop: "-20px",
            marginBottom: "10px",
            width: "550px",
            height: "auto",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {/* <h3>Welcome 🎉, Your now a member of MERNAI</h3> */}
          <br />
          <img src={todo} height="200px" width="200px" />
        </DialogContent>
        <DialogActions>
          {/* <Button autoFocus onClick={handleClosesettings}>
            Continue
          </Button> */}
        </DialogActions>
      </BootstrapDialog>

      {/*⭐️ SETTINGS MODEL */}
      <BootstrapDialogSettings
        onClose={handleClosesettings}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {/* Profile */}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClosesettings}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[10],
          }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent style={{ height: "auto", width: "600px" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img src={man} height="100px" width="100px" />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h2 style={{ textAlign: "center" }}>{user.name}</h2>
            {/* IF VERIFIED VAR TRUE THEN DISPLAY VERIFIED ICON ELSE NOT */}
            {verified && (
              <img
                src={verified}
                style={{ marginLeft: "10px" }}
                height="30px"
                width="30px"
              />
            )}
          </div>
          <h3
            style={{ textAlign: "center", marginTop: "-25px", color: "grey" }}
          >
            {user.email}
          </h3>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              style={{
                cursor: "pointer",
                fontSize: "17px",
                borderRadius: "5px",
                boxShadow: "#1890ff 0px 4px 16px 0px",
                backgroundColor: "#1890ff",
                color: "white",
                border: "none",
                height: "40px",
                width: "130px",
              }}
            >
              Edit Profile
            </button>
            &nbsp;&nbsp;&nbsp;
            <button
              onClick={handleLogout}
              style={{
                cursor: "pointer",
                fontSize: "17px",
                borderRadius: "5px",
                boxShadow: "#f96970 0px 4px 16px 0px",
                border: "2px solid #f96970",
                color: "white",
                backgroundColor: "#f96970",
                height: "40px",
                width: "130px",
              }}
            >
              Logout
            </button>
          </div>
          <br />

          <div style={{ display: "flex", justifyContent: "center" }}></div>
        </DialogContent>
        <DialogActions>
          {/* <Button autoFocus onClick={handleClosesettings}>
            Save Profile
          </Button> */}
        </DialogActions>
      </BootstrapDialogSettings>
      {/* ⭐️ AUTO AWESOME DIALOG BOX */}

      <BootstrapDialogSettings
        onClose={handleCloseAutoAwesome}
        aria-labelledby="auto-awesome-dialog-title"
        open={autoAwesomeOpen}
      >
        <IconButton
          aria-label="close"
          onClick={handleCloseAutoAwesome}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[10],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "auto",
            width: "500px",
            padding: "20px 20px 20px 20px",
          }}
        >
          {/* "Generate Task" button */}
          {!showSkeleton && (
            <DialogActions>
              <Button
                style={{
                  color: "white",
                  boxShadow: "#1890ff 0px 4px 16px 0px",
                  backgroundColor: "#1890ff",
                }}
                autoFocus
                onClick={handleGenerateTask}
              >
                Generate Task 🤖
              </Button>
            </DialogActions>
          )}

          <Button
            style={{
              color: "white",
              boxShadow: "#1890ff 0px 4px 16px 0px",
              backgroundColor: "#1890ff",
            }}
            autoFocus
            onClick={handleGenerateTask}
          >
            Generate Task 🤖
          </Button>
          {setShowSkeleton && (
            <div>
              <Skeleton variant="rectangular" width={400} height={50} />
              <Skeleton variant="rectangular" width={400} height={50} />
              <Skeleton variant="rectangular" width={400} height={50} />
              <Skeleton variant="rectangular" width={400} height={50} />
              <Skeleton variant="rectangular" width={400} height={50} />
            </div>
          )}
        </DialogContent>
      </BootstrapDialogSettings>
    </ThemeProvider>
  );
}
