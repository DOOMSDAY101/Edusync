import * as React from "react";
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
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

<<<<<<< HEAD



function Login() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let email = data.get("email");
    let password = data.get("password");
    console.log({
      email: data.get("email"),
      password: data.get("password")
    })
    let dataToSend = {
      email: email,
      password: password
    }
    try {
      const responses = await fetch('/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dataToSend)
      });

      if (responses.ok) {
        console.log("User Logged In")
        //WORK ON THIS TO MAKE IT BETTER
        //WHEN THE USER LOGS IN THE USER IS REDIRECTED TO ANOTHER PAGE
      } else if (responses.status === 404) {
        //IF THE GMAIL OR PASSWORD IS INCORRECT THE LOGIN PAGE IS RENDERED AGAIN 
        console.log("Invalid Email or incorrect password")
      } else {
        console.log("Invalid Email or incorrect password")
      }
    } catch (error) {
      console.log("Login Error")
=======
export default function Login() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [alertAeverity, setAlertAeverity] = useState("");
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:1337/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();
    if (data.user) {
      localStorage.setItem("token", data.user);
      setOpen(true);
      setMessage("Login Success");
      setAlertAeverity("success");
      window.location.href = "/home";
    } else {
      setOpen(true);
      setMessage("Login failed");
      setAlertAeverity("error");
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
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
            required
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/forgotPassword" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Register"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={alertAeverity}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Container>

  );
}

export default Login;