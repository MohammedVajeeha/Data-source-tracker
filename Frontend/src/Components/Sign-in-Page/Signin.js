// import React, { useState } from 'react';
// import axios from 'axios';

// // function Signin() {
// //   const [formData, setFormData] = useState({
// //     email: '',
// //     password: '',
// //   });

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData({ ...formData, [name]: value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     try {
// //       const response = await axios.post('http://localhost:5000/api/auth/signin', formData);
// //       // Handle successful login, e.g., store the token in local storage and redirect
// //       console.log(response.data);
// //     } catch (error) {
// //       // Handle login error, e.g., display an error message
// //       console.error(error);
// //     }
// //   };

// //   return (
// //     <div>
// //       <h2>Login</h2>
// //       <form onSubmit={handleSubmit}>
// //         <div>
// //           <label htmlFor="email">Email</label>
// //           <input
// //             type="email"
// //             id="email"
// //             name="email"
// //             value={formData.email}
// //             onChange={handleChange}
// //             required
// //           />
// //         </div>
// //         <div>
// //           <label htmlFor="password">Password</label>
// //           <input
// //             type="password"
// //             id="password"
// //             name="password"
// //             value={formData.password}
// //             onChange={handleChange}
// //             required
// //           />
// //         </div>
// //         <div>
// //           <button type="submit">Log In</button>
// //         </div>
// //       </form>
// //     </div>
// //   );
// // }

// // export default Signin;


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Sign-in.css';

function Login() {
    const [username, setUsername] = useState('');
    const [upassword, setUpassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'username') {
            setUsername(value);
        } else if (name === 'upassword') {
            setUpassword(value);
        }
    };

    const navigate = useNavigate(); // Initialize the navigate function

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', {
                username,
                upassword,
            });

            if (response.status === 200) {
                setIsLoggedIn(true);
                console.info(response)
                localStorage.setItem("token",response?.data?.token)
                alert('Login successful!');

                // Navigate to the table page after successful login
                navigate('/'); // Use the navigate function
            } else {
                alert('Authentication failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Error authenticating user:', error);
            alert('Authentication failed. Please try again later.');
        }
    };

    // If the user is already logged in, display a message.
    if (isLoggedIn) {
        return <div className="main-div">You are already logged in!</div>;
    }

    return (
        <div className="main-div">
            <h2 className="header">User Login</h2>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={handleInputChange}
                        className="signup-table input"
                    />
                </div>
                <div>
                    <label htmlFor="upassword">Password:</label>
                    <input
                        type="password"
                        id="upassword"
                        name="upassword"
                        value={upassword}
                        onChange={handleInputChange}
                        className="signup-table input"
                    />
                </div>
                <div>
                    <button type="submit" className="button">
                        Login
                    </button>
                </div>
            </form>
            <div>
                <p>
                    Don't have an account? <Link to="/register">Sign Up</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
