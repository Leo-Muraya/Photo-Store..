import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Card, Image, Message } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

const Posted = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const currentUserId = JSON.parse(atob(token.split('.')[1])).sub;
      const url = `/user/${currentUserId}/posts`;

      fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(data => {
        setUserPosts(data.user_posts);
      })
      .catch(error => {
        setError('Error fetching user posts. Please try again.');
        console.error('Posted Error:', error);
      });
    }
  }, []);

  const handleDelete = (photoId) => {
    const token = localStorage.getItem('token');
    const url = `/photos/${photoId}`;

    fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => {
      // Update userPosts after successful deletion
      setUserPosts(prevPosts => prevPosts.filter(post => post.id !== photoId));
    })
    .catch(error => {
      console.error('Delete Error:', error);
    });
  };

  return (
    <Container>
      <h1>Posted Photos</h1>

      {userPosts.length === 0 && (
        <Message info>
          <Message.Header>No posted photos available.</Message.Header>
        </Message>
      )}

      <Card.Group>
        {userPosts.map(photo => (
          <Card key={photo.id}>
            <Image src={photo.image_url} alt={photo.title} />
            <Card.Content>
              <Card.Header>{photo.title}</Card.Header>
              <Card.Description>{photo.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Link to={`/photo/${photo.id}`}>
                <Button primary>View Information</Button>
              </Link>
              <Button color='red' onClick={() => handleDelete(photo.id)}>
                Delete
              </Button>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>

      {error && <Message negative>{error}</Message>}
    </Container>
  );
};

export default Posted;