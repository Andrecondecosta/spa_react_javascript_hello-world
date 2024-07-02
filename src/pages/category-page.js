import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Importe useNavigate
import { PageLayout } from '../components/page-layout';
import ContactForm from '../components/contact-form';

const CategoryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Use useNavigate para redirecionar
  const [categoryPhotos, setCategoryPhotos] = useState([]);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [isSelecting, setIsSelecting] = useState(false); // Estado para controlar a seleção

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
      } else {
        console.error('Data is not an array:', photos);
      }
    });
  }, [id]);

  const togglePhotoSelection = (photoId) => {
    setSelectedPhotos(prevSelectedPhotos =>
      prevSelectedPhotos.includes(photoId)
        ? prevSelectedPhotos.filter(id => id !== photoId)
        : [...prevSelectedPhotos, photoId]
    );
  };

  const handleSelectButtonClick = () => {
    setIsSelecting(!isSelecting); // Alterna entre ativar e desativar a seleção
  };

  const handleFormSubmit = () => {
    const totalAmount = selectedPhotos.length * 20; // Calcula o valor total
    navigate('/thank-you', { state: { totalAmount } }); // Redireciona para a página de agradecimento com o valor
  };

  return (
    <PageLayout>
      <div>
        <button
          onClick={handleSelectButtonClick}
          style={{
            backgroundColor: isSelecting ? '#007BFF' : '#6c757d', // Azul para ativado, cinza para desativado
            color: '#fff',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            opacity: isSelecting ? 1 : 0.7, // Mais opaco quando desativado
            transition: 'opacity 0.3s ease' // Transição suave para a opacidade
          }}
        >
          {isSelecting ? 'Cancelar Seleção' : 'Selecionar Fotos'}
        </button>
        {Array.isArray(categoryPhotos) && categoryPhotos.length > 0 && <h1>{categoryPhotos[0].category.name}</h1>}
        {Array.isArray(categoryPhotos) && categoryPhotos.map(photo => (
          <img
            key={photo.id}
            src={photo.photo.image_data}
            alt={photo.photo.title}
            style={{
              width: '100px',
              height: '100px',
              margin: '5px',
              border: isSelecting && selectedPhotos.includes(photo.id) ? '2px solid blue' : 'none', // Ativa a seleção de fotos
              cursor: isSelecting ? 'pointer' : 'default' // Muda o cursor para pointer durante a seleção
            }}
            onClick={isSelecting ? () => togglePhotoSelection(photo.id) : null} // Ativa a seleção ao clicar na foto
          />
        ))}
      </div>
      <ContactForm
        showFirstName={true}
        showLastName={true}
        showEmail={true}
        showSubject={false}
        showMessage={true}
        selectedPhotos={selectedPhotos}
        onSubmit={handleFormSubmit} // Passe a função de submissão
      />
    </PageLayout>
  );
};

export default CategoryPage;
