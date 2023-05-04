import { Outlet } from "react-router-dom"
import "./App.css"
import Navbar from "./components/Navbar";

function App() {  

  return (
    <>
      <Navbar />
      <div className="pt-14">
        <Outlet />
      </div>
    </>
  )
}

export default App