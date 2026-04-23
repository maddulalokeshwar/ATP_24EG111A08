import { useContext } from "react";
import { CounterContext } from "../context/CounterContext";

function Home() {
  const { newCounter, incrementCounter, decrementCounter, resetCounter } = useContext(CounterContext);

  return (
    <div className="text-center">
      <h1>Counter: {newCounter}</h1>

      <button onClick={incrementCounter}>+</button>
      <button onClick={decrementCounter}>-</button>
      <button onClick={resetCounter}>Reset</button>
    </div>
  );
}



export default Home