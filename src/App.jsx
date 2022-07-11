import React, { Suspense } from "react";

import { Island } from "./components/Island.jsx";
import NotHydrated from "./components/NotHydrated.jsx";

import { demoContext } from "./DemoContext.js";

export default function App({ username, title, description }) {
  return (
    <demoContext.Provider value={{ name: "Phil" }}>
      <div style={{ display: "grid", gridGap: "1rem" }}>
        <h1>{title}</h1>
        <Island
          componentName={"Counter"}
          contextNames={["demoContext"]}
          start={2}
        />
        <NotHydrated />
        <Island
          componentName={"Counter"}
          contextNames={["demoContext"]}
          start={20}
        />
      </div>
    </demoContext.Provider>
  );
}
