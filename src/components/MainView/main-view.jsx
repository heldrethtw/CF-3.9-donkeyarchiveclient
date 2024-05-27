import React from "react";
import Navbar from "../NavBar/NavBar";

export const MainView = () => {
  console.log("MainView");
  return (
    <div className="Main-View">
      <Navbar />
      <p>WELCOME EQUIDAE!</p>
    </div>
  );
};
