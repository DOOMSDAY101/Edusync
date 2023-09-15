const mongoose = require('mongoose');

const Schema =  mongoose.Schema;
let teachersSchema = new Schema({
    firstName: {
      type: String,
      required: true
    },
    lastName: {type: String},
    dateOfBirth: {
        type: Date,
        format: "YYYY-MM-DD"
      },
    gender: {type: String},
    contact: {type: String},
    email: {type: String},
    department: {type: String},
    yearOfEnternace: {type: Number},
  });

   const Teachers = mongoose.model('Teachers', teachersSchema);
   module.exports = Teachers