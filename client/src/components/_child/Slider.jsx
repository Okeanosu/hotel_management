import React, { Component } from "react";
import Slider from "react-slick";
import banner from '../../assets/images/banner.jpg';

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      prevArrow: <SamplePrevArrow />,
      nextArrow: <SampleNextArrow />,
    };
    return (
      <div>
        <Slider {...settings}>
          <div>
            <img src={banner} alt="" className="w-100" />
          </div>
          <div>
            <img src={banner} alt="" className="w-100" />
          </div>
          <div>
            <img src={banner} alt="" className="w-100" />
          </div>
        </Slider>
      </div>
    );
  }
}
