import React from "react";
import {hydrateRoot} from "react-dom/client";
import App from "./App.jsx";

const initial = window.__INITIAL__DATA__;

hydrateRoot(
  document.getElementById("root"),
  <App
    username={initial.username}
    title={initial.title}
    description={initial.description}
  />,

);
