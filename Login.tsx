import React, { useState } from "react";
import Link from "@mui/material/Link";
import { useAuth } from './AuthContext';
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Handle successful login, e.g., redirect to the main page
        const user = await response.json();
        login(user);
        navigate("/MainPage");
      } else {
        // Handle login failure, e.g., show an error message
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        maxWidth: "400px",
        margin: "auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        marginTop: "50px",
        backgroundColor: "rgba(173, 216, 230, 0.5)",
      }}
    >
      <h2
        style={{
          fontSize: "36px",
          color: "blue",
          marginBottom: "20px",
          animation: "fadeIn 1s ease-out",
        }}
      >
        Welcome to Behavioral Cognitive Impairment Test
      </h2>
      <div
        style={{
          margin: "10px 0",
          opacity: 0,
          animation: "fadeIn 1s ease-out 0.5s forwards",
        }}
      >
        <label
          htmlFor="username"
          style={{ display: "block", marginBottom: "5px" }}
        >
          Username:
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
        />
      </div>
      <div
        style={{
          margin: "10px 0",
          opacity: 0,
          animation: "fadeIn 1s ease-out 1s forwards",
        }}
      >
        <label
          htmlFor="password"
          style={{ display: "block", marginBottom: "5px" }}
        >
          Password:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
        />
      </div>
      <button
        style={{
          backgroundColor: "blue",
          color: "white",
          padding: "10px",
          borderRadius: "5px",
          cursor: "pointer",
          opacity: 0,
          animation: "fadeIn 1s ease-out 1.5s forwards",
        }}
        onClick={handleLogin}
      >
        Login
      </button>
      <Link
        href="/Register"
        style={{
          marginTop: "10px",
          display: "block",
          opacity: 0,
          animation: "fadeIn 1s ease-out 2s forwards",
        }}
      >
        Register
      </Link>
    </div>
  );
};

export default Login;
