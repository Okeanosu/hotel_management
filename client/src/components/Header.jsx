import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";

const Header = () => {
  return (
    <header>
      <div className="header">
        <div className="header-container">
          <div className="header-logo">
            <Link to="/">
              <img src={logo} />
            </Link>
          </div>
          <div className="header-nav"> 
            <div className="header-top">
              <div className="form-search">
                <form action="">
                  <input type="text" placeholder="Search" />
                  <button></button>
                </form>
              </div>
              <div className="language">
                <div className="lang-active">
                  <span>Viet Nam</span>
                </div>
                <ul>
                  <li>
                    <Link to="/">English</Link>
                  </li>
                </ul>
              </div>
              <div className="btn-book">
                <Link to={"/"}>BOOK A ROOM</Link>
              </div>
            </div>

            <div className="sticker">
              <ul>
                <li>
                  <Link to={"/"}><span>HOME</span></Link>
                </li>
                <li>
                  <Link to={"/about-us"}><span>ABOUT US</span></Link>
                </li>
                <li>
                  <Link to={"/accommodation"}><span>ACCOMMODATION</span></Link>
                </li>
                <li>
                  <Link to={"/menu"}><span>MENU</span></Link>
                </li>
                <li>
                  <Link to={"/tour-travel"}><span>TOUR TRAVEL</span></Link>
                </li>
                <li>
                  <Link to={"/service"}><span>SERVICE</span></Link>
                </li>
                <li>
                  <Link to={"/news"}><span>NEWS</span></Link>
                </li>
                <li>
                  <Link to={"/gallery"}><span>GALLERY</span></Link>
                </li>
                <li>
                  <Link to={"/contact"}><span>CONTACT</span></Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
