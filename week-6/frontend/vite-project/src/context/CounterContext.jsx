import { createContext } from "react";
import { useCounterStore } from "../store/CounterStore.js";

// create context
export const CounterContext = createContext();

export const CounterProvider = ({ children }) => {
  const store = useCounterStore(); 
  // this contains all state + functions

  return (
    <CounterContext.Provider value={store}>
      {children}
    </CounterContext.Provider>
  );
};