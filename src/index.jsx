import React from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./nav-bar.scss";
import "./director-view.scss";
import "./genre-view.scss";
import "./login-view.scss";
import "./main-view.scss";
import "./movie-card.scss";
import "./movie-view.scss";
import "./profile-view.scss";
import "./registration-view.scss";

const DonkeyArchiveClient = () => {
  return (
    <div className="donkey-archive">
      <h1>Donkey Archive</h1>
    </div>
  );
};

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(<DonkeyArchiveClient />);
