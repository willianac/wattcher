import { create } from "zustand"

type StoreProps = {
    kWhValue : number | null,
    extras : number
    changeKwhValue : (value: number) => void
    changeExtraValues : (value: number) => void
}

export const useUserStore = create<StoreProps>((set) => ({
    kWhValue : 0,
    extras : 0,
    changeKwhValue : (value) => set({kWhValue : value}),
    changeExtraValues : (value) => set({extras : value})
}))