import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/Contexts';

const HomePage = () => {
  const { authState } = useAuth();
  const [photos, setPhotos] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };

    axios.get('/photos', config)
      .then(response => {
        setPhotos(response.data.photos);
      })
      .catch(error => {
        console.error('Error fetching photos:', error);
      });
  }, []);

  const handleLike = async (photoId) => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };

    try {
      // Send a request to like the photo
      const response = await axios.post(`/photos/${photoId}/like`, {}, config);
      
      // Update the liked state for the photo
      setPhotos(prevPhotos => 
        prevPhotos.map(prevPhoto => 
          prevPhoto.id === photoId ? { ...prevPhoto, liked: !prevPhoto.liked } : prevPhoto
        )
      );

      console.log('Response:', response.data);
      console.log('Photo liked successfully');
    } catch (error) {
      console.error('Error liking photo:', error);
    }
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', padding: '20px', fontFamily: 'Poppins, sans-serif' }}>
      {photos.map(photo => (
        <div
          key={photo.id}
          className="card"
          style={{ 
            width: '300px', 
            margin: '10px', 
            overflow: 'hidden', 
            position: 'relative', 
            borderRadius: '20px', 
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
            transition: 'transform 0.3s',
            transform: hoveredCard === photo.id ? 'scale(1.05)' : 'scale(1)',
          }}
          onMouseEnter={() => setHoveredCard(photo.id)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <img src={photo.image_url} alt={photo.title} style={{ width: '100%', height: 'auto', borderRadius: '20px 20px 0 0' }} />
          <div className="card-content" style={{ padding: '15px', background: '#fff', borderRadius: '0 0 20px 20px', position: 'relative' }}>
            <h3 style={{ marginTop: '0' }}>{photo.title}</h3>
            <p>{photo.description}</p>
            {authState.isAuthenticated && (
              <Link to={`/photo/${photo.id}`}>
              <button style={{ background: 'blue', color: 'white', border: 'none', padding: '10px',  borderRadius: '20px', marginRight: '10px', }}>
                View Information
              </button>
              </Link>
            )}
            {authState.isAuthenticated && (
              <button onClick={() => handleLike(photo.id)} className={`ui icon ${photo.liked ? 'red' : ''} button`} style={{ position: 'absolute', bottom: '15px', right: '15px' }}>
                <i className="heart icon"></i>
                {photo.liked ? ' Liked' : ' Like'}
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomePage;