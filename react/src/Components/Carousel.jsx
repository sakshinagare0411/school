import React, { useEffect, useState } from "react";
import './Carousel.css';
import Lottie from "lottie-react";
import text from "../assets/text.json";

import s1 from '../Images/carousel2.jpg';
import s6 from '../Images/carousel1.jpg';
import s7 from '../Images/carousel3.jpg';
import s2 from '../Images/carousel4.jpg';
// import Nav from "./Nav";

function Carousel() {
  const [selectedImage, setSelectedImage] = useState(0);
  const images = [s1, s6, s7, s2];
  const totalImages = images.length;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSelectedImage((prevSelectedImage) => (prevSelectedImage + 1) % totalImages);
    }, 4000);

    return () => clearInterval(intervalId);
  }, [totalImages]);

  const handlePrev = () => {
    setSelectedImage((prevSelectedImage) => (prevSelectedImage - 1 + totalImages) % totalImages);
  };

  const handleNext = () => {
    setSelectedImage((prevSelectedImage) => (prevSelectedImage + 1) % totalImages);
  };


  const style ={
    width: "300px",
    top : "30%",
    display: "flex",
    left :"20%",
    right : "20%"

  }
  return (
    <div id="carouselExampleCaptions" className="carousel d-flex justify-content-center slide h-100" style={{ height: '100vh' }}>
      {/* <Nav/> */}
      <div className="carousel-indicators">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to={index}
            className={index === selectedImage ? "active" : ""}
            aria-current={index === selectedImage ? "true" : "false"}
            aria-label={`Slide ${index + 1}`}
            onClick={() => setSelectedImage(index)}
          ></button>
        ))}
      </div>
      <div className="carousel-inner h-100">
  
        {images.map((image, index) => (
          <div
            key={index}
            className={`carousel-item h-100 ${index === selectedImage ? 'active' : ''}`}
          >
            <img className="h-100 w-100" src={image} alt={`Slide ${index + 1}`} />
            <div
              className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center"
              style={{ background: "rgba(24, 29, 56,.7)" }}
            ></div>
            <div className="carousel-caption d-block">
         
    <h2> PAHMV Secondary School</h2>
              <p>Learning, growing, together - explore our school's world!</p>
              <Lottie animationData={text} style={style}/>
            </div>
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        onClick={handlePrev}
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        onClick={handleNext}
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default Carousel;
