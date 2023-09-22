const mongoose = require('mongoose');
const techStackSchema = new mongoose.Schema({
    techStack: String,
  });
  
  // Create a model for the tech stack options
  const TechStack = mongoose.model('TechStack', techStackSchema);