import React from "react";
import Home from "../../pages/home/Home";

const MainApplication: React.FC = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#e0f7fa"
      }}
    >
      <Home />
    </div>
  );
};

export default MainApplication;
