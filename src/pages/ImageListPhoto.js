import React, { useState, useEffect } from 'react';
import { PageLayout } from '../components/page-layout';

function ImageWithHover({ image, deleteImage }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div style={{ position: 'relative', display: 'inline-block', zIndex: isHovered ? 9999 : 1 }}>
      {image.image_data && (
        <img
          src={image.image_data}
          alt={image.title}
          style={{
            width: '100px',
            height: '65px',
            margin: "15px",
            transform: isHovered ? 'scale(3)' : 'none'
          }}
          onMouseOver={() => setIsHovered(true)}
          onMouseOut={() => setIsHovered(false)}
        />
      )}
      <p>{image.name}</p>
      <button
        style={{
          position: 'absolute',
          top: 15,
          right: 15,
          color: 'black',
          border: 'none',
          cursor: 'pointer',
          display: isHovered ? 'none' : 'block'
        }}
        onClick={() => deleteImage(image.id)}
      >
        X
      </button>
    </div>
  );
}

function ImageListPhoto() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_SERVER_URL}/photos`);
      const data = await response.json();
      if (Array.isArray(data)) {
        setImages(data);
      } else {
        console.error('API response is not an array:', data);
      }
    } catch (error) {
      console.error(`Error fetching photos images:`, error);
    }
  };

  const deleteImage = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_SERVER_URL}/photos/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message);
      }

      setImages(images.filter((image) => image.id !== id));
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const imagesByMonth = images.reduce((acc, image) => {
    const date = new Date(image.created_at);
    if (isNaN(date.getTime())) {
      console.error('Invalid date:', image.created_at);
      return acc;
    }

    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    const key = `${month} ${year}`;

    if (!acc[key]) {
      acc[key] = [];
    }

    acc[key].push(image);

    return acc;
  }, {});

  return (
    <PageLayout>
      <div>
        <h1>Photos</h1>
        {Object.entries(imagesByMonth).map(([month, images]) => (
          <div key={month} style={{ position: 'relative', zIndex: 1 }}>
            <h2>{month}</h2>
            {images.map((image, index) => (
              <ImageWithHover key={index} image={image} deleteImage={deleteImage} />
            ))}
          </div>
        ))}
      </div>
    </PageLayout>
  );
}

export default ImageListPhoto;
