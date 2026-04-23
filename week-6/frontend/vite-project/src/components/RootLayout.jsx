import Header from "./Header"
import {Outlet} from "react-router-dom"

function RootLayout() {
  return (
    <div>
      <Header />
      <div className="min-h-screen mx-20 p-20 bg-gray-200">
        <Outlet />
      </div>
    </div>
  )
}

export default RootLayout