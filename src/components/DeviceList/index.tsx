import { Device } from "../../store/devices";
import { Descriptions, Button } from "antd";
import { AnimatedList } from "../../animations/AnimatedList";
import { useCalculateRoomEnergy } from "../../hooks/useCalculateEnergy";

type DeviceListProps = {
  devices : Device[]
  room : string
  handleEditDevice : (device: Device) => void
}

function DeviceList({ devices, room, handleEditDevice }: DeviceListProps) {
  const listOfRoomDevices = devices.filter(device => device.room === room)

  const calculateEnergy = useCalculateRoomEnergy

  const roomConsumption = listOfRoomDevices ? calculateEnergy(listOfRoomDevices) : 0

  const getDeviceValue = (device: Device) => {
    handleEditDevice(device)
  }

  return (
    <>
      <h3 className="text-base mb-1">Consumo total: {roomConsumption.toFixed(2)} kWh.</h3>
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
            <Descriptions.Item label="Uso mensal">{device.month_use + " dias"}</Descriptions.Item>
            {device.amount && 
              <Descriptions.Item label="Quantidade">{device.amount}</Descriptions.Item>}
          </Descriptions>
        ))}
      </AnimatedList>
    </>
  )
}

export default DeviceList;