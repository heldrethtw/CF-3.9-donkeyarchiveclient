import React from "react";
import { NavBar } from "../NavBar/NavBar";

export const MainView = () => {
  console.log("MainView");
  return (
    <div className="Main-View">
      <NavBar />
      <h1>Main View</h1>
    </div>
  );
};
