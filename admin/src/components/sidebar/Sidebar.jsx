import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSignOut } from "react-auth-kit";

import { listParentPage } from "../../contexts/listPage";
import toastService from "../../utils/toastService";
import "./Sidebar.scss";

// import icons
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import PagesIcon from "@mui/icons-material/Pages";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import HotelIcon from '@mui/icons-material/Hotel';
import LogoutIcon from "@mui/icons-material/Logout";

const Sidebar = () => {
  const signOut = useSignOut();

  const [openPages, setOpenPages] = useState(false);
  const handlePagesClick = () => {
    setOpenPages(!openPages);
  };

  const handleLogout = () => {
    signOut();
    toastService.success("Đăng xuất thành công!");
  };

  return (
    <div className="sidebar">
      <NavLink className="item" to="/">
        <span className="logo">Admin.</span>
      </NavLink>
      <NavLink className="item" to="/banners">
        <ViewCarouselIcon />
        <span>Banners</span>
      </NavLink>
      <div className="pages">
        <div className="pages-header" onClick={handlePagesClick}>
          <PagesIcon />
          <span>Pages</span>
          {openPages ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </div>
        {openPages && (
          <div className="pages-list">
            {listParentPage.map((page, index) => {
              return (
                <NavLink
                  key={index}
                  className="page item"
                  to={`/pages/${page.slug}`}
                >
                  <span>{page.name}</span>
                </NavLink>
              );
            })}
          </div>
        )}
      </div>
      <NavLink className="item" to="/booking">
        <HotelIcon />
        <span>Booking</span>
      </NavLink>
      <NavLink className="item" to="/my-account">
        <ManageAccountsIcon />
        <span>My Account</span>
      </NavLink>
      <div className="item logout" onClick={handleLogout}>
        <LogoutIcon />
        <span>Logout</span>
      </div>
    </div>
  );
};

export default Sidebar;
