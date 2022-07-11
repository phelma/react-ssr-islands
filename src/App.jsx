import React, { Suspense } from "react";

const LazyCounter =  React.lazy(() => import("./components/Counter.jsx" /* webpackPrefetch: true */));

export default function App(props) {
  const { username, title, description } = props;

  return (
    <>
      <h1>{title}</h1>
      <Suspense fallback={<div>Loading</div>}>
        <LazyCounter />
      </Suspense>
    </>
  );
}
