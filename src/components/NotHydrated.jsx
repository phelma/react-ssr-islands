import React, { useContext, useState } from "react";
import moment from "moment";
import { demoContext } from "../DemoContext";

export default function NotHydrated(props) {
  const [state, setState] = useState(0);
  const demoContextValue = useContext(demoContext)

  const now = moment().format("MMMM Do YYYY, h:mm:ss a");
  return (
    <div style={{ border: "1px solid red", padding: "2rem" }}>
      <p>Rendered on {now} with moment 🧁</p>
      <p>name from context: {demoContextValue.name}</p>
      <button onClick={() => setState(state + 1)}>
        This is not hyrdated {state}
      </button>
    </div>
  );
}
