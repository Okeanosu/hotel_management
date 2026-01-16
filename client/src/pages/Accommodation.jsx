import { useState, useEffect } from "react";
import SliderAccom from "../components/_child/SliderAccom";
import { Link } from "react-router-dom";
import Banner from "../components/_child/Banner";

import bannerAboutUs from "../assets/images/banner-about-us.jpg";
import bgTitle from "../assets/images/bg-tit.png";
import bgFrame from "../assets/images/bg-frs.png";
import accomSlide1 from "../assets/images/accom-slide-1.jpg";
import bgReadmore from "../assets/images/bg-read-m.png";

import newRequest from "../utils/newRequest";

const bigItemTextContent = {
  textTransform: "uppercase",
  display: "inline-block",
  fontWeight: "bold",
  fontSize: "28px",
  lineHeight: "24px",
  position: "relative",
  background: bgReadmore,
  backgroundSize: "100% auto",
  backgroundPosition: "bottom",
  color: "#000",
  textDecoration: "none",
};

const readMore = {
  textTransform: "uppercase",
  display: "inline-block",
  fontWeight: "bold",
  fontSize: "14px",
  lineHeight: "24px",
  position: "relative",
  background: bgReadmore,
  backgroundSize: "100% auto",
  backgroundPosition: "bottom",
  color: "#000",
  textDecoration: "none",
};

const Accommodation = () => {
  const folder = "banner/accommodation";
  const [imgBanner, setImgBanner] = useState("");
  const [rooms, setRooms] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    newRequest
      .get(`image/?folder=${folder}`)
      .then((res) => {
        setImgBanner(res.data.url);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });

    newRequest
      .get(`room`)
      .then((res) => {
        setRooms(res.data);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }, []);

  const handleSlideClick = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div>
      {imgBanner && <Banner img={imgBanner} text="accommodation" />}
      <div className="container">
        <div className="slider-box">
          <div className="big-item">
            <div className="big-item-content">
              <div className="big-item-img">
                <img src={rooms[currentSlide]?.images[0].url} alt="" />
              </div>
              <div className="big-item-text">
                <div className="big-item-text-content">
                  <h3>{rooms[currentSlide]?.name}</h3>
                  <p>{rooms[currentSlide]?.descriptions}</p>
                  <div className="read-more">
                    <Link to={`${rooms[currentSlide]?._id}`} style={readMore}>
                      read more
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {rooms.length > 0 && (
            <SliderAccom data={rooms} onSlideClick={handleSlideClick} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Accommodation;
