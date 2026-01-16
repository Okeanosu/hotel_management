import React, { useState } from "react";
import Slider from "react-slick";

const SliderAccom = ({ data, onSlideClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4, 
    slidesToScroll: 1,
    initialSlide: currentSlide, 
    afterChange: (current) => setCurrentSlide(current),
  };

  const handleSlideClick = (index) => {
    setCurrentSlide(index);
    if (onSlideClick) {
      onSlideClick(index);
    }
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + data.length) % data.length);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % data.length);
  };

  return (
    <div className="slider-container">
      <div className="slider-nav slider-prev" onClick={goToPrevSlide}>
        &lt;
      </div>
      <Slider {...settings}>
        {data.map((room, index) => (
          <div key={room._id} onClick={() => handleSlideClick(index)}>
            <div className="slider-item">
              <img src={room.images[0].url} alt={room.name} />
              <div className="slider-item-content">
                <h3>{room.name}</h3>
                <p>{room.notes}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      <div className="slider-nav slider-next" onClick={goToNextSlide}>
        &gt;
      </div>
    </div>
  );
};

export default SliderAccom;
