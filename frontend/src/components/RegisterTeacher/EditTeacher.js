import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useLocation, useParams } from 'react-router-dom';
import { useEffect } from "react";

function TeacherStudent() {
  const [teacher, setTeacher] = useState({
    firstName:'',lastName:'',middleName:'',
    email:'',gender:'',dateOfBirth:null,phone:null
  });

  const id = useParams().id;
  console.log(id);

  const fetchTeacherList = async () => {
    const response = await fetch('http://localhost:1337/api/teacher/' + id, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    if (data.teacher) {
      const teacher = data.teacher;
      setTeacher({...teacher,firstName:teacher.firstName,
        middleName:teacher.middleName, gender:teacher.gender,
        email:teacher.email, phone:teacher.email})
    }
  };

  useEffect(() => {
    fetchTeacherList();
  }, []);

  const onHandleUpdate = (event) => {
    event.preventDefault();
    updateTeacher();
  };
  const updateTeacher = async () => {
    const response = await fetch("http://localhost:1337/api/teacher/" + id, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        firstName:teacher.firstName,
        middleName:teacher.middleName,
        lastName:teacher.lastName,
        gender:teacher.gender,
        phone:teacher.phone,
        email:teacher.email,
        dateOfBirth:teacher.dateOfBirth,
      }),
    });
    const data = await response.json(); console.log(data);
    if (data.teacher) {
      window.location.href = "/teacherlist";
    } else {
      alert("error on updating data");
    }
  };

  return (
    <div>
      <h3>Teacher Detail</h3>
      <div className="row">
        <div className="col-6">
          {/* left side */}
          <div className="row mb-3">
            <label className="col-sm-3 col-form-label">First Name</label>
            <div className="col-sm-8">
              <input
                type="firstname"
                value={teacher.firstName}
                onChange={e => setTeacher({...teacher,firstName:e.target.value})}
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
                value={teacher.middleName}
                onChange={e => setTeacher({...teacher,middleName:e.target.value})}
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
                value={teacher.lastName}
                onChange={e => setTeacher({...teacher,lastName:e.target.value})}
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
                  value={teacher.dateOfBirth}
                  onChange={(newValue) => {
                    setTeacher({...teacher,dateOfBirth:newValue.$d})
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
                value={teacher.gender}
                onChange={e => setTeacher({...teacher,gender:e.target.value})}
              >
                <option value=""></option>
                <option value="M">Male</option>
                <option value="F">Female</option>
              </select>
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-3 col-form-label"> Email</label>
            <div className="col-sm-8">
              <input
                type="email"
                value={teacher.email}
                onChange={e => setTeacher({...teacher,email:e.target.value})}
                className="form-control"
                id="colFormLabel"
                placeholder="Email"
              />
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-3 col-form-label"> Phone</label>
            <div className="col-sm-8">
              <input
                type="phone"
                value={teacher.phone}
                onChange={e => setTeacher({...teacher,phone:e.target.value})}
                className="form-control"
                id="colFormLabel"
                placeholder="phone"
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

export default TeacherStudent;
