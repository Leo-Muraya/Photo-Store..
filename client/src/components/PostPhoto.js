import React, { useState } from 'react';
import axios from 'axios';

const PostPhoto = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image_url, setImage_url] = useState('');
  const [error, setError] = useState('');

  const handlePostPhoto = () => {
    axios
      .post(
        '/photos',
        { title, description, image_url },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      )
      .then(response => {
        console.log('Title:', title);
        console.log('Description:', description);
        console.log('Image URL:', image_url);
        console.log('Photo created successfully:', response.data.message);
        // clear the form
        setTitle('');
        setDescription('');
        setImage_url('');
      })
      .catch(error => {
        setError('Error posting photo. Please try again.');
        console.error('PostPhoto Error:', error);
      });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Post a Photo</h1>
      <form style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} style={styles.textarea} />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Photo URL:</label>
          <input type="text" value={image_url} onChange={(e) => setImage_url(e.target.value)} style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <button type="button" onClick={handlePostPhoto} style={styles.button}>
            Post Photo
          </button>
        </div>
      </form>
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: 'auto',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: 'Poppins, sans-serif', // Use the Poppins font
  },
  heading: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#333',
  },
  form: {
    width: '100%',
    maxWidth: '400px',
  },
  formGroup: {
    marginBottom: '20px',
    width: '100%',
    textAlign: 'center',
  },
  label: {
    marginBottom: '8px',
    color: '#333',
    fontSize: '16px',
    fontWeight: 'bold',
    display: 'block',
  },
  input: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    minHeight: '80px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    resize: 'vertical',
    boxSizing: 'border-box',
  },
  button: {
    backgroundColor: '#4caf50',
    color: '#fff',
    padding: '12px',
    fontSize: '16px',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '4px',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
};

export default PostPhoto;