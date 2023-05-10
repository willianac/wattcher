import { Tabs, TabsProps, Button } from "antd" 

import ConsumptionCard from '../../components/ConsumptionCard';
import { useCalculateEnergy } from '../../hooks/useCalculateEnergy';
import { useDeviceStore } from "../../store/devices";
import { useRoomCounter } from "../../hooks/useRoomCounter";
import DeviceList from "../../components/DeviceList";
import AnimatedWrapper from "../../animations/AnimatedWrapper";

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
        <div className="overflow-hidden lg:mx-72">
            <AnimatedWrapper>
                <ConsumptionCard consumption={consumoTotal} />
                <div className="flex justify-between mt-2">
                    <Button type="link">Adicionar impostos ou extras</Button>
                    <Button type="default">Editar valores</Button>
                </div>
                <h2 className="text-xl font-bold px-4 mt-10">Seu consumo detalhado:</h2>
                <Tabs items={items} defaultActiveKey="1" onChange={handleChange} size="small" className="px-4 mt-3"/>           
            </AnimatedWrapper>
        </div>
    )
}

export default UserDevices;