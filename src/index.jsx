import React from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";
import MainView from "./components/MainView/MainView";

const DonkeyArchive = () => {
  return (
    <div className="Donkey-Archive">
      <span className="title">Donkey Archive</span>
      <MainView />
    </div>
  );
};

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(<DonkeyArchive />);
