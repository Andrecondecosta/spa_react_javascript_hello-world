import React, { useState, useEffect } from 'react';

export const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [images, setImages] = useState([]);

  const plusSlides = (n) => {
    setCurrentSlide((prevSlide) => (prevSlide + n + images.length) % images.length);
  };

  const fetchImages = async () => {
    try {
      const response = await fetch('http://127.0.0.1:3000/api/v1/articles');
      const data = await response.json();
      setImages(data); // Não precisa fazer o parse de image_data
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="hero-page">
      <div className="hero-title">
        <h1> Bem vindo à minha pagina</h1>
        <h1><strong>CDPHOTOGRAFY</strong></h1>
        <span>Aqui você vai encontrar fotos de eventos, concursos, casamentos e muito mais</span>
      </div>
      <div className="hero-image">
        <div className="slideshow-container">
          {images.map((image, index) => (
            <div className={`mySlides fade ${index === currentSlide ? "active" : ""}`} key={index}>
              <img src={image.image_data} style={{width:"100%"}} /> {/* Ajuste aqui para usar image_data */}
            </div>
          ))}
          <a className="prev" onClick={() => plusSlides(-1)}>&#10094;</a>
          <a className="next" onClick={() => plusSlides(1)}>&#10095;</a>
        </div>
        <div className= "bottom-image">
          {images.map((_, index) => (
            <span className={`dot ${index === currentSlide ? "active" : ""}`} onClick={() => setCurrentSlide(index)} key={index}></span>
          ))}
        </div>
      </div>
    </div>
  );
};
