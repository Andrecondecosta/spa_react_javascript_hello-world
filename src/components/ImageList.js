import React, { useState, useEffect } from 'react';

function ImageList({ category = "" }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, [category]);

  const fetchImages = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:3000/api/v1/${category}`);
      const data = await response.json();
      if (Array.isArray(data)) {
        setImages(data);
      } else {
        console.error('API response is not an array:', data);
      }
    } catch (error) {
      console.error(`Error fetching ${category} images:`, error);
    }
  };

  const deleteImage = async (id) => {
    const response = await fetch(`http://127.0.0.1:3000/api/v1/${category}/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      setImages(images.filter((image) => image.id !== id));
    }
  };

  return (
    <div>
      <h1> {category}</h1>
      {images.map((image, index) => (
        <div key={index} style={{ position: 'relative', display: 'inline-block' }}>
          <img
            src={image.image_data}
            alt={image.title}
            style={{ width: '200px', height: '130px', margin: "25px" }} // image_data já é uma URL
          />
          <button
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              background: 'red',
              color: 'white',
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

export default ImageList;
