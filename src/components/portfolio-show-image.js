import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function PortfolioShowImage() {
  const [categories, setCategories] = useState({});

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

  return (
    <div className="category-container">
      {Object.entries(categories).map(([categoryId, categoryPhotos]) => {
        if (categoryPhotos.length > 0) {
          return (
            <div key={categoryId}>
              <div className="card">
                <img key={categoryPhotos[0].id} src={categoryPhotos[0].photo.image_data} alt={categoryPhotos[0].photo.title} className="img-container"  />
                <h1>{categoryPhotos[0].category.name}</h1>
                <p className="title">CEO & Founder, Example</p>
                <Link to={`/category/${categoryPhotos[0].category.id}`}>
                  <p><button className='button-portfolio'>View</button></p>
                </Link>
              </div>
            </div>
          );
        } else {
          return null;
        }
      })}
      </div>
  );
}

export default PortfolioShowImage;
