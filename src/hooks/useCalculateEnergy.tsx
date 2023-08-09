import { Device } from "../store/devices"

export function useCalculateEnergy(values: Device) {
    const energyConsumption = (values.power / 1000) * values.daily_use
    let energySpentMonthlyInKWH = energyConsumption * values.month_use
    if(values.amount) {
        energySpentMonthlyInKWH = energySpentMonthlyInKWH * values.amount
    }
    return energySpentMonthlyInKWH.toFixed(2)
}

export function useCalculateRoomEnergy(devices: Device[]) {
    const calculateEnergy = useCalculateEnergy

    return devices.reduce((acum, current) => {
        const result = calculateEnergy(current);
        return acum = acum + Number(result)
    }, 0)

}