import React, { useEffect, useState } from 'react';

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

  return (
    <div>
      {Object.entries(categories).map(([categoryId, categoryPhotos]) => {
  console.log(categoryId, categoryPhotos);
        return (
          <div key={categoryId}>
            <h2>{categoryPhotos[0].category.name}</h2>
            {categoryPhotos.map((categoryPhoto) => (
              <img key={categoryPhoto.id} src={categoryPhoto.photo.image_data} alt={categoryPhoto.photo.title} style={{ width: '50px', height: '50px', margin: '5px' }} />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default PhotosByCategory;
