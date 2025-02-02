import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../components/Contexts';
import { Card, Image, Container, Header, Message, Grid } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

const LikePhotos = () => {
  const [likedPhotos, setLikedPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { dispatch } = useAuth();
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          console.log("User not authenticated");
          setLoading(false);
          return;
        }

        const [, payloadBase64] = token.split('.');
        const payload = JSON.parse(atob(payloadBase64));

        console.log('Decoded payload:', payload);

        const currentUserId = payload.sub;

        console.log('Current user ID:', currentUserId);

        const response = await axios.get(`/user/${currentUserId}/liked-photos`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setLikedPhotos(response.data.liked_photos);
        setLoading(false);
      } catch (error) {
        setError('Error fetching liked photos. Please try again.');
        setLoading(false);
        console.error('Error fetching liked photos:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleUnlike = async (photoId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/photos/${photoId}/like`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setLikedPhotos((prevPhotos) => prevPhotos.filter((photo) => photo.id !== photoId));
    } catch (error) {
      console.error('Error unliking photo:', error);
    }
  };

  return (
    <Container>
      <Header as="h1" dividing>
        Liked Photos
      </Header>

      {loading && <p>Loading...</p>}
      {error && <Message negative>{`Error: ${error}`}</Message>}
      
      {!loading && !error && likedPhotos.length === 0 && (
        <Message info>
          <Message.Header>No liked photos available.</Message.Header>
        </Message>
      )}

      {!loading && !error && likedPhotos.length > 0 && (
        <Grid columns={4} stackable doubling style={{ gap: '20px' }}>
          {likedPhotos.map((photo) => (
            <Grid.Column key={photo.id} style={{ transition: 'transform 0.3s', transform: hoveredCard === photo.id ? 'scale(1.05)' : 'scale(1)' }}
              onMouseEnter={() => setHoveredCard(photo.id)}
              onMouseLeave={() => setHoveredCard(null)}>
              <Card fluid style={{ borderRadius: '20px 20px 20px 20px' }}>
                <Image src={photo.image_url} alt={photo.title} wrapped ui={false} style={{ borderRadius: '20px 20px 20px 20px' }} />
                <Card.Content style={{ borderRadius: '20px 20px 20px 20px' }}>
                  <Card.Header>{photo.title}</Card.Header>
                  <Card.Description>{photo.description}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <button className="ui button red" onClick={() => handleUnlike(photo.id)}>
                    Unlike
                  </button>
                </Card.Content>
              </Card>
            </Grid.Column>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default LikePhotos;