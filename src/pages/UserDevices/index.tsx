import { Tabs, TabsProps, Button, Modal, InputNumber } from "antd";
import { PlusOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react";
import axios from "axios";

import ConsumptionCard from '../../components/ConsumptionCard';
import { Device, useDeviceStore } from "../../store/devices";
import { useRoomCounter } from "../../hooks/useRoomCounter";
import DeviceList from "../../components/DeviceList";
import AnimatedWrapper from "../../animations/AnimatedWrapper";
import { UserData, useUserStore } from "../../store/user";
import ModalEditDevice from "../../components/ModalEditDevice";
import ChangeValuesBox from "../../components/ChangeValuesBox";

const URL = import.meta.env.VITE_API_URL

function UserDevices() {
    const { devices, actions : { addDevices } } = useDeviceStore()
    const { user, saveUser, isUserLogged } = useUserStore()

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isChangeBoxDisplayed, setIsChangeBoxDisplayed] = useState(false)
    const [isEditDeviceOpen, setEditDeviceOpen] = useState(false)
    const [modalInputValue, setModalInputValue] = useState<null | number>(0)
    const [deviceToEdit, setDeviceToEdit] = useState<Device>()
    const roomCount = useRoomCounter(devices)

    const handleEditDevice = (device: Device) => {
        setEditDeviceOpen(!isEditDeviceOpen)
        setDeviceToEdit(device)
    }

    const changeValues = async (value: number, endpoint: string) => {
        if(value == 0) return

        const response = await axios.post(URL + "/" + endpoint, {user_id : user.id, value : value})
        const userUpdated = response.data as UserData
        saveUser(userUpdated)
    }
    
    const handleModalOk = async () => {
        await changeValues(modalInputValue ?? 0, "changetaxes")
        setIsModalOpen(false)
    }

    const items: TabsProps["items"] = Object.keys(roomCount).map((room) => {
        return {
          key : room, 
          label : room, 
          children : <DeviceList devices={devices} room={room} handleEditDevice={handleEditDevice}/>
          }
      })

      useEffect(() => {
          async function fetch() {
            const response = await axios.post(URL + "/getdevices", {userid: user.id})
            const devices = await response.data as Device[]
            addDevices(devices)
          }
          if(isUserLogged) fetch()
      }, [isEditDeviceOpen])

    return (
        <div className="overflow-hidden lg:mx-72">
            <AnimatedWrapper>
                <ConsumptionCard />
                <div className="flex flex-wrap justify-between mt-2">
                    <Button type="link" onClick={() => setIsModalOpen(true)} icon={<PlusOutlined />} className="flex items-center">Adicionar impostos ou extras</Button>
                    <Button type="default" onClick={() => setIsChangeBoxDisplayed(!isChangeBoxDisplayed)} className="mr-4 lg:mr-0">Editar valores</Button>
                </div>
                {isChangeBoxDisplayed && 
                    <div className="flex flex-col p-4 mt-2 gap-2 md:ml-auto md:w-1/2 xl:w-4/12">
                        <h2 className="font-semibold md:text-xl md:text-center">Altere suas taxas/impostos ou seu kWh</h2>
                        <ChangeValuesBox changeValues={changeValues} setBoxVisibility={setIsChangeBoxDisplayed}/>
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