import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const PhotosByCategory = () => {
  const [categories, setCategories] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_SERVER_URL}/category_photos`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const categoryData = await response.json();

        // Transform data to group photos by category
        const groupedData = categoryData.reduce((acc, item) => {
          (acc[item.category.id] = acc[item.category.id] || []).push(item);
          return acc;
        }, {});

        setCategories(groupedData);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError('Failed to load categories. Please try again later.');
      }
    };

    fetchCategories();
  }, []); // Run once on mount

  const deletePhoto = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_SERVER_URL}/category_photos/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Update state by removing the deleted photo
      setCategories((prevCategories) => {
        const newCategories = { ...prevCategories };
        for (const categoryId in newCategories) {
          newCategories[categoryId] = newCategories[categoryId].filter(photo => photo.id !== id);
        }
        return newCategories;
      });
    } catch (error) {
      console.error('Error deleting photo:', error);
    }
  };

  const deleteCategory = async (categoryId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_SERVER_URL}/categories/${categoryId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Remove the deleted category from the state
      setCategories((prevCategories) => {
        const newCategories = { ...prevCategories };
        delete newCategories[categoryId];
        return newCategories;
      });
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <div>
      {error && <p className="error-message">{error}</p>}
      {Object.entries(categories).map(([categoryId, categoryPhotos]) => {
        return (
          <div key={categoryId}>
            <h2>
              {categoryPhotos[0].category.name}
              <button
                onClick={() => deleteCategory(categoryId)}
                style={{ margin: '5px' }}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </h2>
            {categoryPhotos.map((categoryPhoto) => (
              <div key={categoryPhoto.id}>
                <img
                  src={categoryPhoto.photo.image_data}
                  alt={categoryPhoto.photo.title}
                  style={{ width: '50px', height: '50px', margin: '5px' }}
                />
                <button
                  onClick={() => deletePhoto(categoryPhoto.id)}
                  style={{ margin: '5px' }}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default PhotosByCategory;
