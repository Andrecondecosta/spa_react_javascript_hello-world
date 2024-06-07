import React, { useState, useEffect } from 'react';
import UploadWidget from './Uploadwidget';

function ImageListArticle({ category = "" }) {
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchImages();
  }, [category]);

  const fetchImages = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_SERVER_URL}/articles`);
      if (!response.ok) {
        throw new Error('Failed to fetch images.');
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        setImages(data);
      } else {
        console.error('API response is not an array:', data);
        setError('Data format is incorrect.');
      }
    } catch (error) {
      console.error('Error fetching articles images:', error);
      setError('Error fetching articles images.');
    }
  };

  const deleteImage = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_SERVER_URL}/articles/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message);
      }

      // Update the images state to remove the deleted image
      setImages((prevImages) => prevImages.filter((image) => image.id !== id));
    } catch (error) {
      console.error('Error deleting image:', error);
      setError('Error deleting image.');
    }
  };

  return (
    <div>
      <h1>Articles</h1>
      {error && <p className="error-message">{error}</p>}
      <UploadWidget />
      {images.map((image, index) => (
        <div key={index} style={{ position: 'relative', display: 'inline-block' }}>
          {image.image_data && (
            <img
              src={image.image_data}
              alt={image.title}
              style={{ width: '200px', height: '130px', margin: '25px' }} // image_data já é uma URL
            />
          )}
          <p>{image.title}</p>
          <button
            style={{
              position: 'absolute',
              top: 25,
              right: 25,
              color: 'black',
              border: 'none',
              cursor: 'pointer',
            }}
            onClick={() => deleteImage(image.id)}
          >
            X
          </button>
        </div>
      ))}
    </div>
  );
}

export default ImageListArticle;
