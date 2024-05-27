import React, { useState, useEffect } from 'react';
import UploadWidget from './Uploadwidget';

function ImageListArticle({ category = "" }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, [category]);

  const fetchImages = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:3000/api/v1/articles`);
      const data = await response.json();
      if (Array.isArray(data)) {
        setImages(data);
      } else {
        console.error('API response is not an array:', data);
      }
    } catch (error) {
      console.error(`Error fetching articles images:`, error);
    }
  };

  const deleteImage = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:3000/api/v1/articles/${id}`, {
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


  return (
    <div>
      <h1> Articles</h1>
      <UploadWidget />
      {images.map((image, index) => (
        <div key={index} style={{ position: 'relative', display: 'inline-block' }}>
  {image.image_data && (
    <img
      src={image.image_data}
      alt={image.title}
      style={{ width: '200px', height: '130px', margin: "25px" }} // image_data já é uma URL
    />
  )}
  <p>{image.name}</p>
  <button
    style={{
      position: 'absolute',
      top: 25,
      right: 25,
      color: 'black',
      border: 'none',
      cursor: 'pointer'
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
