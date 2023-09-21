const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  // Define your data schema fields here
  projectName: String,
  projectManagerName: String,
  startTime: Date,
  endTime: Date,
  techStack: String,
  status: String,
});

const YourModel = mongoose.model('YourModel', dataSchema);

module.exports = YourModel;
