import React, { useState, useEffect } from 'react';

function ImageList() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch('http://127.0.0.1:3000/api/v1/articles');
      const data = await response.json();
      setImages(data); // Não precisa fazer o parse de image_data
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  return (
    <div>
      <h1>Images</h1>
      {images.map((image, index) => (
        <img
          key={index}
          src={image.image_data}
          alt={image.title}
          style={{ width: '300px', height: '300px', margin: "25px" }} // image_data já é uma URL
        />
      ))}
    </div>
  );
}

export default ImageList;
