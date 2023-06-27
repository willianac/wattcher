import axios from "axios";
import jwtDecode from "jwt-decode";
import { AxiosError } from "axios"
import { UserData, useUserStore } from "../store/user";
import { useHandleToken } from "./useHandleToken";

// eslint-disable-next-line react-refresh/only-export-components
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
  const { setToken } = useHandleToken()

  async function login({ email, password }: LoginParams) {
    try {
      const userToken = await axios.post(URL + "/getuser", {email, password}) 
      const userdata = jwtDecode(userToken.data) as UserData
      saveUser(userdata)
      setUserLogged(true)
      setToken(userToken.data)
    } catch (error) {
      console.log(error)
      if(error instanceof AxiosError) {
        if(error.code === AxiosError.ERR_NETWORK) return "network_error"
        if(error.response?.status == 401) return "wrong_credentials"
      }
      return "unexpected error"
    }
  }

  async function register({ name, email, password }: RegisterParams) {
    try {
      const userToken = await axios.post(URL + "/createuser", {name, email, password})
      const userdata = jwtDecode(userToken.data) as UserData
      saveUser(userdata)
      setUserLogged(true)
      setToken(userToken.data)
    } catch (error) {
      if(error instanceof AxiosError) {
        if(error.code == AxiosError.ERR_NETWORK) return "network_error"
        if(error.response?.data.message == "user already exists") return "already_exists"
      }
      return "unexpected error"
    }
  }

  return {
    login,
    register
  }
}