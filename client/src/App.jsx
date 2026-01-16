import React from "react";
import { Route, Routes } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Accommodation from "./pages/Accommodation";
import Menu from "./pages/Menu";
import TourTravel from "./pages/TourTravel";
import Service from "./pages/Service";
import News from "./pages/News";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import "./App.css";
import AccommodationDetails from "./pages/AccommodationDetails";
import TourDetails from "./pages/TourDetails";
import NewsDetails from "./pages/NewsDetails";

const routes = [
  {
    path: "/",
    element: <Home />,
    title: "Home",
  },
  {
    path: "/about-us",
    element: <AboutUs />,
    title: "About Us",
  },
  {
    path: "/accommodation",
    element: <Accommodation />,
    title: "Accommodation",
  },
  {
    path: "/accommodation/:id",
    element: <AccommodationDetails />,
    title: "Accommodation details",
  },
  {
    path: "/menu",
    element: <Menu />,
    title: "Menu",
  },
  {
    path: "/tour-travel",
    element: <TourTravel />,
    title: "Tour Travel",
  },
  {
    path: "/tour-travel/:id",
    element: <TourDetails />,
    title: "Tour Details",
  },
  {
    path: "/service",
    element: <Service />,
    title: "Service",
  },
  {
    path: "/news",
    element: <News />,
    title: "News",
  },
  {
    path: "/news/:id",
    element: <NewsDetails />,
    title: "News details",
  },
  {
    path: "/gallery",
    element: <Gallery />,
    title: "Gallery",
  },
  {
    path: "/contact",
    element: <Contact />,
    title: "Contact",
  },
];

const App = () => {
  return (
    <div className="app">
      <Header />
      <div className="body">
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              exact
              path={route.path}
              element={
                <>
                  <Helmet>
                    <title>{route.title}</title>
                  </Helmet>
                  {route.element}
                </>
              }
            />
          ))}
        </Routes>
      </div>
      <Footer />
      <ToastContainer autoClose={2000} draggablePercent={60} />
    </div>
  );
};

export default App;
