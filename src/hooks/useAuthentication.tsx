import axios from "axios";
import { AxiosError } from "axios"
import { UserData, useUserStore } from "../store/user";

const URL = import.meta.env.VITE_API_URL

type LoginParams = {
  email: string
  password: string
}

export function useAuthentication() {
  const { saveUser, setUserLogged } = useUserStore()

  async function login({ email, password }: LoginParams) {
    try {
      const user = await axios.post(URL + "/getuser", {email, password})
      const userdata = user.data as UserData
      saveUser({id : userdata.id, name : userdata.name})
      setUserLogged(true)
    } catch (error) {
      if(error instanceof AxiosError) {
        if(error.code === "ERR_NETWORK") return "network_error"
        if(error.response?.statusText === "Unauthorized") return "wrong_credentials"
      }
    }
  }

  function register() {
    return "the register"
  }

  return {
    login,
    register
  }
}