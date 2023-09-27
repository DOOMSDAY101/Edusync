import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
<<<<<<< HEAD
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let email = data.get("email");
    let password = data.get("password");
    let firstName = data.get("firstName");
    let lastName = data.get("lastName");
    let dataToSend = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,

    }
    try {
      const responses = await fetch('/register', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dataToSend)
      });

      if (responses.ok) {
        console.log("USER successsfully created")
        //THIS SHOWS THE USER HAS BEEN CREATED SUCCESFULLY
        //REDIRECT THEM TO LOGIN PAGE FOR AUTHENTICATION
      } else if (responses.status === 404) {
        console.log("AN ERROR OCCURED")
        //AN UNKNOWN ERROR OCCURED 
      } else {
        console.log("ERROR")
      }
    } catch (error) {
      console.log("UNABLE TO REGISTER STUDENT")
=======
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:1337/api/registerUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    const data = await response.json();
    if (data.status == "ok") {
      navigate("/login");
>>>>>>> d8a51531de1dc92ea85ac21e87a29324e22dc83e
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 6,
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Account Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
<<<<<<< HEAD
            id="firstName"
            label="First Name"
            name="firstName"
            autoComplete="firstName"
=======
            id="userName"
            label="User name"
            name="userName"
            autoComplete="userName"
>>>>>>> d8a51531de1dc92ea85ac21e87a29324e22dc83e
            autoFocus
          />
          {/* <TextField
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="lastName"
            autoFocus
          /> */}
          <TextField
            margin="normal"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            value={password}
            required
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {/* <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="confirmPassword"
            id="confirmPassword"
            autoComplete="confirmPassword"
          /> */}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/login" variant="body2">
                {"If you have account? Login"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
