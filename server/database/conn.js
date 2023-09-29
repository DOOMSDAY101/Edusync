const mysql  = require('mysql2');
const dotenv = require("dotenv");
dotenv.config();
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password : process.env.dbpassword,
    database : "sms"
});


module.exports = db;