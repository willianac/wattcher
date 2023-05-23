import axios from "axios";
import { AxiosError } from "axios"
import { UserData, useUserStore } from "../store/user";

const URL = import.meta.env.VITE_API_URL

type LoginParams = {
  email: string
  password: string
}

type RegisterParams = {
  email: string
  name: string
  password: string
}

export function useAuthentication() {
  const { saveUser, setUserLogged } = useUserStore()

  async function login({ email, password }: LoginParams) {
    try {
      const user = await axios.post(URL + "/getuser", {email, password})
      const userdata = user.data as UserData
      saveUser(userdata)
      setUserLogged(true)
    } catch (error) {
      if(error instanceof AxiosError) {
        if(error.code === "ERR_NETWORK") return "network_error"
        if(error.response?.statusText === "Unauthorized") return "wrong_credentials"
      }
    }
  }

  async function register({ name, email, password }: RegisterParams) {
    try {
      const user = await axios.post(URL + "/createuser", {name, email, password})
      const userdata = user.data as UserData
      saveUser(userdata)
      setUserLogged(true)
    } catch (error) {
      if(error instanceof AxiosError) {
        if(error.code == "ERR_NETWORK") return "network_error"
        if(error.response?.data.message == "user already exists") return "already_exists"
      }
    }
  }

  return {
    login,
    register
  }
}