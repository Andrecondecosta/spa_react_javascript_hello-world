import React, { useState, useEffect } from 'react';
import FormCategory from './formcategory';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

function ImageListCategories() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  });

  const fetchImages = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:3000/api/v1/categories`);
      const data = await response.json();
      if (Array.isArray(data)) {
        setImages(data);
      } else {
        console.error('API response is not an array:', data);
      }
    } catch (error) {
      console.error(`Error fetching categories images:`, error);
    }
  };

  const deleteImage = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:3000/api/v1/categories/${id}`, {
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
    <div className='categories'>
      <div className='title-categories'>
        <h1 className='title'> Categories</h1>
        <FormCategory />
      </div>
      <div className='show-categories'>
        {images.map((image, index) => (
          <div key={image.id} style={{ display: 'flex', alignItems: 'center' }}>
            <li className='image-name'>{image.name}</li>
            <button className='delete-button'

              onClick={() => deleteImage(image.id)}
            >
            <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageListCategories;
