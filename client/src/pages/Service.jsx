import { useState, useEffect } from "react";
import newRequest from "../utils/newRequest";
import Banner from "../components/_child/Banner";

import ser1 from "../assets/images/icon/ser-1.png";
import ser2 from "../assets/images/icon/ser-2.png";
import ser3 from "../assets/images/icon/ser-3.png";
import ser4 from "../assets/images/icon/ser-4.png";
import abu1 from "../assets/images/abu-1.jpg";
import sercviceItem1 from "../assets/images/sercvice-item-1.jpg";

const Service = () => {
  const folder = "banner/service";
  const [imgBanner, setImgBanner] = useState("");
  const [activeItem, setActiveItem] = useState(1);

  useEffect(() => {
    newRequest
      .get(`image/?folder=${folder}`)
      .then((res) => {
        setImgBanner(res.data.url);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, []);

  const handleItemClick = (id) => {
    setActiveItem(id);
  };

  const services = [
    {
      id: 1,
      icon: ser1,
      title: "Massage & Sauna",
      description:
        "Massage & Sauna is a rejuvenating wellness experience that combines therapeutic massage techniques with the relaxation benefits of steam and sauna. It relieves muscle tension, improves blood circulation, and promotes relaxation for a balanced mind and body.",
    },
    {
      id: 2,
      icon: ser2,
      title: "Charles Bar",
      description:
        "Charles Bar is a sophisticated and stylish lounge that offers a delightful ambiance and a wide selection of premium beverages. Whether you're seeking a refreshing cocktail, fine wine, or artisanal spirits, Charles Bar provides a chic setting to unwind and socialize. Indulge in a memorable drinking experience with attentive service and a vibrant atmosphere.",
    },
    {
      id: 3,
      icon: ser3,
      title: "Wedding",
      description:
        "Wedding is a magical celebration of love and commitment. From intimate ceremonies to grand receptions, we create unforgettable experiences tailored to your unique vision. Our dedicated team ensures meticulous planning and flawless execution, taking care of every detail from venue decoration to personalized menus. Let us make your dream wedding a reality, filled with joy, romance, and cherished memories that will last a lifetime.",
    },
    {
      id: 4,
      icon: ser4,
      title: "Meetings & Events",
      description:
        "Meetings & Events: Our versatile spaces and professional services are designed to cater to all your corporate and social gathering needs. Whether it's a business conference, team-building event, or a special celebration, we offer state-of-the-art facilities, customizable setups, and attentive staff to ensure a successful and memorable occasion. From small meetings to large-scale conferences, our venue provides a conducive environment for productivity and networking. Trust us to deliver seamless event solutions and create lasting impressions for your Meetings & Events.",
    },
  ];

  return (
    <div className="service">
      {imgBanner && <Banner img={imgBanner} text="service" />}
      <div className="page-service bg-abe">
        <div className="container">
          <div className="nav-slide-service">
            <ul className="service-list">
              {services.map((service) => (
                <li
                  key={service.id}
                  data-id={service.id}
                  className={activeItem === service.id ? "active-k" : ""}
                  onClick={() => handleItemClick(service.id)}
                >
                  <div className="item-ser">
                    <div className="icon">
                      <img src={service.icon} alt="" />
                    </div>
                    <h3>
                      <span>{service.title}</span>
                    </h3>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="content-service">
            <div className="service-k"></div>
            <div className="service-box">
              {services.map((service) => (
                <div
                  key={service.id}
                  className={`item ${
                    activeItem === service.id ? "active" : ""
                  }`}
                  data-id={service.id}
                >
                  <div className="avt">
                    <img src={sercviceItem1} alt="" />
                  </div>
                  <div className="desc">
                    <div className="desc-box">
                      <h3>{service.title}</h3>
                      <div className="desc-wrapp">
                        <div className="detail_">
                          <p>{service.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
