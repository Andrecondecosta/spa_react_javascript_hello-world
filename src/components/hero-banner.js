import React, { useState } from "react";
import img1 from "../images/image1.jpg";
import img2 from "../images/image2.jpg";
import img3 from "../images/image3.jpg";

export const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [img1, img2, img3];

  const plusSlides = (n) => {
    setCurrentSlide((prevSlide) => (prevSlide + n + images.length) % images.length);
  };

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
              <img src={image} style={{width:"100%"}} />
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
