// Import your modules and routes
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('../routes/authroutes');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

// MongoDB connection

const username = 'vajeeha';

const password = 'vajeehadb';

const clusterUrl = 'cluster0.3uinwya.mongodb.net';

const dbName = 'SourceDB';

const databaseUrl = `mongodb+srv://${username}:${password}@${clusterUrl}/${dbName}`;
console.log('Database URL:', databaseUrl);

mongoose.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  
    console.log('Connected to the database');

  })

  .catch(error => {

    console.error('Error connecting to the database:', error);

  });

// API routes
app.use('/api/auth', authRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
