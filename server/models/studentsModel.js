const mongoose = require('mongoose');

const Schema =  mongoose.Schema;

const studentSchema = new Schema({
    firstName: {
      type: String,
      required: true
    },
    lastName: String,
    dateOfBirth: {
      type: Date,
      format: "YYYY-MM-DD"
    },
    gender: String,
    contact: String,
    email: String,
    studentId: String,
    department: String,
    coursesTaken: [String],
    yearOfEnternace: Number,
    CGPA: Number
  });

  module.exports = mongoose.model('Students', studentSchema);