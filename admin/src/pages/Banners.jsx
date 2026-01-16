import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tab, Tabs, Box, Button } from "@mui/material";

import BoardBanner from "../components/banner/BoardBanner";
import { listParentPage } from "../contexts/listPage";

const Banners = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("about-us");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    // history.push(`/banners/${newValue}`);
  };

  return (
    <div className="banners-container">
      <Box sx={{ width: "100%" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          centered
          sx={{
            boxShadow: `0 4px 6px -1px rgba(0,0,0,.1), 
              0 2px 4px -1px rgba(0,0,0,.06)`,
            position: "fixed",
            top: 0,
            left: 220,
            right: 0,
            backgroundColor: "#f8f8f8",
            zIndex: 1,
          }}
        >
          {listParentPage.map((page, index) => {
            return <Tab label={page.name} key={index} value={page.slug} />;
          })}
        </Tabs>
        <Box
          sx={{
            marginTop: "48px",
            overflowY: "auto",
            height: "calc(100vh - 48px)",
            padding: "10px",
          }}
        >
          <div className="content">
            <Button
              variant="contained"
              color="success"
              onClick={() => navigate(`create/${value}`)}
              sx={{ margin: "20px" }}
            >
              Create new banner
            </Button>
            <BoardBanner slug={value} />
          </div>
        </Box>
      </Box>
    </div>
  );
};

export default Banners;
