const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors  = require('cors');
const app = express()
const Students = require('./models/studentsModel');
const Teachers = require('./models/teachersModel');
dotenv.config();
const port = process.env.port

app.use(cors());
app.use(express.json())

app.get('/', (req,res)=>{
    console.log("Response")
})
app.post('/students', (req,res)=>{
    Students.insertMany({firstName: "Eyob"});
    res.json({"msg" :  "Inserted"})
})



// mongoose.connect(process.env.mongourl)
mongoose.connect(process.env.mongourl).then(() => {
    try {
        app.listen(port, () => {
            console.log(`Server connected to http://localhost:${port}`)
        })
    } catch (error) {
        console.log("Cannot connect to the server");
    }
}).catch(error => {
    console.log("Invalid Database Connection");
})

