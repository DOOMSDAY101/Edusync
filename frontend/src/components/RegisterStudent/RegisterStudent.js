import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/material/Button";
import { useState } from "react";

function RegisterStudent() {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [grade, setGrade] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);

  const onHandleSave = (event) => {
    event.preventDefault();
    saveStudent();
  };
  const handleReset = () => {
    setFirstName("");
    setMiddleName("");
    setLastName("");
    setGender("");
    setGrade("");
    setDateOfBirth(null);
  };
  const saveStudent = async () => {
    const response = await fetch("http://localhost:1337/api/addStudent", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        firstName,
        middleName,
        lastName,
        gender,
        grade,
        dateOfBirth,
      }),
    });
    const data = await response.json();
    if (data.student) {
      window.location.href = "/studentlist";
    } else {
      alert("error on save data");
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
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
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
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
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
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
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
                  value={dateOfBirth}
                  onChange={(newValue) => {
                    setDateOfBirth(newValue.$d);
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
                value={gender}
                onChange={(e) => setGender(e.target.value)}
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
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
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
          <Button variant="contained" onClick={onHandleSave}>
            Save
          </Button>
        </div>
        <div className="col-1  ">
          <Button variant="outlined" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}

export default RegisterStudent;
