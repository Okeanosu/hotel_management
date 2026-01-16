import { useState, useEffect } from "react";
import Banner from "../components/_child/Banner";

import newRequest from "../utils/newRequest";
import { useNavigate } from "react-router-dom";

// const itemContentContainerLink = {
//   margin: "10px 0 15px",
//   fontSize: "18px",
//   lineHeight: "28px",
//   color: "#000",
//   textTransform: "uppercase",
//   fontWeight: "bolder",
//   transition: "0.3s",
// };

// const readMoreLink = {
//   fontSize: "15px",
//   lineHeight: "24px",
//   fontWeight: "bold",
//   marginTop: "20px",
//   marginBottom: "10px",
//   color: "#000",
// };

const News = () => {
  const navigate = useNavigate();
  const folder = "banner/news";
  const [imgBanner, setImgBanner] = useState("");
  const [dataPost, setDataPost] = useState([]);

  const handleDetails = (id) => {
    navigate(`${id}`);
  };

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
      .get(`post`)
      .then((res) => {
        setDataPost(res.data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, []);

  return (
    <div>
      {imgBanner && <Banner img={imgBanner} text="news" />}
      <div className="page-news">
        <div className="container">
          <div className="news-box">
            {dataPost.map((item, index) => (
              <div className="item" key={index}>
                <div className="item-border" />
                <div className="item-img">
                  <img src={item.images[0].url} alt="" />
                </div>
                <div className="item-content">
                  <div className="item-content-container">
                    <h3>
                      <span onClick={() => handleDetails(item._id)}>
                        {item.title}
                      </span>
                    </h3>

                    <div
                      dangerouslySetInnerHTML={{
                        __html: item.content.slice(0, 350),
                      }}
                    />
                    <div className="read-more">
                      <span
                        href={`/news/${item._id}`}
                        onClick={() => handleDetails(item._id)}
                      >
                        Read more
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="pagination" />
        </div>
      </div>
    </div>
  );
};

export default News;
