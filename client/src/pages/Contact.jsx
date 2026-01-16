import { useState, useEffect } from "react";
import Banner from "../components/_child/Banner";

// import images
import imgLocation from "../assets/images/ct-loc.png";
import imgPhone from "../assets/images/ct-phone.png";
import imgFax from "../assets/images/ct-fax.png";
import imgMail from "../assets/images/ct-mail.png";
import imgWeb from "../assets/images/ct-web.png";

import newRequest from "../utils/newRequest";
import toastService from "../../../admin/src/utils/toastService";

const Contact = () => {
  const folder = "banner/contact";
  const [imgBanner, setImgBanner] = useState("");
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

  const [form, setFrom] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    title: "",
    content: "",
  });

  const handleChange = (e) => {
    setFrom({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    newRequest.post(`contact/create`, form);
  };

  return (
    <div>
      {imgBanner && <Banner img={imgBanner} text="contact" />}
      <section>
        <div className="contact bg-sena">
          <div className="container">
            <div className="contact-content row">
              <div className="col-md-4 col-lg-4 col-sm-12">
                <div className="contact-left">
                  <h2>Cozynobi Hotel</h2>
                  <div className="contact-list">
                    <div className="contact-item">
                      <div className="contact-icon">
                        <img src={imgLocation} alt="" />
                      </div>
                      <div className="contact-text">
                        <p>
                          P.1505 - A2 Ecolife Capitol Building 58 To Huu, Thanh
                          Xuan, Hanoi
                        </p>
                      </div>
                    </div>
                    <div className="contact-item">
                      <div className="contact-icon">
                        <img src={imgPhone} alt="" />
                      </div>
                      <div className="contact-text">
                        <p>
                          <a href="#">(024) .3783.5639</a> -{" "}
                          <a href="#">(024) .3783.5640</a>
                        </p>
                      </div>
                    </div>
                    <div className="contact-item">
                      <div className="contact-icon">
                        <img src={imgFax} alt="" />
                      </div>
                      <div className="contact-text">
                        <p>(024) 3,783,5641</p>
                      </div>
                    </div>
                    <div className="contact-item">
                      <div className="contact-icon">
                        <img src={imgMail} alt="" />
                      </div>
                      <div className="contact-text">
                        <p>info@adcvietnam.net</p>
                      </div>
                    </div>
                    <div className="contact-item">
                      <div className="contact-icon">
                        <img src={imgWeb} alt="" />
                      </div>
                      <div className="contact-text">
                        <p>
                          <a href="#">www.adcvietnam.net</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-8 col-lg-8 col-sm-12">
                <div className="contact-right">
                  <h4>Get in touch with us</h4>
                  <div className="form-contact">
                    <form action="" onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-md-6 col-lg-6 col-sm-12">
                          <input
                            type="text"
                            className="input-contact"
                            name="name"
                            onChange={handleChange}
                            placeholder="Name"
                          />
                        </div>
                        <div className="col-md-6 col-lg-6 col-sm-12">
                          <input
                            type="text"
                            className="input-contact"
                            name="phone"
                            onChange={handleChange}
                            placeholder="Tel"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 col-lg-6 col-sm-12">
                          <input
                            type="email"
                            className="input-contact"
                            name="email"
                            onChange={handleChange}
                            placeholder="Email"
                          />
                        </div>
                        <div className="col-md-6 col-lg-6 col-sm-12">
                          <input
                            type="text"
                            className="input-contact"
                            name="address"
                            onChange={handleChange}
                            placeholder="Address"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12 col-lg-12 col-sm-12">
                          <input
                            type="text"
                            className="input-contact"
                            name="title"
                            onChange={handleChange}
                            placeholder="Title"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12 col-lg-12 col-sm-12">
                          <textarea
                            cols={30}
                            rows={10}
                            className="area-contact"
                            name="content"
                            placeholder="Comments"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="form-btn">
                        <button>Submit</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Map */}
      <section>
        <div className="map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.984638361172!2d105.78469205085867!3d20.993252885949055!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135acb433453903%3A0x89bf648fedc58921!2zNTggVOG7kSBI4buvdSwgVHJ1bmcgVsSDbiwgTmFtIFThu6sgTGnDqm0sIEjDoCBO4buZaSwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1570090288818!5m2!1svi!2s"
            width={600}
            height={450}
            style={{ border: 0 }}
            allowFullScreen=""
          />
        </div>
      </section>
    </div>
  );
};

export default Contact;
