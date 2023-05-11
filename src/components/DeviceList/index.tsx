import { Device } from "../../store/devices";
import { Descriptions, Button } from 'antd';
import { AnimatedList } from "../../animations/AnimatedList";

type DeviceListProps = {
    devices : Device[]
    room : string
    handleEditDevice : (device: Device) => void
}

function DeviceList({ devices, room, handleEditDevice }: DeviceListProps) {
    const listOfRoomDevices = devices.filter(device => device.room === room)

    const getDeviceValue = (device: Device) => {
        handleEditDevice(device)
    }

    return (
        <>
            <h3>{room} gasta 2kWh</h3>
            <AnimatedList>
                {listOfRoomDevices.map((device, index) => (
                    <Descriptions 
                        title={device.name} 
                        key={index} 
                        className="capitalize mb-6 bg-grayPrimary rounded-lg p-3" 
                        size="small" 
                        extra={<Button onClick={() => getDeviceValue(device)} type="primary">Editar</Button>}
                    >
                        <Descriptions.Item label="Potência">{device.power + "W"}</Descriptions.Item>
                        <Descriptions.Item label="Uso diário">{device.daily_use + "h"}</Descriptions.Item>
                        <Descriptions.Item label="Uso mensalmente">{device.month_use + " dias"}</Descriptions.Item>
                        {device.amount && 
                            <Descriptions.Item label="Quantidade">{device.amount}</Descriptions.Item>}
                    </Descriptions>
                ))}
            </AnimatedList>
        </>
    )
}

export default DeviceList;