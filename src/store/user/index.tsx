import { create } from "zustand"

export type UserData = {
    id: string
    name: string
    local_kwh: number
    taxes: number
}

type StoreProps = {
    user: UserData
    saveUser : (user: UserData) => void
    logout : () => void
    isUserLogged : boolean
    setUserLogged : (val: boolean) => void
}

export const useUserStore = create<StoreProps>((set) => ({
    user : {
        id : "",
        name : "",
        local_kwh : 0,
        taxes : 0
    },
    isUserLogged : false,
    saveUser : (user) => set({user : {id : user.id, name : user.name, local_kwh : user.local_kwh, taxes : user.taxes}}),
    logout : () => set({user : {id : "", name : "", local_kwh : 0, taxes : 0}}),
    setUserLogged : (val) => set({isUserLogged : val})
}))