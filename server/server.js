const express = require('express');
require('dotenv').config();
const app = express();
let bcrypt = require('bcrypt');
let mysql = require('mysql');
let bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
let cookieparser = require('cookie-parser')
const cors = require('cors');
const path = require('path');
const port = process.env.port

app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'build')))
app.use(express.json())
app.use(bodyParser.json())
app.use(cookieparser())
let db = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
});
db.connect(err => {
    if (err) throw err;
    console.log("connected")
});

app.get('/welcome', isLoggedInWelcome, (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})
app.get('/login', isLoggedInSignupAndLogin, (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})
app.get('/register', isLoggedInSignupAndLogin, (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})
//A FUCTION TO LOG A USER IN
//FOR THE LOGIN POST REQUEST
app.post('/login', (req, res) => {
    let { email, password } = req.body;
    console.log(email, password)
    let sqlquery = "SELECT * FROM registered_users WHERE Email = (?)";
    //DONT FORGET TO RUN "npm run build" IN THE FRONTEND DIRECTORY THEN COPY THE BUILD FOLDER TO TH SERVER FOLDER
    db.query(sqlquery, [email], (err, data) => {
        if (data.length === 0) {
            //INVALID EMAIL
            res.status(400).json({ error: "Invalid mail or Incorrect Password" })
            console.log("404")
        }
        if (data.length > 0) {
            bcrypt.compare(password.toString(), data[0].Password, (errors, response) => {
                if (!response) {
                    //INVALID PASSWORD
                    console.log("Not found")
                    res.status(400).json({ error: "Invalid mail or Incorrect Password" })
                }
                if (response) {
                    //SUCCESS
                    console.log("Logged in");
                    let userdata = { name: data[0].Firstname, Email: data[0].Email }
                    const accesstoken = jwt.sign(userdata, process.env.ACCESS_TOKEN, { expiresIn: "20s" });
                    res.cookie('token', accesstoken)
                    res.status(200).json({ message: "Valid credentials" })
                }
            })
        }
    })
})


//SIGNUP FUNCTION
app.post('/register', (req, res) => {
    let { firstName, lastName, email, password } = req.body
    console.log(firstName, lastName, email, password)
    // let sqlquery = "SELECT Email FROM registered_users";
    let sqlquery2 = "INSERT INTO registered_users (Firstname,Lastname,Email,Password) VALUES (?)";

    bcrypt.hash(password.toString(), 10, (err, hash) => {
        if (err) {
            res.status(404).json({ message: "An error occured" })
            throw err;
        } else {

            let values = [
                firstName,
                lastName,
                email,
                hash
            ]
            db.query(sqlquery2, [values], (err, data) => {
                if (err) {
                    res.status(404).json({ message: "Email already exists" })
                }
                else {
                    console.log("User created successfully")
                    //REDIRECT USERS TO LOGIN PAGE FOR AUTHENTICATION
                    res.status(200).json({ maessage: "User created succesfully" })
                }


            })
        }

    })
})

//A FUNCTION TO CHECK IF THE USER IS NOT  LOGGED IN
//IF USER IS NOT LOGGED IN, USER SHOULD BE REDIRECTED TO LOGIN OF SIGNUP PAGE TO AVOID VIEWING SECURED PAGE
function isLoggedInSignupAndLogin(req, res, next) {
    let token = req.cookies.token;
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, response) => {
        if (err) {
            next();
        } else {
            //REDIRECT USER TO LOGIN OR SIGNUP PAGE
            console.log("You cant view the welcome/securedpage Login or create an account to continue")
        }
    });

}

//A FUNCTION TO CHECK IF THE USER IS ALREADY LOGGED IN
//IF USER IS LOGGED IN USER SHOULD BE REDIRECTED TO THE SECURED OR WELCOME PAGE TO AVOID VIEWING LOGIN OR SIGNUP PAGE
function isLoggedInWelcome(req, res, next) {
    try {
        let token = req.cookies.token;

        let user = jwt.verify(token, process.env.ACCESS_TOKEN);
        req.user = user;
        next();
        //REDIRECT THE USER BACK TO WELCOME/SECUREDPAGE
    } catch (error) {
        res.clearCookie('token');
        console.log("You are not logged in So you cant view the welcome/securedpage");

    }
}



app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})
