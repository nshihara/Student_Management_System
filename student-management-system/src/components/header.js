import React from "react";
import { MenuOutlined } from "@ant-design/icons"; // Import MenuOutlined from Ant Design
import { HomeOutlined } from "@ant-design/icons";
import { HeartOutlined } from "@ant-design/icons";

const Header = () => {
  return (
    <header style={headerStyle}>
      <h3 style={topic}>STUDENT MANAGEMENT SYSTEM</h3>
      <div style={iconContainerStyle}>
        <span style={iconStyle}>
        <HomeOutlined />
        </span>
        <span style={iconStyle}>
          <HeartOutlined />
        </span>
        <span style={iconStyle}>
          <MenuOutlined />
        </span>
      </div>
    </header>
  );
};

const headerStyle = {
    background: "#3a427a",
    color: "#fff",
    textAlign: "left",
    padding: "0.5rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };
  
  const iconContainerStyle = {
    display: "flex",
    alignItems: "center",
  };
  
  const iconStyle = {
    fontSize: "20px",
    margin: "0 20px", // Add margin between icons
  };
  
  const topic = {
    marginLeft: "15px",
    fontFamily:"Candara",
  };

export default Header;
