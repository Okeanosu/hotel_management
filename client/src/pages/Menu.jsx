import { useState, useEffect } from "react";
import Banner from "../components/_child/Banner";

// import images
import menuItem from "../assets/images/menu-item.jpg";
import bannerGalley from "../assets/images/banner-gallery.jpg";

import newRequest from "../utils/newRequest";

const Menu = () => {
  const folder = "banner/menu";
  const [imgBanner, setImgBanner] = useState("");
  const [dataFood, setDataFood] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    newRequest
      .get(`image/?folder=${folder}`)
      .then((res) => {
        setImgBanner(res.data.url);
      })
      .catch((error) => {
        console.log("Error retrieving banner image:", error);
      });

    newRequest
      .get(`food`)
      .then((res) => {
        setDataFood(res.data.reverse());
        setDataLoaded(true);
      })
      .catch((error) => {
        console.log("Error retrieving food data:", error);
      });
  }, []);

  return (
    <div>
      {dataLoaded && imgBanner && <Banner img={imgBanner} text="Menu" />}
      <section>
        <div className="menu bg-white">
          <div className="container">
            <div className="menu-box">
              <div className="menu-list row">
                <div className="pagination">
                  {Array.from(
                    { length: Math.ceil(dataFood.length / 3) },
                    (_, i) => (
                      <ul key={i} id="pagination-menu">
                        {dataFood.slice(i * 3, i * 3 + 3).map((item, index) => (
                          <div
                            key={index}
                            className="col-md-6 col-lg-4 col-sm-12"
                          >
                            <div className="menu-item">
                              <a href="#" className="menu-img">
                                <img src={item.image.url} alt="" />
                              </a>
                              <div className="menu-title">
                                <h3>
                                  <a href="#">{item.name}</a>
                                </h3>
                              </div>
                            </div>
                          </div>
                        ))}
                      </ul>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Menu;
