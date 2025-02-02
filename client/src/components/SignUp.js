import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = () => {
    axios.post('/signup', { username, password })
      .then(response => {
        const { access_token } = response.data;
        localStorage.setItem('token', access_token);
        navigate('/');
      })
      .catch(error => {
        setError('Error signing up. Please try again.');
        console.error('SignUp Error:', error);
      });
  };

  return (
    <div
      style={{
        background:
          'linear-gradient(109.6deg, rgb(43, 1, 91) 13.4%, rgb(122, 2, 54) 100.2%)',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div className="ui container" style={{ maxWidth: '200px' }}>
        <h2
          className="ui header centered"
          style={{ fontSize: '40px', fontWeight: 'bold', textAlign: 'center', color: 'black' }}
        >
          Sign Up
        </h2>
        <form
          className="ui form"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            className="field"
            style={{
              margin: '10px 0',
              textAlign: 'center',
              width: '50%', // Updated to 50% width
            }}
          >
            <label style={{ fontSize: '18px', color: 'white' }}>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="ui input mini"
              style={{ width: '60%' }}
            />
          </div>
          <div
            className="field"
            style={{
              margin: '10px 0',
              textAlign: 'center',
              width: '50%', // Updated to 50% width
            }}
          >
            <label style={{ fontSize: '18px', color: 'white' }}>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="ui input mini"
              style={{ width: '60%' }}
            />
          </div>
          <button
            className="ui primary button"
            type="button"
            onClick={handleSignUp}
            style={{ width: '100px' }}
          >
            Sign Up
          </button>
        </form>
        {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>{error}</p>}
      </div>
    </div>
  );
};

export default SignUp;