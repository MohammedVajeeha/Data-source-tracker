import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Sign-up.css';
import { Typography, Button, Container, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Sign-up.css'; // Import common CSS

function Registration() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);
    const navigate = useNavigate(); // Initialize the navigate function

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'username') {
            setUsername(value);
        } else if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/auth/register', {
                username,
                email,
                password,
            });

            if (response.status === 200) {
                setIsRegistered(true);

                // Use Toastify to display success message for registration
                toast.success('Registration successful!', {
                    autoClose: 3000, // Automatically close the toast after 3 seconds
                    position: 'top-right',
                });

                // Navigate to the login page after successful registration
                navigate('/login');
            } else {
                // Use Toastify to display error message for registration failure
                toast.error('Registration failed. Please try again later.', {
                    autoClose: 3000, // Automatically close the toast after 3 seconds
                    position: 'top-right',
                });
            }
        } catch (error) {
            console.error('Error registering user:', error);
            // Use Toastify to display error message for registration failure
            toast.error('Registration failed. Please try again later.', {
                autoClose: 3000, // Automatically close the toast after 3 seconds
                position: 'top-right',
            });
        }
    };

    return (
        <Container maxWidth="md">
        <div className="RightSection">
          <div className="SigninForm">
            <Typography variant="h4" align="center">
              User Registration
            </Typography>
            <form onSubmit={handleFormSubmit}>
              <div className="input-group">
                <i className="fa fa-user" />
                <TextField
                  type="text"
                  id="username"
                  name="username"
                  
                  value={username}
                  onChange={handleInputChange}
                  label="Username"
                  fullWidth
                  variant="outlined"
                />
              </div>
              <div className="input-group">
                <i className="fa fa-envelope" />
                <TextField
                  type="email"
                  id="email"
                  name="email"
                  
                  value={email}
                  onChange={handleInputChange}
                  label="Email"
                  fullWidth
                  variant="outlined"
                />
              </div>
              <div className="input-group">
                <i className="fa fa-lock" />
                <TextField
                  type="password"
                  id="password"
                  name="password"
              
                  value={password}
                  onChange={handleInputChange}
                  label="Password"
                  fullWidth
                  variant="outlined"
                />
              </div>
              <Button type="submit" className="btn1-signin">
                Register
              </Button>
            </form>
            <div className="SignInLink">
              <p>
                Have an account? <Link to="/">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </Container>
    );
  }


export default Registration;
