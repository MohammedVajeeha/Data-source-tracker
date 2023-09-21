// import React, { useState } from 'react';
// import axios from 'axios';

// function Signup() {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     dateOfBirth: '',
//     gender: '',
//     location: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     try {
//       await axios.post('/api/signup', formData); // Change the URL here
//       alert('User created successfully');
//     } catch (error) {
//       console.error('Error signing up:', error);
//     }
//   };
  


//   return (
//     <div>
//       <h2>Sign Up</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="fullName">Full Name</label>
//           <input
//             type="text"
//             id="fullName"
//             name="fullName"
//             value={formData.fullName}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="confirmPassword">Confirm Password</label>
//           <input
//             type="password"
//             id="confirmPassword"
//             name="confirmPassword"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="dateOfBirth">Date of Birth</label>
//           <input
//             type="date"
//             id="dateOfBirth"
//             name="dateOfBirth"
//             value={formData.dateOfBirth}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label htmlFor="gender">Gender</label>
//           <select
//             id="gender"
//             name="gender"
//             value={formData.gender}
//             onChange={handleChange}
//           >
//             <option value="">Select</option>
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//             <option value="other">Other</option>
//           </select>
//         </div>
//         <div>
//           <label htmlFor="location">Country/Location</label>
//           <input
//             type="text"
//             id="location"
//             name="location"
//             value={formData.location}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <button type="submit">Sign Up</button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default Signup;



import React, { useState } from 'react';
import axios from 'axios';

function Registration() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'username') {
            setUsername(value);
        } else if (name === 'email') {
            setEmail(value);
        } else if (name === 'upassword') {
            setPassword(value);
        }
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/api/auth/register', {
                username,
                email,
                password,
            });
            console.log(response);
            if (response.status === 200) {
                setIsRegistered(true);
                alert('Registration successful!');
            } else {
                alert('Registration failed.');
            }
        } catch (error) {
            console.error('Error registering user:', error);
            alert('Registration failed.');
        }
    };

    // If the user is already registered, display a message.
    if (isRegistered) {
        return <div>You are already registered!</div>;
    }

    return (
        <div>
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
                    <button type="submit">Register</button>
                </div>
            </form>
        </div>
    );
}

export default Registration;
