import { Tabs, TabsProps } from "antd" 

import ConsumptionCard from '../../components/ConsumptionCard';
import { useCalculateEnergy } from '../../hooks/useCalculateEnergy';
import { useDeviceStore } from "../../store/devices";
import { useRoomCounter } from "../../hooks/useRoomCounter";
import DeviceList from "../../components/DeviceList";

function UserDevices() {
    const { devices } = useDeviceStore()
    const roomCount = useRoomCounter(devices)

    const consumoTotal = devices.reduce((acum, current) => {
        let result = useCalculateEnergy(current)
        return acum = acum + Number(result)
        
    }, 0)
    
    const handleChange = (key: string) => {
        console.log(key)
    }

    const items: TabsProps["items"] = Object.keys(roomCount).map((room) => {
      return {
        key : room, 
        label : room, 
        children : <DeviceList devices={devices} room={room} />
        }
    })

    return (
        <div className="overflow-hidden">
            <ConsumptionCard consumption={consumoTotal} />
            <Tabs items={items} defaultActiveKey="1" onChange={handleChange} size="small" className="px-4"/>           
        </div>
    )
}

export default UserDevices;