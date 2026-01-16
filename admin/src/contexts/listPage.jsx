import AboutUs from "../pages/AboutUs";
import Accommodation from "../pages/Accommodation";
import Menu from "../pages/Menu";
import TourTravel from "../pages/TourTravel";
import Service from "../pages/Service";
import News from "../pages/News";
import Gallery from "../pages/Gallery";
import Contact from "../pages/Contact";

import CreateRoom from "../components/controlPages/room/CreateRoom";
import UpdateRoom from "../components/controlPages/room/UpdateRoom";
import CreateTour from "../components/controlPages/tour/CreateTour";
import UpdateTour from "../components/controlPages/tour/UpdateTour";
import CreatePost from "../components/controlPages/post/CreatePost";
import UpdatePost from "../components/controlPages/post/UpdatePost";

export const listParentPage = [
  // {
  //   name: "About Us",
  //   slug: "about-us",
  //   component: <AboutUs />,
  // },
  {
    name: "Accommodation",
    slug: "accommodation",
    component: <Accommodation />,
  },
  {
    name: "Menu",
    slug: "menu",
    component: <Menu />,
  },
  {
    name: "Tour Travel",
    slug: "tour-travel",
    component: <TourTravel />,
  },
  // {
  //   name: "Service",
  //   slug: "service",
  //   component: <Service />,
  // },
  {
    name: "News",
    slug: "news",
    component: <News />,
  },
  {
    name: "Gallery",
    slug: "gallery",
    component: <Gallery />,
  },
  {
    name: "Contact",
    slug: "contact",
    component: <Contact />,
  },
];

export const listChildPage = [
  {
    name: "Create new room",
    slug: "accommodation/create",
    component: <CreateRoom />,
  },
  {
    name: "Update room",
    slug: "accommodation/update/:id",
    component: <UpdateRoom />,
  },
  {
    name: "Create new tour",
    slug: "tour-travel/create",
    component: <CreateTour />,
  },
  {
    name: "Update tour",
    slug: "tour-travel/update/:id",
    component: <UpdateTour />,
  },
  {
    name: "Create new post",
    slug: "news/create",
    component: <CreatePost />,
  },
  {
    name: "Update tour",
    slug: "news/update/:id",
    component: <UpdatePost />,
  },
];
