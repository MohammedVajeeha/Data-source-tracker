const express = require('express');
const router = express.Router();
const UserModel = require('../models/users'); // Import your user model

const Row = require('../models/row');

const YourModel = require('../models/fetch');



// POST route for user login
router.post('/login', async (req, res) => {
    const { username, upassword } = req.body;

    try {
        // Check if the user exists in the database
        const user = await UserModel.findOne({ username });

        if (!user) {
            // User not found
            return res.status(404).json({ error: 'User not registered.' });
        }

        // Check if the password is correct
        if (user.password !== upassword) {
            // Incorrect password
            return res.status(401).json({ error: 'Authentication failed. Incorrect password.' });
        }

        // Authentication successful
        res.status(200).json({ message: 'Login successful!' });
    } catch (error) {
        console.error('Error authenticating user:', error);
        res.status(500).json({ error: 'Authentication failed. Please try again later.' });
    }
});


//updatingg
router.put('/projects/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const editedData = req.body;
  
      const updatedData = await Row.findByIdAndUpdate(id, editedData, { new: true });
  
      if (!updatedData) {
        return res.status(404).json({ error: 'Data not found' });
      }
  
      res.json(updatedData);
    } catch (error) {
      next(error);
    }
  });
  

// POST route for user registration
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    const newUser = new UserModel({
        username,
        email,
        password,
    });


    try {
        await newUser.save();
        res.status(200).json({ message: 'Registration successful!' });
        console.log(newUser);
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Registration failed.' });
    }


});

// Fetch all rows from MongoDB

router.get('/fetchRows', async (req, res) => {
    try {
        console.log('Fetching rows...');
        const data = await Row.find();
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error); // Add this line
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.delete('/delete/:id', async (req, res) => {
    try {
      const projectId = req.params.id;
      // Find the project by ID and delete it
      const deletedProject = await Row.findByIdAndDelete(projectId);
      if (!deletedProject) {
        // If the project with the given ID is not found, return a 404 response
        return res.status(404).json({ error: 'Project not found' });
      }
      // Return a success response
      res.status(204).json();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });





// Create a new row
router.post('/createRow', async (req, res) => {
    try {
        // Create a new instance of the data model with the request body
        const newRow = new Row(req.body);

        // Save the new row to the database
        await newRow.save();

        // Respond with the newly created row
        res.status(201).json(newRow);
    } catch (error) {
        console.error('Error creating row:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;
