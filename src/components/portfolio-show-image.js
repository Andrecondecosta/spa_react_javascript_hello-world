import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function PortfolioShowImage() {
  const [categories, setCategories] = useState({});
  const [error, setError] = useState(null);

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
  }, []); // Empty dependency array to run this effect once

  return (
    <div className="category-container">
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        Object.entries(categories).map(([categoryId, categoryPhotos]) => {
          if (categoryPhotos.length > 0) {
            return (
              <div key={categoryId}>
                <div className="card">
                <img key={categoryPhotos[0].id} src={categoryPhotos[0].photo.image_data} alt={categoryPhotos[0].photo.title} className="img-container" />

                  <h1>{categoryPhotos[0].category.name}</h1>
                  <p className="title">Category: {categoryPhotos[0].category.name}</p>
                  <Link to={`/category/${categoryPhotos[0].category.id}`}>
                    <p><button className='button-portfolio'>View</button></p>
                  </Link>
                </div>
              </div>
            );
          } else {
            return null;
          }
        })
      )}
    </div>
  );
}

export default PortfolioShowImage;
