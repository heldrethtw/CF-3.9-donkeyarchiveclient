import React from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { MainView } from "./components/MainView/main-view";

const DonkeyArchive = () => {
  return (
    <div className="Donkey-Archive">
      <span>Donkey Archive</span>
      <MainView />
    </div>
  );
};

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(<DonkeyArchive />);
