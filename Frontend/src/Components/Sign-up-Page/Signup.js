import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Sign-up.css';

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
                alert('Registration successful!');
                // Navigate to the login page after successful registration
                navigate('/login');
            } else {
                alert('Registration failed.');
            }
        } catch (error) {
            console.log('Error registering user:', error);
            alert('Registration failed.');
        }
    };

    if (isRegistered) {
        return <div>You are already registered!</div>;
    }

    return (
        <div className="main-div">
            <h2>User Registration</h2>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <button type="submit" className="button">Register</button>
                </div>
            </form>
            <div>
                <p>Have an account? <Link to="/">Login</Link></p>
            </div>
        </div>
    );
}

export default Registration;
