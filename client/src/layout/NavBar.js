import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/Contexts';
import axios from 'axios'; // Import axios for making requests

export default function NavBar() {
  const { authState, dispatch } = useAuth();

  const handleLogout = () => {
    // Perform logout logic here
    axios.post('/logout', {}, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })  // Adjust the endpoint based on your backend
      .then(() => {
        // Clear token from localStorage (assuming you're using localStorage for token storage)
        localStorage.removeItem('token');
        // Dispatch logout action to update state
        dispatch({ type: 'LOGOUT' });
      })
      .catch(error => {
        console.error('Logout error:', error);
      });
  };

  return (
    <div className="ui secondary pointing menu" style={{ backgroundColor: '#2c3e50', borderRadius: '0px' }}>
      <div className="ui container" style={{ display: 'flex', justifyContent: 'center' }}>
        {authState.isAuthenticated ? (
          <>
            <Link to='/' className="active item" style={{ color: '#ecf0f1', transition: 'color 0.3s', fontWeight: 'bold', fontSize: '16px' }}>
              Home
            </Link>
            <Link to='liked_photos' className="item" style={{ color: '#ecf0f1', transition: 'color 0.3s', fontWeight: 'bold', fontSize: '16px' }}>
              Liked
            </Link>
            <Link to='posted' className="item" style={{ color: '#ecf0f1', transition: 'color 0.3s', fontWeight: 'bold', fontSize: '16px' }}>
              Posted
            </Link>
            <Link to='post_photo' className="item" style={{ color: '#ecf0f1', transition: 'color 0.3s', fontWeight: 'bold', fontSize: '16px' }}>
              Create
            </Link>
            <div className="right menu">
              <span className="ui item" onClick={handleLogout} style={{ color: '#e74c3c', transition: 'color 0.3s', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}>
                LogOut
              </span>
            </div>
          </>
        ) : (
          <>
            <Link to='sign_up' className="item" style={{ color: '#ecf0f1', transition: 'color 0.3s', fontWeight: 'bold' }}>
              Sign Up
            </Link>
            <Link to='log_in' className="item" style={{ color: '#ecf0f1', transition: 'color 0.3s', fontWeight: 'bold' }}>
              Log In
            </Link>
          </>
        )}
      </div>
      <div className="ui segment">
        <p></p>
      </div>
    </div>
  );
}