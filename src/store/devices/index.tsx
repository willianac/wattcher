import { create } from "zustand";

export type Device = {
    id? : number
    power: number
    daily_use: number
    month_use: number
    name: string
    room: string
}

type ActionProps = {
    addDevice : (device: Device) => void
    removeDevice : (device: Device) => void
}

type StoreProps = {
    devices: Device[]
    actions: ActionProps
}

export const useDeviceStore = create<StoreProps>((set) => ({
    devices : [],
    actions : {
        addDevice : (newDevice: Device) => set((state) => ({devices : [...state.devices, newDevice]})),
        removeDevice : (deviceToRemove: Device) => set((state) => ({
            devices : state.devices.filter((device) => device.name !== deviceToRemove.name)
        }))
    }
}))