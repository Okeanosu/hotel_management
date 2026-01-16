import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Banner from "../components/_child/Banner";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import newRequest from "../utils/newRequest";

const NewsDetails = () => {
  const folder = "banner/news";
  const { id } = useParams();
  const [imgBanner, setImgBanner] = useState("");
  const [dataPost, setDataPost] = useState([]);

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
      .get(`post/${id}`)
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
      <div className="container">
        <ReactQuill value={dataPost.text} readOnly={true} theme="bubble" />
      </div>
    </div>
  );
};

export default NewsDetails;
