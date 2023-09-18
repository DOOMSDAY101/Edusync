import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";

function RegisterStudent() {
  return (
    <div>
      <div class="row">
        <div class="col-6">
          {/* left side */}
          <div class="row mb-3">
            <label for="colFormLabel" class="col-sm-3 col-form-label">
              First Name
            </label>
            <div class="col-sm-8">
              <input
                type="firstname"
                class="form-control"
                id="colFormLabel"
                placeholder="First name"
              />
            </div>
          </div>
          <div class="row mb-3">
            <label for="colFormLabel" class="col-sm-3 col-form-label">
              Midle Name
            </label>
            <div class="col-sm-8">
              <input
                type="Midlename"
                class="form-control"
                id="colFormLabel"
                placeholder="Midle name"
              />
            </div>
          </div>
          <div class="row mb-3">
            <label for="colFormLabel" class="col-sm-3 col-form-label">
              Last Name
            </label>
            <div class="col-sm-8">
              <input
                type="lastname"
                class="form-control"
                id="colFormLabel"
                placeholder="Last name"
              />
            </div>
          </div>
          <div class="row mb-3">
            <label for="colFormLabel" class="col-sm-3 col-form-label">
              Birth Date
            </label>
            <div class="col-sm-8">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker slotProps={{ textField: { size: "small" } }} />
              </LocalizationProvider>
            </div>
          </div>
        </div>
        <div class="col-6">
          {/* right side */}
          <div class="row mb-3">
            <label for="colFormLabel" class="col-sm-3 col-form-label">
              Gender
            </label>
            <div class="col-sm-4">
              <select class="form-select" aria-label="Default select example">
                <option value=""></option>
                <option value="M">Male</option>
                <option value="F">Female</option>
              </select>
            </div>
          </div>

          <div class="row mb-3">
            <label for="colFormLabel" class="col-sm-3 col-form-label">
              Grade
            </label>
            <div class="col-sm-4">
              <input
                type="Grade"
                class="form-control"
                id="colFormLabel"
                placeholder="Grade"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterStudent;
