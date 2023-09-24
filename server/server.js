const express = require("express");
const dotenv = require("dotenv");
const multer = require("multer");
//const fs = require("fs");
const cors = require("cors");
const db = require("./database/conn");
const app = express();
dotenv.config();
const port = process.env.port;

app.use(cors());
app.use(express.json());

// Create a multer middleware to parse the pdf file upload request
const storagepdf = multer.diskStorage({
  destination: "./uploads_pdf",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadpdf = multer({ storagepdf });

// Create a multer middleware to parse the video file upload request
const storagevideo = multer.diskStorage({
  destination: "./uploads_video",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadvideo = multer({ storagevideo });


// students login route
app.post("/studentsLogin", (req, res) => {
  //your code here
});

// teachers login route
app.post("/teachersLogin", (req, res) => {
  //your code here
});

// students signup route
app.post("/studentsSignUp", (req, res) => {
 //your code here
});

// teachers signup route
app.post("/teachesrSignUp", (req, res) => {
 //your code here
});



// // Create an endpoint to upload the pdf file to mysql
app.post("/uploadpdf", uploadpdf.single("file"), (req, res) => {
  // Get the uploaded file
  const file = req.file;
  console.log(file);

  //    // Create a SQL statement to insert the PDF file into the database
  const sql =
    "INSERT INTO pdf_files (file_name, file_size, file_data) VALUES (?, ?, ?)";

  // Bind the file name, file size, and file data to the SQL statement
  const file_name = file.originalname;
  const file_size = file.size;
  const file_data = file.buffer;

  // Execute the SQL statement
  db.query(sql, [file_name, file_size, file_data], (err, result) => {
    if (err) {
      console.log(err);
      return;
    }

    console.log("PDF file inserted successfully");
  });
});

// // Create an endpoint to upload the video file to mysql
app.post("/uploadvideo", uploadvideo.single("file"), (req, res) => {
  // Get the uploaded file
  const file = req.file;
  //console.log(file)

  // Create a SQL statement to insert the PDF file into the database
  const sql =
    "INSERT INTO video_files (file_name, file_size, file_data) VALUES (?, ?, ?)";

  // Bind the file name, file size, and file data to the SQL statement
  const file_name = file.originalname;
  const file_size = file.size;
  const file_data = file.buffer;

  // Execute the SQL statement
  db.query(sql, [file_name, file_size, file_data], (err, result) => {
    if (err) {
      console.log(err);
      return;
    }

    console.log("video file inserted successfully");
  });
});

//get pdf files
app.get("/getpdf/:id", (req, res) => {
  // Execute a SQL query to select the PDF file from the database
  const sql =
    "SELECT file_name, file_size, file_data FROM pdf_files WHERE id = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      console.log(err);
      return;
    }

    // Bind the results of the query to a buffer
    const buffer = result[0].file_data;

    // Return the buffer to the frontend
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="' + result[0].file_name + '"'
    );
    res.send(buffer);
  });
});

//get video files
app.get("/getvideo/:id", (req, res) => {
  // Get the video ID from the request
  const videoId = req.params.id;

  // Execute the SQL statement to select the video file from the database
  db.query(
    "SELECT file_data FROM video_files WHERE id = ?",
    [videoId],
    (err, result) => {
      if (err) {
        console.log(err);
        return;
      }

      // Get the video file data
      const videoData = result[0].file_data;

      // Set the response headers
      res.setHeader("Content-Type", "video/mp4");

      // Send the video file data to the client
      res.end(videoData);
    }
  );
});

app.listen(port, () => {
  console.log(`Server connected to http://localhost:${port}`);
});
