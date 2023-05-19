import { create } from "zustand"

export type UserData = {
    id: string
    name: string
}

type StoreProps = {
    user: UserData
    kWhValue : number | null,
    extras : number
    changeKwhValue : (value: number) => void
    changeExtraValues : (value: number) => void
    saveUser : (user: UserData) => void
    logout : () => void
    isUserLogged : boolean
    setUserLogged : (val: boolean) => void
}

export const useUserStore = create<StoreProps>((set) => ({
    user : {
        id : "",
        name : ""
    },
    isUserLogged : false,
    kWhValue : 0,
    extras : 0,
    saveUser : (user) => set({user : {id : user.id, name : user.name}}),
    logout : () => set({user : {id : "", name : ""}}),
    changeKwhValue : (value) => set({kWhValue : value}),
    changeExtraValues : (value) => set({extras : value}),
    setUserLogged : (val) => set({isUserLogged : val})
}))