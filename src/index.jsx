import React from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";
import App from "../App";
import { UserProvider } from "../UserContext";

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(
  <UserProvider>
    <App />
  </UserProvider>
);
