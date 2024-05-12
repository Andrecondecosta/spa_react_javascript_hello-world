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
  return (
    <div>
      <h1> Images</h1>
      {images.map((image, index) => (
        <img
          key={index}
          src={image.image_data}
          alt={image.title}
          style={{ width: '200px', height: '130px', margin: "25px" }}
        />
      ))}
    </div>
  );
}

export default ImageList;
