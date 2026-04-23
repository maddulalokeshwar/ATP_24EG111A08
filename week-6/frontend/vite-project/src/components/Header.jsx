import { NavLink } from "react-router-dom"
import { useContext } from "react";
import { CounterContext } from "../context/CounterContext";

function Header() {
  const { newCounter } = useContext(CounterContext);
  return (
    <div>
        <nav className="flex gap-10 p-5 bg-gray-300 justify-end">
            <NavLink to="" className={({isActive}) => (isActive? "text-blue-500 bg-amber-200" : "")}>
                Home
            </NavLink>
            <NavLink to="create-emp" className={({isActive}) => (isActive? "text-blue-500 bg-amber-200" : "")}>
                CreateEmp
            </NavLink>
            <NavLink to="list" className={({isActive}) => (isActive? "text-blue-500 bg-amber-200" : "")}>
                Employees
            </NavLink>

        </nav>
        <div className="text-center p-5">
            <h2>Counter: {newCounter}</h2>
        </div>
    </div>
  )
}

export default Header