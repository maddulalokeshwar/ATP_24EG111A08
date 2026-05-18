// File: week-6/frontend/vite-project/src/components/RootLayout.jsx | Description: Root Layout
import Header from "./Header"
import {Outlet} from "react-router"

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