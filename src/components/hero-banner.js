import React, { useState, useEffect } from 'react';

export const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

  // Função para avançar ou retroceder slides
  const plusSlides = (n) => {
    setCurrentSlide((prevSlide) => (prevSlide + n + images.length) % images.length);
  };

  // Função para buscar imagens da API
  const fetchImages = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_SERVER_URL}/articles`);
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error('Error fetching images:', error);
      setError('Failed to load images');
    }
  };

  // UseEffect para buscar imagens ao montar o componente
  useEffect(() => {
    fetchImages();
  }, []);

  // UseEffect para mudar automaticamente os slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 5000); // Mudança de slide a cada 5 segundos

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="hero-page">
      <div className="hero-title">
        <h1>Bem vindo à minha página</h1>
        <h1><strong>CDPHOTOGRAFY</strong></h1>
        <span>Aqui você vai encontrar fotos de eventos, concursos, casamentos e muito mais</span>
      </div>
      <div className="hero-image">
        {error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div className="slideshow-container">
            {images.map((image, index) => (
              <div className={`mySlides fade ${index === currentSlide ? "active" : ""}`} key={index}>
                <img src={image.image_data} alt={image.title} style={{width: "100%"}} />
              </div>
            ))}
            <a className="prev" onClick={() => plusSlides(-1)}>&#10094;</a>
            <a className="next" onClick={() => plusSlides(1)}>&#10095;</a>
          </div>
        )}
        <div className="bottom-image">
          {images.map((_, index) => (
            <span
              className={`dot ${index === currentSlide ? "active" : ""}`}
              onClick={() => setCurrentSlide(index)}
              key={index}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};
