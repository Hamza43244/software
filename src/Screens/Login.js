import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import SmButton from "../Components/Smbutton";
import SmInput from "../Components/Sminput";

import { useNavigate } from "react-router-dom";
import { userLogin, postFbData } from "../Config/Firebasemethods";
import SmSelect from "../Components/Smselect";

const Login = () => {
  const [val, setval] = useState({});
  const [type, setType] = useState({});
  const [loader, setloader] = useState(false);
  let navigation = useNavigate();



  let loginUser = () => {
    setloader(true);
    userLogin(val)
      .then((res) => {
        setloader(false);
        navigation("/Dashboard");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  let handleChange = (event) => {
    postFbData("UserType", type)
      .then((res) => {
        setType({ ...type, userType: event.target.value });
        console.log("userType: " , event.target.value);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {}, []);

 

  return (
    <div>
      <Box
        sx={{ height: "100vh" }}
        className="d-flex justify-content-center align-items-center">
        <Paper className="p-4" elevation={8}>
          <Typography className=" text-center text-primary mb-4" variant="h3">
            <span >
              Login
            </span>
          </Typography>
          <Box className="mt-3">
            <SmInput
              variant="standard"
              label="Enter User Email"
              onChange={(e) => setval({ ...val, email: e.target.value })}
            />
          </Box>
          <Box className="mt-3">
            <SmInput
              variant="standard"
              type="password"
              label="Enter User Password"
              onChange={(e) => setval({ ...val, password: e.target.value })}
            />
          </Box>
          <Box className="mt-3">
            <SmSelect
              onChange={handleChange}
              value={type}
              variant="standard"
              label="User Type"
              item1="Admin"
              item2="Institute"
              item3="Students"
            />
          </Box>
          <Box className="mt-4 d-flex justify-content-center align-items-center">
            <SmButton
              size="large"
              variant="contained"
              loading={loader}
              onClick={loginUser}
              label="Login"
            />
          </Box>
         
         
        </Paper>
      </Box>
    </div>
  );
};

export default Login;
