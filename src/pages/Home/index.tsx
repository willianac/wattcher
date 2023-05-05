import { Empty, InputNumber, message, Modal } from "antd";
import { useEffect, useState } from "react";

import AnimatedWrapper from "../../animations/AnimatedWrapper";
import DeviceIcon from "../../components/DeviceIcon";
import DeviceForm from "../../components/DeviceForm";
import { Device, useDeviceStore } from "../../store/devices";
import { useRoomCounter } from "../../hooks/useRoomCounter";
import { useUserStore } from "../../store/user";

function Home() {
    const { devices, actions : { addDevice } } = useDeviceStore()
    const { kWhValue, changeKwhValue } = useUserStore()
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

    const saveDevice = (device: Device) => {
        addDevice(device)
    }
    
    const throwToastError = () => {
        messageAPI.open({
            type : "error",
            content : "Por favor preencha todos os campos"
        })
    }

    return (
        <div className="mt-12 px-4">
            {contextHolder}
            <Modal title="Quanto custa o kWh na sua cidade?" open={isModalOpen} onOk={handleModal} onCancel={handleModalCancel}>
                <p>Antes de adicionar os aparelhos, primeiro precisamos saber quanto custa o valor do kWh na sua cidade</p>
                <InputNumber className="mt-1" value={modalInputValue} onChange={(val) => setModalInputValue(val)} required={true}/>
            </Modal>
            <AnimatedWrapper>
                {devices.length ? 
                    <div className="grid grid-cols-3 gap-y-3 place-items-center">
                        {Object.keys(roomCounts).map((room, index) => (
                            <DeviceIcon icon_name={room} quantity={roomCounts[room]} key={index}/>
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