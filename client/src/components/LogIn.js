// LogIn.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/Contexts";
import "semantic-ui-css/semantic.min.css"; // Import Semantic UI CSS

const LogIn = () => {
  const { dispatch } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/login", formData);
      const { access_token } = response.data;

      // Store the access token in localStorage
      localStorage.setItem("token", access_token);

      // Dispatch login action to update state
      dispatch({
        type: "LOGIN",
        payload: {
          /* Additional user data if needed */
        },
      });

      // Redirect to the home page
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      // Handle login error (show error message, etc.)
    }
  };

  const handleSignUpClick = () => {
    // Navigate to the signup page
    navigate("/sign_up");
  };

  return (
    <div
      style={{
        background:
          "linear-gradient(109.6deg, rgb(36, 45, 57) 11.2%, rgb(16, 37, 60) 51.2%, rgb(0, 0, 0) 98.6%)",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Poppins', sans-serif",
        margin: 0, // Reset margin on body
        padding: 0, // Reset padding on body
      }}
    >
      <div className="ui container" style={{ maxWidth: "200px", height: "100%" }}>
        <h2 className="ui header centered" style={{ fontSize: "40px", fontWeight: "bold", textAlign: "center" }}>
          Login
        </h2>
        <form className="ui form" onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div className="field" style={{ margin: "10px 0", textAlign: "center", width: "50%" }}>
            <label style={{ fontSize: "18px" }}>Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="ui input mini"
              style={{ width: "60%" }}
            />
          </div>
          <div className="field" style={{ margin: "10px 0", textAlign: "center", width: "50%" }}>
            <label style={{ fontSize: "18px" }}>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="ui input mini"
              style={{ width: "60%" }}
            />
          </div>
          <button className="ui primary button" type="submit" style={{ width: "100px" }}>
            Login
          </button>
        </form>
        <p style={{ textAlign: "center", marginTop: "10px" }}>
          Don't have an account?{' '}
          <span style={{ color: "blue", cursor: "pointer" }} onClick={handleSignUpClick}>
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default LogIn;