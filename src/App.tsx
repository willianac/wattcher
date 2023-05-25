import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar";

function App() {  
  return (
    <>
      <Navbar />
      <div className="pages grid pt-14">
        <Outlet />
      </div>
    </>
  )
}

export default App