import React, { useState } from "react";
// import "./ImageSlider.css"; // Make sure you have the CSS file in the same folder or adjust the path accordingly
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
const ImageSlider = () => {
  const [current, setCurrent] = useState(0);

  const images = [
    "https://img.freepik.com/premium-photo/cardboard-box-with-oil-canned-food-cereals-pasta_191543-705.jpg?w=900",
    "https://img.freepik.com/premium-photo/cardboard-box-with-oil-canned-food-cereals-pasta_191543-705.jpg?w=900",
    "https://img.freepik.com/premium-photo/cardboard-box-with-oil-canned-food-cereals-pasta_191543-705.jpg?w=900",
  ];
  const nextSlide = () => {
    setCurrent((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  if (!Array.isArray(images) || images.length === 0) {
    return null; // or some fallback UI if the images array is empty
  }

  return (
    <div>
      <div className="slider" id="threerec1">
        <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide} />
        <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide} />
        {images.map((image, index) => (
          <div
            className={index === current ? "slide active" : "slide"}
            key={index}
          >
            {index === current && (
              <img src={image} alt={`Slide ${index}`} className="image" />
            )}
          </div>
        ))}
      </div>
      <div className="heading">RISE AGAINST HUNGER</div>
    </div>
  );
};

export default ImageSlider;
