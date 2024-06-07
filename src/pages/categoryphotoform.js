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
          fetch(`${process.env.REACT_APP_API_SERVER_URL}/categories`),
          fetch(`${process.env.REACT_APP_API_SERVER_URL}/photos`)
        ]);

        if (!categoryResponse.ok || !imageResponse.ok) {
          throw new Error('Failed to load data from server.');
        }

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

    if (!selectedCategory || selectedImages.length === 0) {
      setMessage('Please select a category and at least one image.');
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_SERVER_URL}/category_photos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          category_id: selectedCategory,
          image_ids: selectedImages
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create associations.');
      }

      // const data = await response.json(); // <--- Remova esta linha
      setMessage('Associations created successfully!');
      setSelectedCategory('');
      setSelectedImages([]);
    } catch (error) {
      console.error('Error:', error);
      setMessage('Failed to create associations.');
    }
  };


  return (
    <PageLayout>
      <div className="category-photo-form">
        <h1>Associate Images to Category</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="category-select">Select Category:</label>
            <select
              id="category-select"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="">--Select a Category--</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Select Images:</label>
            <div className="image-selection">
              {images.map((image) => (
                <div key={image.id} className="image-item">
                  <label>
                    <input
                      type="checkbox"
                      value={image.id}
                      checked={selectedImages.includes(image.id)}
                      onChange={handleImageSelection}
                    />
                    <img
                      src={image.image_data}
                      alt={image.title}
                      className="thumbnail"
                    />
                  </label>
                </div>
              ))}
            </div>
          </div>
          <button type="submit">Associate Images</button>
          {message && <p className="message">{message}</p>}
        </form>
      </div>
    </PageLayout>
  );
}

export default CategoryPhotoForm;
