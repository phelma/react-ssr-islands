import React, { lazy, Suspense, useContext, useId } from "react";
import { useIslandStateContext } from "../IslandStateContext.jsx";

import { demoContext } from "../DemoContext.js";

const components = {
  Counter: lazy(() => import("./Counter.jsx")),
};

const contextsByName = {
  demoContext,
};

export const makeElId = (id) => id.replace(/:/g, "_");
export const idFromElId = (id) => id.replace(/_/g, ":");

export function IslandInner({ isWrapped, componentName, props, contexts }) {
  const Component = components[componentName];
  let item = (
    <>
      <div>Island inner {componentName} </div>
      <Suspense fallback={<div>LOADING</div>}>
        <Component {...props} />
      </Suspense>
    </>
  );

  if (isWrapped) {
    return item
  }

  contexts.forEach(({ contextName, value }) => {
    const Provider = contextsByName[contextName].Provider
    item = <Provider value={value}>{item}</Provider>;
  });

  return item;
}

export function Island({ componentName, contextNames, ...props }) {
  const id = useId();
  const { state, setValue } = useIslandStateContext();
  const elId = makeElId(id);
  const contextsWithValue = contextNames.map((contextName) => {
    const value = useContext(contextsByName[contextName]);
    return { contextName, value };
  });
  setValue({ id, componentName, props, contexts: contextsWithValue });

  return (
    <div
      style={{ border: "1px solid green", display: "inline-block" }}
      id={elId}
    >
      <IslandInner
        props={props}
        id={id}
        elId={elId}
        componentName={componentName}
        contexts={contextsWithValue}
        isWrapped={true}
      />
    </div>
  );
}
