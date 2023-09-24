import Divider from "@mui/material/Divider";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

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
];
function Studentlist() {
  return (
    <div>
      <div class="row ">
        <div class="input-group mb-3" style={{ width: "400px" }}>
          <input
            type="text"
            class="form-control"
            placeholder="search"
            aria-label="student search"
            aria-describedby="button-addon2"
          />
          <button
            class="btn btn-outline-primary"
            type="button"
            id="button-addon2"
          >
            Search
          </button>
        </div>
      </div>
      <Divider />
      <div class="row">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Full Name</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Birthdate</TableCell>
                <TableCell>Grade</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell>{row.fullname}</TableCell>
                  <TableCell>{row.gender}</TableCell>
                  <TableCell>{row.birthdate}</TableCell>
                  <TableCell>{row.grade}</TableCell>
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
