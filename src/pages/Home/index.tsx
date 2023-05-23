import { Empty, InputNumber, message, Modal } from "antd";
import { useEffect, useState } from "react";

import AnimatedWrapper from "../../animations/AnimatedWrapper";
import DeviceIcon from "../../components/DeviceIcon";
import DeviceForm from "../../components/DeviceForm";
import { Device, useDeviceStore } from "../../store/devices";
import { useRoomCounter } from "../../hooks/useRoomCounter";
import { useUserStore } from "../../store/user";
import axios from "axios";

const URL = import.meta.env.VITE_API_URL;

function Home() {
    const { devices } = useDeviceStore()
    const { kWhValue, changeKwhValue, user } = useUserStore()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalInputValue, setModalInputValue] = useState<number | null>(0);
    const [messageAPI, contextHolder] = message.useMessage()
    const roomCounts = useRoomCounter(devices)

    const handleModal = () => {
        if(!modalInputValue) {
            return
        }
        changeKwhValue(modalInputValue)
        setIsModalOpen(false)
    }
    
    const handleModalCancel = () => {
        setIsModalOpen(false)
    }

    useEffect(() => {
        if(!kWhValue) {
            setIsModalOpen(true)
        }
    }, [])

    const saveDevice = async (device: Device) => {
        device.user_id = user.id
        await axios.post(URL + "/createdevice", device)
    }
    
    const throwToastError = () => {
        messageAPI.open({
            type : "error",
            content : "Por favor preencha todos os campos"
        })
    }

    return (
        <div className="mt-12 px-4 lg:mx-72">
            {contextHolder}
            <Modal title="Quanto custa o kWh na sua cidade?" open={isModalOpen} onOk={handleModal} onCancel={handleModalCancel}>
                <p>Antes de adicionar os aparelhos, primeiro precisamos saber quanto custa o valor do kWh na sua cidade</p>
                <InputNumber className="mt-1" value={modalInputValue} onChange={(val) => setModalInputValue(val)} required={true}/>
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
                <DeviceForm saveDevice={saveDevice} throwToastError={throwToastError}/>
            </AnimatedWrapper>     
        </div>
    )
}

export default Home;