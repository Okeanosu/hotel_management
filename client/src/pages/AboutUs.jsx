import { useEffect, useState } from "react";
import Banner from "../components/_child/Banner";
import banner from "../assets/images/banner-about-us.jpg";

// import images
import bgAbout from "../assets/images/bg-abu.png";
import about1 from "../assets/images/abu-1.jpg";
import about2 from "../assets/images/abu-2.jpg";
import about3 from "../assets/images/abu-3.jpg";
import newRequest from "../utils/newRequest";

const AboutUs = () => {
  const folder = "banner/about-us";
  const [imgBanner, setImgBanner] = useState("");

  useEffect(() => {
    newRequest
      .get(`image/?folder=${folder}`)
      .then((res) => {
        setImgBanner(res.data.url);
      })
      .catch((error) => {
        console.log("Error retrieving banner image:", error);
      });
  }, []);

  return (
    <div className="about">
      {imgBanner && <Banner img={imgBanner} text="about us" />}

      <div className="about-intro bg-sena">
        <div className="container position-abs">
          <h2>
            Welcome to <br />
            <b>Cozynibi Hotel</b>
          </h2>
          <div className="detail_">
            <p className="text-center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              vel molestie nisl. Duis ac mi leo. Mauris at convallis erat.
              Aliquam interdum semper luctus. Aenean ex tellus, gravida ut
              rutrum dignissim, malesuada vitae nulla. Sed viverra, nisl dapibus
              lobortis porttitor, risus risus dictum risus, sed rhoncus orci
              urna dignissim leo. Cras id nunc nulla. Aliquam a tortor
              fermentum, finibus elit ac, dictum purus. Nulla mollis ex interdum
              commodo luctus. In hac habitasse platea dictumst. Quisque vel
              rutrum ipsum.
            </p>
          </div>
        </div>
      </div>
      <div className="list-about-us">
        <div className="item-abu">
          <div className="top-connect">
            <img src={bgAbout} alt="" />
          </div>
          <div className="abu-content">
            <div className="avt">
              <img src={about1} alt="" />
            </div>
            <div className="desc">
              <h3>comfortable rooms</h3>
              <div className="content-wrapp">
                <div className="detail">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Integer vel molestie nisl. Duis ac mi leo. Mauris at
                    convallis erat. Aliquam interdum semper luctus. Aenean ex
                    tellus, gravida ut rutrum dignissim, malesuada vitae nulla.
                    Sed viverra, nisl dapibus lobortis porttitor, risus risus
                    dictum risus, sed rhoncus orci urna
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bottom-connect">
            <img src={bgAbout} alt="" />
          </div>
        </div>
        <div className="item-abu">
          <div className="top-connect">
            <img src={bgAbout} alt="" />
          </div>
          <div className="abu-content">
            <div className="avt">
              <img src={about2} alt="" />
            </div>
            <div className="desc special">
              <h3>extensive menu</h3>
              <div className="content-wrapp">
                <div className="detail">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Integer vel molestie nisl. Duis ac mi leo. Mauris at
                    convallis erat. Aliquam interdum semper luctus. Aenean ex
                    tellus, gravida ut rutrum dignissim, malesuada vitae nulla.
                    Sed viverra, nisl dapibus lobortis porttitor, risus risus
                    dictum risus, sed rhoncus orci urna dignissim leo. Cras id
                    nunc nulla.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="item-abu">
          <div className="top-connect">
            <img src={bgAbout} alt="" />
          </div>
          <div className="abu-content">
            <div className="avt">
              <img src={about3} alt="" />
            </div>
            <div className="desc">
              <h3>extensive menu</h3>
              <div className="content-wrapp">
                <div className="detail">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Integer vel molestie nisl. Duis ac mi leo. Mauris at
                    convallis erat. Aliquam interdum semper luctus. Aenean ex
                    tellus, gravida ut rutrum dignissim, malesuada vitae nulla.
                    Sed viverra, nisl dapibus lobortis porttitor, risus risus
                    dictum risus, sed rhoncus orci urna dignissim leo. Cras id
                    nunc nulla. Aliquam a tortor fermentum, finibus elit ac,
                    dictum purus.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bottom-connect mb-20px">
            <img src={bgAbout} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
