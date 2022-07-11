import React from "react";
import { hydrateRoot } from "react-dom/client";
import { IslandInner, makeElId } from "./components/Island.jsx";

const initial = window.__INITIAL__DATA__;

console.log({initial})

// Hydrate the islands
Object.entries(initial.islandState).forEach(
  ([id, { componentName, props, contexts }]) => {
    const elId = makeElId(id);
    const root = document.getElementById(elId);
    console.log("hyrdating", root, props);
    hydrateRoot(
      root,
      <IslandInner
        props={props}
        contexts={contexts}
        componentName={componentName}
        id={id}
        elId={elId}
      />
    );
  }
);

// hydrateRoot(
//   document.getElementById("root"),
//   <App
//     username={initial.username}
//     title={initial.title}
//     description={initial.description}
//   />,
// );
