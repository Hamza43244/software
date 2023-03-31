import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import SMGrid from "../../Components/Smgrid";
import SmButton from "../../Components/Smbutton";
import SmModal from "../../Components/Smmodal";
import SmInput from "../../Components/Sminput";
import { getFbData, postFbData } from "../../Config/Firebasemethods";

import { Circles } from "react-loader-spinner";
import { Table } from "react-bootstrap";


function Feedback() {
  const [model, setModel] = useState({});
  const [loader, setloader] = useState(false);
  const [listData, setlistData] = useState([]);
  const [displayObj, setdisplayObj] = useState({});
  const [open, setOpen] = useState(false);

  const col = [
    {
      displayName: "Action",
      key: "",
      displayField: (e) => (
        <Button onClick={() => setdisplayObj({ ...e })} variant="contained">
          View
        </Button>
      ),
      searchAble: true,
    },
    {
      key: "userName",
      displayName: "userName",
      searchAble: true,
    },
    {
      key: "email",
      displayName: "email",
      searchAble: true,
    },
    {
      key: "message",
      displayName: "message",
      searchAble: true,
    },
  ];

  console.log(displayObj);

  let saveFeed = () => {
    setloader(true);
    postFbData("Feeds", model)
      .then((res) => {
        console.log("Save SuccessFully !", res);
        setloader(false);
        setOpen(false);
      })
      .catch((err) => {
        console.log(err);
        setloader(false);
      });
  };

  let showData = () => {
    getFbData("Feeds")
      .then((res) => {
        console.log("Data Fetched Successfully  ", res);
        setlistData([...res]);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(displayObj.userName);
  };

  useEffect(() => {
    showData();
    setloader(false);
  }, []);

  return (
    <div>
      <SmModal
        title="User Form"
        innerContent={
          <Box>
            <Box className="my-3">
              <SmInput
                value={model.userName}
                onChange={(e) =>
                  setModel({ ...model, userName: e.target.value })
                }
                label="User Name"
                variant="outlined"
              />
            </Box>
            <Box className="my-3">
              <SmInput
                value={model.email}
                onChange={(e) => setModel({ ...model, email: e.target.value })}
                label="Email"
                variant="outlined"
                type="email"
              />
            </Box>
            <Box className="my-3">
              <SmInput
                value={model.message}
                onChange={(e) =>
                  setModel({ ...model, message: e.target.value })
                }
                label="Message"
                multiline
                rows={4}
              />
            </Box>
          </Box>
        }
        footer={
          <Box align="right">
            <SmButton
              label="Save"
              variant="contained"
              onClick={() => saveFeed(model)}
              loadingPosition="start"
              loading={loader}
              startIcon={<SaveIcon />}
            />
          </Box>
        }
        open={open}
        //close is working in child to parent context
        close={(e) => setOpen(e)}
      />

      <Box>
        <Button
          variant={"contained"}
          onClick={() => {
            setOpen(true);
          }}>
          Add FeedBack
        </Button>
      </Box>

      {/* <Box>
        {listData.map((item, index) => {
          return (
            <>
              <h1>{item.userName}</h1>
              <h1>{item.email}</h1>
              <h1>{item.message}</h1>
            </>
          );
        })}
      </Box> */}

      <Box>
        <Grid container className="my-4">
          <Grid item md={12}>
            <Table bordered hover>
              <thead className="text-center bg-black text-white ">
                <tr>
                  <th>User Name</th>
                  <th>Email</th>
                  <th>Message</th>
                </tr>
              </thead>

              {listData.map((item, index) => {
                return (
                  
                   <tbody className="text-center">
                <tr key={index}>
                  <td>{item.userName}</td>
                  <td>{item.email}</td>
                  <td>{item.message}</td>
                </tr>
              </tbody>
                  
                );
              })}
            </Table>
          </Grid>
          {/* <Grid item md={3} className="p-2">
            <Box
              className="text-center shadow-lg bg-white p-2"
              sx={{ borderRadius: "20px", height: 500 }}
              item
              md={3}
              position="relative">
              <Typography variant="body1" className="fw-bold ">
                NAME :{displayObj.userName}
              </Typography>
              <Typography variant="body1" className="fw-bold">
                E-Mail :{displayObj.email}
              </Typography>

              <Typography variant="body 1" className="fw-bold ">
                Message :{displayObj.message}
              </Typography>
            </Box>
          </Grid> */}
        </Grid>
      </Box>
    </div>
  );
}

export default Feedback;
