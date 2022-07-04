const mongoose = require('mongoose');


// Defining Schema
const studentSchema = new mongoose.Schema({
    
        Name: String,
        Gender: String,
        DateOfBirth: {
            type: Date,
            trim: true,
           
        },
        PhoneNumber: String,
        Email:{
            type: String,
            trim: true,
            unique: true,
            minlength:4,
            maxlength:30,
            match:/\S+@\S+\.\S+/

        },
        
        
  },{ timestamps: true })
  
  // Model
  const StudentModel = mongoose.model("student", studentSchema)

  module.exports = StudentModel