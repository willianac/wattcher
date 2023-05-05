import { create } from "zustand"

type StoreProps = {
    kWhValue : number | null,
    changeKwhValue : (value: number) => void
}

export const useUserStore = create<StoreProps>((set) => ({
    kWhValue : 0,
    changeKwhValue : (value) => set({kWhValue : value})
}))