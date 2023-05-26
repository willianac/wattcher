import { create } from "zustand";

export enum RoomEnum {
    "Sala",
    "Banheiro",
    "Cozinha",
    "Quarto",
    "Escritório",
    "Quintal",
    "Terraço/Varanda",
    "Garagem",
    "Outros",
}

export type Device = {
    id?: string
    power: number
    daily_use: number
    month_use: number
    name: string
    room: RoomEnum
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