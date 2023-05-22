import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar";

function App() {  
  console.log("app")

  if (import.meta.env.DEV && window.performance && performance.getEntriesByName("App").length > 1) {
    return null; // Skip rendering during the second render
  }
  
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