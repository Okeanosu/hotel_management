import React from "react";

const Footer = () => {
  return (
    <div>
      <div className="footer">
        <div className="container">
          <div className="footer-top">
            <div className="row">
              <div className="col-md-6 col-lg-3 col-sm-12">
                <div className="footer-item">
                  <div className="footer-title">Contact Us</div>
                  <div className="address">
                    <p>58, To Huu, Thanh Xuan, Hanoi</p>
                  </div>
                  <div className="phone">
                    <p>
                      <a href="tel:02437835639">(024).3783.5639</a>
                    </p>
                  </div>
                  <div className="mail">
                    <p>info@adcvietnam.net</p>
                  </div>
                  <div className="web">
                    <p>
                      <a href="#">www.adcvietnam.net</a>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3 col-sm-12">
                <div className="footer-item">
                  <div className="footer-title">Accommodation</div>
                  <div className="footer-list">
                    <ul>
                      <li>
                        <a href="#">Double room</a>
                      </li>
                      <li>
                        <a href="#">Tripple room</a>
                      </li>
                      <li>
                        <a href="#">Dorm room</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3 col-sm-12">
                <div className="footer-item">
                  <div className="footer-title">Contact Us</div>
                  <div className="footer-list">
                    <ul>
                      <li>
                        <a href="#">Massage &amp; Sauna</a>
                      </li>
                      <li>
                        <a href="#">Charles Bar</a>
                      </li>
                      <li>
                        <a href="#">Wedding</a>
                      </li>
                      <li>
                        <a href="#">Meetings &amp; Events</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3 col-sm-12">
                <div className="footer-item">
                  <div className="footer-title">Newsletter</div>
                  <form action="" className="form-letter">
                    <div className="d-flex">
                      <input type="text" placeholder="Enter your email" />
                      <button />
                    </div>
                  </form>
                  <div className="footer-social">
                    <a href="#">
                      <i className="fa-brands fa-facebook-f" />
                    </a>
                    <a href="#">
                      <i className="fa-brands fa-twitter" />
                    </a>
                    <a href="#">
                      <i className="fa-brands fa-youtube" />
                    </a>
                    <a href="#">
                      <i className="fa-brands fa-instagram" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bottom row">
            <div className="col-md-6 col-lg-8 col-sm-12">
              <div className="footer-left">
                <ul className="d-flex flex-wrap justify-content-center justify-content-lg-start">
                  <li>
                    <a href="../layout/index.html">Home</a>
                  </li>
                  <li>
                    <a href="../layout/about.html">About Us</a>
                  </li>
                  <li>
                    <a href="#">Food Restaurant</a>
                  </li>
                  <li>
                    <a href="#">Tour Travel</a>
                  </li>
                  <li>
                    <a href="../layout/news.html">News</a>
                  </li>
                  <li>
                    <a href="../layout/gallery.html">Gallery</a>
                  </li>
                  <li>
                    <a href="../layout/contact.html">Contact Us</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 col-sm-12">
              <div className="footer-right">
                <p>Copyright © COZYNIBI HITEL. All Rights Reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
