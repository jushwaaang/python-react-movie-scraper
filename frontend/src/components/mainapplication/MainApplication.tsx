// src/App.tsx
import React from "react";
import "./style.css"; // Import the CSS file
import Home from "../../pages/home/Home";

const MainApplication: React.FC = () => {
  return (
    <div className="full-height">
      <Home />
    </div>
  );
};

export default MainApplication;
