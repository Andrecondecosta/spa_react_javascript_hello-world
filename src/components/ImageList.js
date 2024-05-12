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
      <h1> Home Images</h1>
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
            onClick={() => handleRemoveImage(index)}
          >
            X
          </button>
        </div>
      ))}
    </div>
  );
  function handleRemoveImage(index) {
    setImages(images.filter((_, i) => i !== index));
  }
}

export default ImageList;
