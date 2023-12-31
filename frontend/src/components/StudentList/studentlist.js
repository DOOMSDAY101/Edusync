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

<<<<<<< HEAD
function createData(id, fullname, gender, birthdate, grade) {
  return { id, fullname, gender, birthdate, grade };
}

const rows = [
  createData(1, "Meklit Abenezer Dereje", "Female", "1/4/2006", "grade 4"),
  createData(2, "Natan Abenezer Dereje", "Male", "2/3/2010", "grade 3"),
  createData(3, "Suleman Mohamed Reshid", "Male", "4/4/1992", "grade 10"),
  createData(4, "Roz Jone Snaw", "Female", "2/4/2002", "grade 8"),
  createData(5, "Eyob Dagne Asefa", "Male", "6/5/2004", "grade 12"),
  createData(6, "Robel Dereje Wakgari", "Male", "2/8/1994", "grade 2"),
  createData(7, "Sulaiman Ifeoluwa Daniel", "Male", "29/3/1994", "grade 6")

];
=======
>>>>>>> d8a51531de1dc92ea85ac21e87a29324e22dc83e
function Studentlist() {
  const [students, setStudents] = useState([]);

  const fetchStudentList = async () => {
    const response = await fetch("http://localhost:1337/api/students", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    if (data.students) {
      setStudents(data.students);
    }
  };

  useEffect(() => {
    fetchStudentList();
  }, []);
  const navigate = useNavigate()

  const edit = ( student) =>{
      if(student){
       navigate("/editStudent/" + student._id);
      }
       
  }

  return (
    <div>
      <h3>Student List</h3>
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
                <TableCell>Grade</TableCell>
                <TableCell>Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow
                  key={student._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    {student.firstName +
                      " " +
                      student.middleName +
                      " " +
                      student.lastName}
                  </TableCell>
                  <TableCell>{student.gender}</TableCell>
                  <TableCell>{student.dateOfBirth}</TableCell>
                  <TableCell>{student.grade}</TableCell>
                  <TableCell>
                      <EditIcon  onClick={()=>edit(student)} /> 
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

export default Studentlist;
