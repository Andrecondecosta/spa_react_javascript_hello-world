import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { PageLayout } from '../components/page-layout';

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
    <PageLayout>
    <div>
      {error && <p className="error-message">{error}</p>}
      {Object.entries(categories).map(([categoryId, categoryPhotos]) => {
        return (
          <div key={categoryId}>
            <h2 className="category-heading">
              {categoryPhotos[0].category.name}
              <button
                onClick={() => deleteCategory(categoryId)}
                className="btn-delete-category"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </h2>
            {categoryPhotos.map((categoryPhoto) => (
              <div key={categoryPhoto.id} className="photo-item">
                <img
                  src={categoryPhoto.photo.image_data}
                  alt={categoryPhoto.photo.title}
                  className="image-category"
                />
                <button
                  onClick={() => deletePhoto(categoryPhoto.id)}
                  className="btn-delete-photo"

                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            ))}
          </div>
        );
      })}
    </div>
    </PageLayout>
  );
};

export default PhotosByCategory;
