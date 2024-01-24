
import React, { useState } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from './AuthContext';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();


  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, username, password }),
      });

      if (response.ok) {
        const user = await response.json();
        login(user);
        navigate('/MainPage'); // Redirect to main page upon successful registration
      }  else {
        // Handle registration failure, e.g., show an error message
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };
  return (
    <div style={{ textAlign: 'center', maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', marginTop: '50px', backgroundColor: 'rgba(218, 112, 214, 0.5)', animation: 'fadeIn 1s ease-out' }}>
      <h2 style={{ fontSize: '36px', color: 'purple', marginBottom: '20px' }}>Register</h2>
      <div style={{ margin: '10px 0', opacity: 0, animation: 'fadeIn 1s ease-out 0.5s forwards' }}>
        <label htmlFor="name" style={{ display: 'block', marginBottom: '5px' }}>Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        />
      </div>
      <div style={{ margin: '10px 0', opacity: 0, animation: 'fadeIn 1s ease-out 1s forwards' }}>
        <label htmlFor="username" style={{ display: 'block', marginBottom: '5px' }}>Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        />
      </div>
      <div style={{ margin: '10px 0', opacity: 0, animation: 'fadeIn 1s ease-out 1.5s forwards' }}>
        <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        />
      </div>
      <button style={{ backgroundColor: 'purple', color: 'white', padding: '10px', borderRadius: '5px', cursor: 'pointer', opacity: 0, animation: 'fadeIn 1s ease-out 2s forwards' }} onClick={handleRegister}>
        Submit
      </button>
    </div>
  );
};

export default Register;
