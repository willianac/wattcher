import { Device } from "../store/devices"

export function useCalculateEnergy(values: Device) {
    
    const energySpentOneDay = values.power * (values.daily_use / 24)
    const energySpentMonthlyInKWH = (energySpentOneDay * values.month_use) / 1000

    return energySpentMonthlyInKWH.toFixed(2)
}