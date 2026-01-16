import React from "react";
import { Routes, Route } from "react-router-dom";
import { RequireAuth } from "react-auth-kit";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login.jsx";
import Sidebar from "./components/sidebar/Sidebar.jsx";
import Home from "./pages/Home.jsx";
import Banners from "./pages/Banners";
import CreateBanner from "./components/banner/CreateBanner.jsx";
import MyAccount from "./pages/MyAccount.jsx";
import { listParentPage, listChildPage } from "./contexts/listPage.jsx";
import "./App.scss";
import Booking from "./pages/Booking.jsx";

const App = () => {
  return (
    <div className="app">
      <div className="left">
        <Sidebar />
      </div>

      <div className="body">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/banners"
            element={
              <RequireAuth loginPath="/login">{<Banners />}</RequireAuth>
            }
          />
          <Route
            path="banners/create/:slug"
            element={
              <RequireAuth loginPath="/login">{<CreateBanner />}</RequireAuth>
            }
          />
          <Route
            path="/my-account"
            element={
              <RequireAuth loginPath="/login">{<MyAccount />}</RequireAuth>
            }
          />
          <Route
            path="/booking"
            element={
              <RequireAuth loginPath="/login">{<Booking />}</RequireAuth>
            }
          />
          {listChildPage.map((page, index) => {
            return (
              <Route
                key={index}
                path={`pages/${page.slug}`}
                element={
                  <RequireAuth loginPath="/login">{page.component}</RequireAuth>
                }
              />
            );
          })}
          {listParentPage.map((page, index) => {
            return (
              <Route
                key={index}
                path={`pages/${page.slug}`}
                element={
                  <RequireAuth loginPath="/login">{page.component}</RequireAuth>
                }
              />
            );
          })}
        </Routes>
      </div>
      <ToastContainer autoClose={2000} draggablePercent={60} />
    </div>
  );
};

export default App;
