import axios from "axios"
import { Device, useDeviceStore } from "../store/devices"
import { useUserStore } from "../store/user"
import { useEffect } from "react"

const URL = import.meta.env.VITE_API_URL

export function useGetDevices() {
  const { devices, actions : { addDevices } } = useDeviceStore()
  const { user } = useUserStore()

  useEffect(() => {
    if(!devices.length) {
      async function fetch() {
        const response = await axios.post(URL + "/getdevices", {userid: user.id})
        const devices = await response.data as Device[]
        addDevices(devices)
        console.log("devices fetched.")
      }
      fetch()
    }
  }, [])
}