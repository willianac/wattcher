import { Outlet } from "react-router-dom"
import { useEffect } from "react";
import axios from "axios";

import { useHandleToken } from "./hooks/useHandleToken";
import Navbar from "./components/Navbar";
import { UserData, useUserStore } from "./store/user";

const URL = import.meta.env.VITE_API_URL

function App() {  
  const { hasToken, getToken, deleteToken } = useHandleToken()
  const { saveUser, setUserLogged } = useUserStore()

  async function verifyToken() {
    try {
      const bearerToken = getToken()
      const response = await axios.get(URL + "/verifytoken", {headers : {Authorization : `Bearer ${bearerToken}`}})
      saveUser(response.data as UserData)
      setUserLogged(true)
    } catch (error) {
      deleteToken()
    }
  }

  useEffect(() => {
    if(hasToken()) {
      verifyToken()
    }
  }, [])

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