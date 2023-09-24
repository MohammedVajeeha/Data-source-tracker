import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Typography, TextField, Button, Container, Grid } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import  './Sign-in.css';

function Login() {
    const [username, setUsername] = useState('');
    const [upassword, setUpassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate(); // Initialize the navigate function

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'username') {
            setUsername(value);
        } else if (name === 'upassword') {
            setUpassword(value);
        }
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', {
                username,
                upassword,
            });

            if (response.status === 200) {
                setIsLoggedIn(true);
                localStorage.setItem("token", response?.data?.token);

                // Use Toastify to display success message
                toast.success('Login successful!', {
                    autoClose: 2000, // Automatically close the toast after 2 seconds
                    position: 'top-center',
                });

                // Navigate to the table page after successful login
                window.location.reload();
            } else {
                // Use Toastify to display error message
                toast.error('Authentication failed. Please check your credentials.', {
                    autoClose: 5000, // Automatically close the toast after 5 seconds
                    position: 'top-center',
                });
            }
        } catch (error) {
            console.error('Error authenticating user:', error);

            // Use Toastify to display error message
            toast.error('Authentication failed. Please try again later.', {
                autoClose: 5000, // Automatically close the toast after 5 seconds
                position: 'top-center',
            });
        }
    };

    // If the user is already logged in, display a message.
    if (isLoggedIn) {
        return (
            <div className="main-div">
                <Typography variant="h6">You are already logged in!</Typography>
            </div>
        );
    }

    return (
   
        <Container maxWidth="md">
            <div className="main-div">
                <Typography variant="h4" align="center" color="#19105B" > Login</Typography>
                <form onSubmit={handleFormSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
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
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                type="password"
                                id="upassword"
                                name="upassword"
                                value={upassword}
                                onChange={handleInputChange}
                                label="Password"
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                            >
                                Login
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                <div>
                    <p>
                        Don't have an account? <Link to="/register">Sign Up</Link>
                    </p>
                </div>
            </div>
            <ToastContainer /> {/* Toastify container */}
        </Container>
        
    );
}

export default Login;


// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate, Link } from 'react-router-dom';
// import './Sign-in.css';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'; 
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'; 

// function Login() {
//     const [username, setUsername] = useState('');
//     const [upassword, setUpassword] = useState('');
//     const [isLoggedIn, setIsLoggedIn] = useState(false);

//     const handleInputChange = (event) => {
//         const { name, value } = event.target;
//         if (name === 'username') {
//             setUsername(value);
//         } else if (name === 'upassword') {
//             setUpassword(value);
//         }
//     };

//     const navigate = useNavigate(); // Initialize the navigate function

//     const handleFormSubmit = async (event) => {
//         event.preventDefault();

//         try {
//             const response = await axios.post('http://localhost:8080/api/auth/login', {
//                 username,
//                 upassword,
//             });

//             if (response.status === 200) {
//                 setIsLoggedIn(true);
//                 console.info(response)
//                 localStorage.setItem("token",response?.data?.token)
//                 alert('Login successful!');

//                 // Navigate to the table page after successful login
//                 window.location.reload();
//                  // Use the navigate function
//             } else {
//                 alert('Authentication failed. Please check your credentials.');
//             }
//         } catch (error) {
//             console.error('Error authenticating user:', error);
//             alert('Authentication failed. Please try again later.');
//         }
//     };

//     // If the user is already logged in, display a message.
//     if (isLoggedIn) {
//         return <div className="main-div">You are already logged in!</div>;
//     }

//     return (
//         <div className="main-div">
//             <h2 className="header">User Login</h2>
//             <form onSubmit={handleFormSubmit}>
//                 <div>
//                     <label htmlFor="username">Username:</label>
//                     <input
//                         type="text"
//                         id="username"
//                         name="username"
//                         value={username}
//                         onChange={handleInputChange}
//                         className="signup-table input"
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="upassword">Password:</label>
//                     <input
//                         type="password"
//                         id="upassword"
//                         name="upassword"
//                         value={upassword}
//                         onChange={handleInputChange}
//                         className="signup-table input"
//                     />
//                 </div>
//                 <div>
//                     <button type="submit" className="button">
//                         Login
//                     </button>
//                 </div>
//             </form>
//             <div>
//                 <p>
//                     Don't have an account? <Link to="/register">Sign Up</Link>
//                 </p>
//             </div>
//         </div>
//     );
// }

// export default Login;
