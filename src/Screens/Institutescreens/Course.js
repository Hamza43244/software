import * as React from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import SMGrid from "../../Components/Smgrid";
import { getFbData } from "../../Config/Firebasemethods";
import { Table } from "react-bootstrap";
import SmButton from "../../Components/Smbutton";



function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Coursename", "maths", "phy", "urdu", "english"),
  createData("Duration", "4 Months", "3 Months", "2 Months", "1 Months"),
  createData("Fees", 4000, 7000, 4000, 3000),
];

export default function Course() {
  const [listData, setlistData] = React.useState([]);


  const navigation = useNavigate();

  const pagegoestoCourseFrom = () => {
    navigation("/Dashboard/Courseform");
  };
  
  let showData = () => {
    getFbData("CourseForm")
      .then((res) => {
        console.log("Data Fetched Successfully  ", res);
        setlistData([...res]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    showData();
  }, []);
  

  const col = [
    {
      displayName: "Action",
      key: "",
        displayField: (e) => (
          <Button
            
            variant="contained"
          >
            View
          </Button>
        ),
        searchAble: true,
    },
    {
      key: "CourseName",
      displayName: "CourseName",
      searchAble: true,
    },
    {
      key: "Duration",
      displayName: "Duration",
      
    },
    {
      key: "fee",
      displayName: "fee",
      
    },

    {
      key: "teacher",
      displayName: "teacher",
    
    },
  ];

  return (
    <>
      {/* <SMGrid datasource={listData} columns={col} /> */}

      <Table bordered hover>
              <thead className="text-center bg-black text-white ">
                <tr>
                  <th>CourseName</th>
                  <th>Duration</th>
                  <th>Fees</th>
                  <th>Teacher</th>
                </tr>
              </thead>
              <tbody className="text-center">
              {listData.map((item, index) => {
                return (
                  
                <tr key={index}>
                  <td>{item.CourseName}</td>
                  <td>{item.Duration}</td>
                  <td>{item.fee}</td>
                  <td>{item.teacher}</td>
                </tr>
                  
                  );
                })}
                </tbody>
            </Table>

      <Box className="my-5 d-flex justify-content-center align-items-center">
        <SmButton label="Course Form" variant="contained" onClick={pagegoestoCourseFrom} />
          
        
      </Box>
    </>
  );
}