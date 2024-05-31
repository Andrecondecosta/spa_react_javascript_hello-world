import React, { useState, useEffect } from 'react';
import { PageLayout } from '../components/page-layout';

function CategoryPhotoForm() {
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoryResponse, imageResponse] = await Promise.all([
          fetch('http://localhost:3000/api/v1/categories'),
          fetch('http://localhost:3000/api/v1/photos')
        ]);
        const [categoryData, imageData] = await Promise.all([
          categoryResponse.json(),
          imageResponse.json()
        ]);
        setCategories(categoryData);
        setImages(imageData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setMessage('Failed to load data.');
      }
    };
    fetchData();
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleImageSelection = (event) => {
    const imageId = parseInt(event.target.value, 10);
    if (event.target.checked) {
      setSelectedImages((prevSelectedImages) => [...prevSelectedImages, imageId]);
    } else {
      setSelectedImages((prevSelectedImages) => prevSelectedImages.filter((id) => id !== imageId));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/v1/category_photos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          category_id: selectedCategory,
          image_ids: selectedImages
        })
      });
      const data = await response.json();
      setMessage('Associações criadas com sucesso');
    } catch (error) {
      console.error('Error:', error);
      setMessage('Failed to create associations.');
    }
  };

  return (
    <PageLayout>
    <div>
      <h1>Associate Images to Category</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Select Category:</label>
          <select value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">--Select a Category--</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Select Images:</label>
          {images.map((image, index) => (
            <div key={index} style={{ position: 'relative', display: 'inline-block' }}>
              <label>
                <input
                  type="checkbox"
                  value={image.id}
                  checked={selectedImages.includes(image.id)}
                  onChange={handleImageSelection}
                />
                <img src={image.image_data} alt={image.title} style={{ width: '50px', height: '50px' }}/>
              </label>
            </div>
          ))}
        </div>
        <button type="submit">Associate Images</button>
        {message && <p>{message}</p>}
      </form>
    </div>
    </PageLayout>
  );
}

export default CategoryPhotoForm;
