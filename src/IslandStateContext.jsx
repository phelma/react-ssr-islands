import React, { useContext } from "react";

export const IslandStateContext = React.createContext({
  setValue: ({id}) => {
    console.log("shouldnt be here", id);
  },
  state: {},
});

export const useIslandStateContext = () => React.useContext(IslandStateContext);

export const IslandStateContextProvider = ({ islandState, children }) => {
  const setValue = ({ id, componentName, props, contexts }) =>
    (islandState[id] = { componentName, props, contexts });
  return (
    <IslandStateContext.Provider value={{ state: islandState, setValue }}>
      {children}
      <pre>{JSON.stringify(islandState, null, 2)}</pre>
    </IslandStateContext.Provider>
  );
};

// export const ServerIslandStateContext = React.createContext({
//   set: () => {},
//   state: {},
// });
//
// export const ServerIslandStateContextProvider = ({ value, children }) => {
//   return (
//     <ServerIslandStateContext.Provider value={{ state, set }}>
//       {children}
//       <pre>{JSON.stringify(state, null, 2)}</pre>
//     </ServerIslandStateContext.Provider>
//   );
// };
