import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
function TimeTable() {
  return (
    <div>
      <div className="row col-12">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar slotProps={{ textField: { size: "Large" } }} />
        </LocalizationProvider>
      </div>
    </div>
  );
}

export default TimeTable;
