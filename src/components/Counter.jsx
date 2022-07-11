import React, { useContext } from "react";
import { demoContext } from "../DemoContext";

export default function Counter({ start = 0 }) {
  const [count, setCount] = React.useState(start);

  const demoContextValue = useContext(demoContext);

  return (
    <div
      style={{
        border: "1px solid black",
        display: "inline-block",
        padding: "2rem",
      }}
    >
      <p>Started on {start}</p>
      <p>name from context: {demoContextValue.name}</p>
      <button onClick={() => setCount(count + 1)}>Click me {count}</button>
    </div>
  );
}
