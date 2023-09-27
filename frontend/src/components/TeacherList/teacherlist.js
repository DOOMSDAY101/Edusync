import Divider from "@mui/material/Divider";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import Link from "@mui/material/Link";
import  EditIcon  from '@mui/icons-material/Edit';
import {useNavigate } from 'react-router-dom'

function TeacherList() {
  const [teachers, setTeachers] = useState([]);
  const navigate = useNavigate();

  const edit = ( teacher) =>{
      if(teacher){
       navigate("/editTeacher/" + teacher._id);
      }
       
  }

  const fetchTeacherList = async () => {
    const response = await fetch("http://localhost:1337/api/teachers", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    if (data.teachers) {
      setTeachers(data.teachers);
    }
  };

  useEffect(() => {
    fetchTeacherList();
  }, []);

  return (
    <div>
      <h3>Teacher List</h3>
      <div className="row ">
        <div className="input-group mb-3" style={{ width: "400px" }}>
          <input
            type="text"
            className="form-control"
            placeholder="search"
            aria-label="student search"
            aria-describedby="button-addon2"
          />
          <button
            className="btn btn-outline-primary"
            type="button"
            id="button-addon2"
          >
            Search
          </button>
        </div>
      </div>
      <Divider />
      <div className="row">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Full Name</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Birthdate</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teachers.map((teacher) => (
                <TableRow
                  key={teacher._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    {teacher.firstName +
                      " " +
                      teacher.middleName +
                      " " +
                      teacher.lastName}
                  </TableCell>
                  <TableCell>{teacher.gender}</TableCell>
                  <TableCell>{teacher.dateOfBirth}</TableCell>
                  <TableCell>{teacher.email}</TableCell>
                  <TableCell>{teacher.phone}</TableCell>
                  <TableCell>
                      <EditIcon  onClick={()=>edit(teacher)} /> 
                   </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default TeacherList;
