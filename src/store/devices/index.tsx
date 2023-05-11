import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

export type Device = {
    id?: string
    power: number
    daily_use: number
    month_use: number
    name: string
    room: string
    amount?: number
    [key : string]: any
}

type ActionProps = {
    addDevice : (device: Device) => void
    removeDevice : (device: Device) => void,
    alterDevice : (device: Device, prop: string, value: string | number) => void
}

type StoreProps = {
    devices: Device[]
    actions: ActionProps
}

export const useDeviceStore = create<StoreProps>((set, get) => ({
    devices : [],
    actions : {
        addDevice : (newDevice) => {
            newDevice.id = uuidv4()
            set((state) => ({devices : [...state.devices, newDevice]}))
        },
        removeDevice : (deviceToRemove) => set((state) => ({
            devices : state.devices.filter((device) => device.id !== deviceToRemove.id)
        })),
        alterDevice : (device, prop, value) => {
            const deviceToAlter = get().devices.find(item => device === item)
            if(deviceToAlter) {
                deviceToAlter[prop] = value
                console.log(get().devices)
                // const newState = get().devices.filter((theDevices) => theDevices.id !== deviceToAlter.id) 
                // set((state) => ({devices : [...newState, deviceToAlter]}))
            }
            
        }
    }
}))