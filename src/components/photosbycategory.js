import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const PhotosByCategory = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/category_photos');
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
      }
    };
    fetchCategories();
  }, []);

  function deletePhoto(id) {
    fetch(`http://localhost:3000/api/v1/category_photos/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Only parse as JSON if the response has a body
        return response.status === 204 ? {} : response.json();
      })
      .then(() => {
        // Handle successful deletion here
      })
      .catch(error => {
        if (error.message === 'HTTP error! status: 404') {
          console.error('CategoryPhoto not found');
        } else {
          console.error('There was a problem with the fetch operation:', error);
        }
      });
  }

  const deleteCategory = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/categories/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Remove the deleted category from the state
      setCategories(prevCategories => {
        return Object.fromEntries(Object.entries(prevCategories).filter(([categoryId]) => categoryId !== id));
      });
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <div>
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
              <img src={categoryPhoto.photo.image_data} alt={categoryPhoto.photo.title} style={{ width: '50px', height: '50px', margin: '5px' }} />
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
