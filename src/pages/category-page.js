import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageLayout } from '../components/page-layout';
import ContactForm from '../components/contact-form';
import { Gallery } from 'react-grid-gallery';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const CategoryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categoryPhotos, setCategoryPhotos] = useState([]);
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(-1);
  const hasSelected = images.some((image) => image.isSelected);

  const fetchCategoryPhotos = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_API_SERVER_URL}/category_photos`);
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    fetchCategoryPhotos(id).then(photos => {
      if (Array.isArray(photos)) {
        const photosInCategory = photos.filter(photo => photo.category_id === Number(id));
        setCategoryPhotos(photosInCategory);
        setImages(photosInCategory.map(photo => ({
          id: photo.id, // Ensure each photo has a unique identifier
          src: photo.photo.image_data,
          thumbnail: photo.photo.image_data,
          isSelected: false,
          caption: photo.photo.title,
          original: photo.photo.image_data // Add original image data for Lightbox
        })));
      } else {
        console.error('Data is not an array:', photos);
      }
    });
  }, [id]);

  const handleSelect = (index, image) => {
    const nextImages = images.map((img, i) =>
      i === index ? { ...img, isSelected: !img.isSelected } : img
    );
    setImages(nextImages);
  };

  const handleSelectAllClick = () => {
    const nextImages = images.map((image) => ({
      ...image,
      isSelected: !hasSelected,
    }));
    setImages(nextImages);
  };

  const handleFormSubmit = () => {
    const selectedPhotos = images.filter(image => image.isSelected);
    const totalAmount = selectedPhotos.length * 20;
    navigate('/thank-you', { state: { totalAmount, selectedPhotos } });
  };

  const currentImage = images[index];
  const nextIndex = (index + 1) % images.length;
  const nextImage = images[nextIndex] || currentImage;
  const prevIndex = (index + images.length - 1) % images.length;
  const prevImage = images[prevIndex] || currentImage;

  const handleClick = (index) => setIndex(index);
  const handleClose = () => setIndex(-1);
  const handleMovePrev = () => setIndex(prevIndex);
  const handleMoveNext = () => setIndex(nextIndex);

  return (
    <PageLayout>
      <div>
        <button
          onClick={handleSelectAllClick}
          style={{
            backgroundColor: hasSelected ? '#007BFF' : '#6c757d',
            color: '#fff',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            opacity: hasSelected ? 1 : 0.7,
            transition: 'opacity 0.3s ease'
          }}
        >
          {hasSelected ? 'Clear selection' : 'Select all'}
        </button>
        {Array.isArray(categoryPhotos) && categoryPhotos.length > 0 && <h1>{categoryPhotos[0].category.name}</h1>}
        <Gallery
          images={images}
          onClick={handleClick}
          onSelect={handleSelect} // Use onSelect instead of onSelectImage
        />
        {!!currentImage && (
          <Lightbox
            mainSrc={currentImage.original}
            imageTitle={currentImage.caption}
            mainSrcThumbnail={currentImage.src}
            nextSrc={nextImage.original}
            nextSrcThumbnail={nextImage.src}
            prevSrc={prevImage.original}
            prevSrcThumbnail={prevImage.src}
            onCloseRequest={handleClose}
            onMovePrevRequest={handleMovePrev}
            onMoveNextRequest={handleMoveNext}
          />
        )}
      </div>
      <ContactForm
        showFirstName={true}
        showLastName={true}
        showEmail={true}
        showSubject={false}
        showMessage={true}
        selectedPhotos={images.filter(image => image.isSelected).map(image => image.id)} // Include photo IDs
        onSubmit={handleFormSubmit}
      />
    </PageLayout>
  );
};

export default CategoryPage;
