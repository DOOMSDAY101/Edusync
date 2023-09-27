const mysql  = require('mysql2');
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password : "yobadagne2nd",
    database : "sms"
});

  // Create a prepared statement
//   const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: "yobadagne2nd",
//     database: "sms"
//   });
module.exports = db;