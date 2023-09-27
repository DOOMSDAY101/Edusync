import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useLocation, useParams } from 'react-router-dom';
import { useEffect } from "react";

function EditStudent() {
  const [stud, setStud] = useState({
    firstName:'',lastName:'',middleName:'',
    grade:'',gender:'',dateOfBirth:null
  });

  const id = useParams().id;

  const fetchStudentList = async () => {
    const response = await fetch('http://localhost:1337/api/student/' + id, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    if (data.student) {
      const student = data.student;
      setStud({...stud,firstName:student.firstName,
        middleName:student.middleName, gender:student.gender,
        grade:student.grade})
    }
  };

  useEffect(() => {
    fetchStudentList();
  }, []);
  

  const onHandleUpdate = (event) => {
    event.preventDefault();
    updateStudent();
  };
  const updateStudent = async () => {
    const response = await fetch("http://localhost:1337/api/student/" + id, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        firstName:stud.firstName,
        middleName:stud.middleName,
        lastName:stud.lastName,
        gender:stud.gender,
        grade:stud.grade,
        dateOfBirth:stud.dateOfBirth,
      }),
    });
    const data = await response.json(); console.log(data);
    if (data.student) {
      window.location.href = "/studentlist";
    } else {
      alert("error on updating data");
    }
  };

  return (
    <div>
      <h3>Student Detail</h3>
      <div className="row">
        <div className="col-6">
          {/* left side */}
          <div className="row mb-3">
            <label className="col-sm-3 col-form-label">First Name</label>
            <div className="col-sm-8">
              <input
                type="firstname"
                value={stud.firstName}
                onChange={e => setStud({...stud,firstName:e.target.value})}
                className="form-control"
                id="colFormLabel"
                placeholder="First name"
              />
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-3 col-form-label">Middle Name</label>
            <div className="col-sm-8">
              <input
                type="Midlename"
                value={stud.middleName}
                onChange={e => setStud({...stud,middleName:e.target.value})}
                className="form-control"
                id="colFormLabel"
                placeholder="Midle name"
              />
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-3 col-form-label">Last Name</label>
            <div className="col-sm-8">
              <input
                type="lastname"
                value={stud.lastName}
                onChange={e => setStud({...stud,lastName:e.target.value})}
                className="form-control"
                id="colFormLabel"
                placeholder="Last name"
              />
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-3 col-form-label">Birth Date</label>
            <div className="col-sm-8">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={stud.dateOfBirth}
                  onChange={(newValue) => {
                    setStud({...stud,dateOfBirth:newValue.$d})
                  }}
                  slotProps={{ textField: { size: "small" } }}
                />
              </LocalizationProvider>
            </div>
          </div>
        </div>
        <div className="col-6">
          {/* right side */}
          <div className="row mb-3">
            <label className="col-sm-3 col-form-label">Gender</label>
            <div className="col-sm-4">
              <select
                className="form-select"
                aria-label="Default select example"
                value={stud.gender}
                onChange={e => setStud({...stud,gender:e.target.value})}
              >
                <option value=""></option>
                <option value="M">Male</option>
                <option value="F">Female</option>
              </select>
            </div>
          </div>

          <div className="row mb-3">
            <label className="col-sm-3 col-form-label">Grade</label>
            <div className="col-sm-4">
              <input
                type="Grade"
                value={stud.grade}
                onChange={e => setStud({...stud,grade:e.target.value})}
                className="form-control"
                id="colFormLabel"
                placeholder="Grade"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-1  ">
          <Button variant="contained"  onClick={onHandleUpdate}>
            Update
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EditStudent;
