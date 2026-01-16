import { useState, useEffect } from "react";
import Banner from "../components/_child/Banner";

import newRequest from "../utils/newRequest";

const Gallery = () => {
  const folder = "banner/gallery";
  const [imgBanner, setImgBanner] = useState("");
  const [dataShowcase, setDataShowcase] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    newRequest
      .get(`image/?folder=${folder}`)
      .then((res) => {
        setImgBanner(res.data.url);
      })
      .catch((error) => {
        console.log("Error:", error);
      });

    newRequest
      .get(`showcase`)
      .then((res) => {
        setDataShowcase(res.data.reverse());
        setDataLoaded(true);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }, []);

  return (
    <div>
      {dataLoaded && imgBanner && <Banner img={imgBanner} text="gallery" />}
      <section>
        <div className="gallery bg-white">
          <div className="container">
            <div className="gallery-box">
              <div className="gallery-list row">
                <div className="pagination">
                  {Array.from(
                    { length: Math.ceil(dataShowcase.length / 4) },
                    (_, i) => (
                      <ul key={i} id="pagination-gallery">
                        {dataShowcase
                          .slice(i * 4, i * 4 + 4)
                          .map((item, index) => (
                            <div
                              key={index}
                              className="col-md-4 col-lg-3 col-sm-6"
                            >
                              <div className="gallery-item">
                                <a href="#" className="gallery-img">
                                  <img src={item.image.url} alt="" />
                                </a>
                                {/* <div className="menu-title">
                                  <h3>
                                    <a href="#">{item.name}</a>
                                  </h3>
                                </div> */}
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

export default Gallery;
