// File: week-6/frontend/vite-project/src/components/Home.jsx | Description: Home
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

//   return (
//     <div>
//       <h1>Home</h1>
//       {/* <p>Counter: {newCounter}</p>
//       <button onClick={incrementCounter}>Increment</button>
//       <button onClick={decrementCounter}>Decrement</button>
//       <button onClick={resetCounter}>Reset</button> */}
      
//     </div>
//   )
// }

export default Home