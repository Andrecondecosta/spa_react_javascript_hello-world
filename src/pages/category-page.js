import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PageLayout } from '../components/page-layout';

const CategoryPage = () => {
  const { id } = useParams();
  const [categoryPhotos, setCategoryPhotos] = useState([]);

  const fetchCategoryPhotos = async (id) => {
    const response = await fetch(`http://localhost:3000/api/v1/category_photos`);
    const data = await response.json();
    return data;
  }

  useEffect(() => {
    console.log('id:', id); // log the value of id
    fetchCategoryPhotos(id).then(photos => {
      console.log('photos:', photos); // log the value of photos
      if (Array.isArray(photos)) {
        const photosInCategory = photos.filter(photo => photo.category_id === Number(id));
        setCategoryPhotos(photosInCategory);
      } else {
        console.error('Data is not an array:', photos);
      }
    });
  }, [id]);

  return (
    <PageLayout>
    <div>

      {Array.isArray(categoryPhotos) && categoryPhotos.length > 0 && <h1>{categoryPhotos[0].category.name}</h1>}
      {Array.isArray(categoryPhotos) && categoryPhotos.map(photo => (
        <img key={photo.id} src={photo.photo.image_data} alt={photo.photo.title} style={{ width: '50px', height: '50px', margin: '5px' }} />
      ))}

    </div>
      </PageLayout>
  );
}

export default CategoryPage;
