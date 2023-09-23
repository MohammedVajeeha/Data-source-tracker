// models/Row.js
const mongoose = require('mongoose');

const rowSchema = new mongoose.Schema({
  projectName: String,
  projectManagerName: String,
  startTime: Date,
  endTime: Date,
  techStack: String,
  status: String,
  email:String
});


module.exports = mongoose.model('Row', rowSchema);

