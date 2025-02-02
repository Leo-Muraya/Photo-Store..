import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Image, Message } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { useAuth } from '../components/Contexts';

const PhotoInformation = () => {
  const { photoId } = useParams();
  const { authState } = useAuth();
  const [photo, setPhoto] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!authState.isAuthenticated) {
          // Redirect to login or handle unauthorized access
          console.log('User not authenticated. Redirect or handle unauthorized access.');
          return;
        }

        // Fetch detailed information about the photo
        const response = await axios.get(`/photos/${photoId}`);
        setPhoto(response.data);
      } catch (error) {
        setError('Error fetching photo information. Please try again.');
        console.error('PhotoInformation Error:', error);
      }
    };

    fetchData();
  }, [photoId, authState.isAuthenticated]);

  if (!authState.isAuthenticated) {
    // You can render a message or redirect the user to the login page
    return (
      <Container style={{ marginTop: '20px', textAlign: 'center', fontFamily: 'Poppins' }}>
        <Message negative>Sorry, You are not authorized to view this page. Sign up or log in to create an Account..</Message>
      </Container>
    );
  }

  return (
    <Container style={{ marginTop: '20px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontWeight: 'bold' }}>Photo Information</h1>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Image src={photo.image_url} alt={photo.title} size='large' rounded style={{ marginBottom: '10px', borderRadius: '15px' }} />
        <p style={{ fontWeight: 'bold' }}><strong>Title:</strong> {photo.title}</p>
        <p style={{ fontWeight: 'bold' }}><strong>Description:</strong> {photo.description}</p>
      </div>

      {error && <Message negative>{error}</Message>}
    </Container>
  );
};

export default PhotoInformation;