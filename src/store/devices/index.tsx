import { create } from "zustand";

export type Device = {
    id?: string
    power: number
    daily_use: number
    month_use: number
    name: string
    room: string
    amount?: number
    user_id : string
}

type ActionProps = {
    addDevices : (devices: Device[]) => void,
    clearDeviceStore : () => void
}

type StoreProps = {
    devices: Device[]
    actions: ActionProps
}

export const useDeviceStore = create<StoreProps>((set) => ({
    devices : [],
    actions : {
        addDevices : (devices) => set(({devices : devices})),
        clearDeviceStore : () => set(() => ({devices : []}))
    }
}))