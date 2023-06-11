import { Empty, InputNumber, message, notification, Modal } from "antd";
import { NoticeType } from "antd/es/message/interface";
import { useEffect, useState } from "react";
import axios from "axios";

import AnimatedWrapper from "../../animations/AnimatedWrapper";
import DeviceIcon from "../../components/DeviceIcon";
import DeviceForm from "../../components/DeviceForm";
import { Device, useDeviceStore } from "../../store/devices";
import { useRoomCounter } from "../../hooks/useRoomCounter";
import { UserData, useUserStore } from "../../store/user";

const URL = import.meta.env.VITE_API_URL;

function Home() {
    const { devices } = useDeviceStore()
    const { user, saveUser, isUserLogged } = useUserStore()

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalInputValue, setModalInputValue] = useState<number | null>(0);
    const [messageAPI, messageContext] = message.useMessage()
    const [notificationAPI, notificationContext] = notification.useNotification()

    const roomCounts = useRoomCounter(devices)

    const handleModal = async () => {
        if(!modalInputValue) {
            return
        }
        const response = await axios.post(URL + "/changekwh", {user_id : user.id, value: modalInputValue})
        const updatedUser = response.data as UserData
        saveUser(updatedUser)
        setIsModalOpen(false)
    }

    const handleModalCancel = () => {
        setIsModalOpen(false)
    }

    useEffect(() => {
        if(isUserLogged && !user.local_kwh) {
            notificationAPI.destroy()
            return setIsModalOpen(true)
        }
        if(!isUserLogged) {
            return notificationAPI.warning({
                message : "Você não está logado",
                description : "É necessário se logar para poder salvar os aparelhos cadastrados abaixo."
            })
        }
        notificationAPI.destroy()
    }, [isUserLogged, notificationAPI, user.local_kwh])

    const saveDevice = async (device: Device) => {
        device.user_id = user.id
        await axios.post(URL + "/createdevice", device)
        throwToast("success", "Adicionado com sucesso!")
    }
    
    const throwToast = (type: NoticeType, message: string) => {
        messageAPI.open({
            type,
            content : message
        })
    }

    return (
        <div className="mt-12 px-4 lg:mx-72">
            <Modal title="Quanto custa o kWh na sua cidade?" open={isModalOpen} onOk={handleModal} onCancel={handleModalCancel}>
                <p>Antes de adicionar os aparelhos, primeiro precisamos saber quanto custa o valor do kWh na sua cidade</p>
                <InputNumber min={0} value={modalInputValue} onChange={(val) => setModalInputValue(val)} required={true} className="mt-1"/>
            </Modal>
            <AnimatedWrapper>
                {devices.length ? 
                    <div className="grid grid-cols-3 gap-y-3 place-items-center lg:grid-cols-6">
                        {Object.keys(roomCounts).map((room, index) => (
                            <DeviceIcon room_name={room} quantity={roomCounts[room]} key={index}/>
                        ))}
                    </div> :
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<span>Você ainda não tem nenhum equipamento</span>}/>
                }
                {!devices.length ?
                    <div>
                        <h1 className="text-3xl font-bold tracking-tighter mt-6">Vamos começar</h1>
                        <p className="text-sm w-3/4 mt-1 text-slate-500">Qual equipamento você quer inserir primeiro?</p>
                    </div> :
                    <h1 className="text-3xl font-bold tracking-tighter mt-6">Adicionar aparelho</h1>
                }
                <DeviceForm saveDevice={saveDevice} throwToast={throwToast}/>
            </AnimatedWrapper>
            {messageContext}
            {notificationContext}     
        </div>
    )
}

export default Home;