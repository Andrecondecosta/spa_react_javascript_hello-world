import React, { useState, useEffect } from 'react';
import FormCategory from './formcategory';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

function ImageListCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_SERVER_URL}/categories`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setCategories(data);
        } else {
          console.error('API response is not an array:', data);
        }
      } catch (error) {
        console.error(`Error fetching categories images:`, error);
      }
    };

    fetchImages();
  }, []); // Lista de dependências vazia para rodar apenas uma vez

  const deleteCategory = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_SERVER_URL}/categories/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message);
      }

      setCategories(categories.filter((category) => category.id !== id));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <div className='categories'>
      <div className='title-categories'>
        <h1 className='title-photos'>Categories</h1>
        <FormCategory />
      </div>
      <ul className='show-categories'>
        {categories.map((category) => (
          <li key={category.id} className='category-item'>
            <span className='category-name'>{category.name}</span>
            <button
              className='delete-button'
              onClick={() => deleteCategory(category.id)}
              aria-label={`Delete category ${category.name}`}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ImageListCategories;
