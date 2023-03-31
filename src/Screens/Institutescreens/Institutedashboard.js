import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Route, Routes, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { checkAuth } from "../../Config/Firebasemethods";
import app from "../../Config/Firebaseconfig";
import LaptopChromebookIcon from "@mui/icons-material/LaptopChromebook";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import GradingIcon from "@mui/icons-material/Grading";
import QuizIcon from "@mui/icons-material/Quiz";
import PersonIcon from "@mui/icons-material/Person";
import Course from "./Course";
import RegistrationControl from "./Registrationcontrol";
import Result from "./Result";
import StudentsList from "./Studentslist";
import Quiz from "./Quiz";
import CourseFrom from "./Courseform";
import Testing from "./Testing";

const auth = getAuth(app);

const drawerWidth = 200;

function InstituteDashboard(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigation = useNavigate();

  const [menuList, setMenuList] = React.useState([
    {
      name: "Course",
      route: "Course",
      icon: <LaptopChromebookIcon />,
    },
    {
      name: "Registration Control",
      route: "Registrationcontrol",
      icon: <AppRegistrationIcon />,
    },
    {
      name: "Result",
      route: "Result",
      icon: <GradingIcon />,
    },
    {
      name: "Students",
      route: "Students",
      icon: <PersonIcon />,
    },
    {
      name: "Quiz",
      route: "Quiz",
      icon: <QuizIcon />,
    },
    // {
    //   name: "Testing",
    //   route: "Testing",
    //   icon: <DocumentScannerIcon />,
    // },
  ]);

  const [user, setUser] = React.useState(null);
  let [loader, setLoader] = React.useState(false);

  React.useEffect(() => {
    setLoader(true);
    checkAuth()
      .then((email) => {
        setUser([...email]);
        setLoader(false);
      })
      .catch((err) => {
        console.log("User not Ligin", err);
      });
  }, []);

  let userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("User Sign Out Successfully");
        navigation("/Login");
      })
      .catch((err) => {
        console.log("User sign out Error", err);
      });
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  let moveScreen = (route) => {
    navigation(route);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {menuList.map((x, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => moveScreen(x.route)}>
              <ListItemIcon>{x.icon}</ListItemIcon>
              <ListItemText primary={x.name} />
            </ListItemButton>
          </ListItem>
        ))}
        <Divider />
        <ListItem className="text-danger link">
          <ListItemIcon onClick={userSignOut}>
            <LogoutIcon className="text-danger" />
          </ListItemIcon>
          <ListItemText onClick={userSignOut}>Sign Out</ListItemText>
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Institute
          </Typography>
          <Typography className="mx-auto" variant="h6" noWrap component="div">
            <div className="d-flex justify-content-center align-items-center text-danger">
              <h4>
                Welcome,
                {user}
              </h4>
            </div>
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />

        <Routes>
          <Route path="/" element={<Course />} />
          <Route path="Course" element={<Course />} />
          <Route path="Registrationcontrol" element={<RegistrationControl />} />
          <Route path="Result" element={<Result />} />
          <Route path="Students" element={<StudentsList />} />
          <Route path="Quiz" element={<Quiz />} />
          <Route path="Courseform" element={<CourseFrom />} />
          {/* <Route path="todos" element={<Todos />} />
          <Route path="User" element={<User />} />
          <Route path="feedback" element={<Feedback />} /> */}
          <Route path="testing" element={<Testing />} />
        </Routes>
      </Box>
    </Box>
  );
}

InstituteDashboard.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default InstituteDashboard;
