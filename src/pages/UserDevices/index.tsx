import { Tabs, TabsProps, Button, Modal, InputNumber } from "antd";
import { PlusOutlined } from "@ant-design/icons"

import ConsumptionCard from '../../components/ConsumptionCard';
import { Device, useDeviceStore } from "../../store/devices";
import { useRoomCounter } from "../../hooks/useRoomCounter";
import DeviceList from "../../components/DeviceList";
import AnimatedWrapper from "../../animations/AnimatedWrapper";
import { useState } from "react";
import { useUserStore } from "../../store/user";
import ModalEditDevice from "../../components/ModalEditDevice";

function UserDevices() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isChangeBoxDisplayed, setIsChangeBoxDisplayed] = useState(false)
    const [isEditDeviceOpen, setEditDeviceOpen] = useState(false)
    const [modalInputValue, setModalInputValue] = useState<null | number>(0)
    const [changeBoxInputValue, setChangeBoxInputValue] = useState<null | number>(0)
    const [deviceToEdit, setDeviceToEdit] = useState<Device>()
    const { devices } = useDeviceStore()
    const { extras, changeExtraValues } = useUserStore()
    const roomCount = useRoomCounter(devices)

    const handleEditDevice = (device: Device) => {
        setEditDeviceOpen(!isEditDeviceOpen)
        setDeviceToEdit(device)
    }

    const handleModalOk = () => {
        changeExtraValues(modalInputValue ?? 0)
        setIsModalOpen(false)
    }

    const handleChangeValueBox = () => {
        changeExtraValues(changeBoxInputValue ?? 0)
        setIsChangeBoxDisplayed(false)
    }

    const items: TabsProps["items"] = Object.keys(roomCount).map((room) => {
        return {
          key : room, 
          label : room, 
          children : <DeviceList devices={devices} room={room} handleEditDevice={handleEditDevice}/>
          }
      })

    return (
        <div className="overflow-hidden lg:mx-72">
            <AnimatedWrapper>
                <ConsumptionCard />
                <div className="flex justify-between mt-2">
                    <Button type="link" onClick={() => setIsModalOpen(true)} icon={<PlusOutlined />} className="flex items-center">Adicionar impostos ou extras</Button>
                    <Button type="default" onClick={() => setIsChangeBoxDisplayed(!isChangeBoxDisplayed)}>Editar valores</Button>
                </div>
                {isChangeBoxDisplayed &&
                    <div className="flex justify-end mt-4">
                        <div className="flex flex-col bg-grayPrimary p-5 rounded-lg tracking-tighter">
                            <h3>Alterar valor das taxas</h3>
                            <strong className="text-sm">Atual: {extras}</strong>
                            <div className="flex gap-1">
                                <InputNumber value={changeBoxInputValue} onChange={(val) => setChangeBoxInputValue(val)} prefix="R$"/>
                                <Button type="primary" onClick={handleChangeValueBox}>Salvar</Button>  
                            </div>
                        </div>
                    </div>}     
                <h2 className="text-xl font-bold px-4 mt-10">Seu consumo detalhado:</h2>
                <Tabs items={items} defaultActiveKey="1" size="small" className="px-4 mt-3"/>           
            </AnimatedWrapper>
            <Modal title={"Adicionar valores extras"} open={isModalOpen} onOk={handleModalOk} onCancel={() => setIsModalOpen(false)}>
                <p className="mb-2">Podem ser impostos cobrados separadamente ou valores separados do consumo, geralmente sendo cobrança de <strong>iluminação pública</strong></p>
                <p>Digite o valor total das taxas abaixo:</p>
                <InputNumber value={modalInputValue} onChange={(val) => setModalInputValue(val)} prefix="R$"/>
            </Modal>
            <ModalEditDevice isOpen={isEditDeviceOpen} device={deviceToEdit} setEditDeviceOpen={setEditDeviceOpen}/>
        </div>
    )
}

export default UserDevices;