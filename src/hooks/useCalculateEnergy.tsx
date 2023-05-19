import { Device } from "../store/devices"

export function useCalculateEnergy(values: Device) {
    const energySpentOneDay = values.power * (values.daily_use / 24)
    let energySpentMonthlyInKWH = (energySpentOneDay * values.month_use) / 1000
    if(values.amount) {
        energySpentMonthlyInKWH = energySpentMonthlyInKWH * values.amount
    }
    return energySpentMonthlyInKWH.toFixed(2)
}

export function useCalculateRoomEnergy(devices: Device[]) {
    return devices.reduce((acum, current) => {
        let result = useCalculateEnergy(current);
        return acum = acum + Number(result)
    }, 0)

}