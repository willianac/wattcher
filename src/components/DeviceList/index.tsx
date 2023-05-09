import { Device } from "../../store/devices";
import { Descriptions, Button } from 'antd';
import { AnimatedList } from "../../animations/AnimatedList";

type DeviceListProps = {
    devices : Device[],
    room : string
}

function DeviceList({ devices, room }: DeviceListProps) {
    const listOfRoomDevices = devices.filter(device => device.room === room)

    const getValue = (e: Device) => {
        console.log(e)
    }

    return (
        <AnimatedList>
            {listOfRoomDevices.map((device, index) => (
                <Descriptions 
                    title={device.name} 
                    key={index} 
                    className="capitalize mb-12 bg-grayPrimary rounded-lg p-3" 
                    size="small" 
                    extra={<Button onClick={() => getValue(device)} type="primary">Editar</Button>}
                >
                    <Descriptions.Item label="Potência">{device.power + "W"}</Descriptions.Item>
                    <Descriptions.Item label="Uso diário">{device.daily_use + "h"}</Descriptions.Item>
                    <Descriptions.Item label="Uso mensalmente">{device.month_use + " dias"}</Descriptions.Item>
                </Descriptions>
            ))}
        </AnimatedList>
    )
}

export default DeviceList;