import { Modal, Button, Select, Input, InputNumber } from "antd"
import { Device, RoomEnum, useDeviceStore } from "../../store/devices"
import { DeleteOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"
import axios from "axios"

const URL = import.meta.env.VITE_API_URL

type ModalProps = {
    isOpen : boolean
    device : Device | undefined
    setEditDeviceOpen : React.Dispatch<React.SetStateAction<boolean>>
}

const roomDict = Object.values(RoomEnum).map(item => ({
    value: item, label: item,
}))

function ModalEditDevice({ isOpen, device, setEditDeviceOpen }: ModalProps) {
    const { actions : { clearDeviceStore } } = useDeviceStore()
    const [selectedProp, setSelectedProp] = useState("")
    const [selectedValue, setSelectedValue] = useState<RoomEnum | string>()

    const [isModalOkLoading, setIsModalOkLoading] = useState(false)
    const [isDeleteRunning, setIsDeleteRunning] = useState(false)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const currentPropValue: string | number = device ? device[selectedProp] : "";
   
    const handleOk = async () => {
        if(!selectedProp.trim() || !selectedValue) {
            return
        }
        setIsModalOkLoading(true)
        await axios.put(URL + "/modifydevice", {
            id : device?.id, 
            prop : selectedProp, 
            value : selectedValue
        })
        setIsModalOkLoading(false)
        setEditDeviceOpen(false)
    }
    const handleCancel = () => {
        setSelectedProp("")
        setEditDeviceOpen(false)
    }

    const deleteDevice = async () => {
        setIsDeleteRunning(true)

        device && await axios.delete(URL + "/deletedevice", {data : device.id})

        setIsDeleteRunning(false)
        clearDeviceStore()
        setEditDeviceOpen(false)
    }

    // aqui podemos possivelmente o escolher o que retornar do repository de devices, ao invés desse filtro abaixo

    const optionKeys = Object.keys(device ?? "").filter(prop => (
        prop !== "id" && 
        prop !== "createdAt" && 
        prop !== "updatedAt" && 
        prop !== "user_id"
    ))
    
    const translatedOptions = optionKeys.map((option) => {
        if(option === "name") return {value : option, label : "Nome"} 
        if(option === "power") return {value : option, label : "Potência"} 
        if(option === "room") return {value : option, label : "Cômodo"} 
        if(option === "daily_use") return {value : option, label : "Uso diário (horas)"} 
        if(option === "month_use") return {value : option, label : "Uso mensal (dias)"} 
        if(option === "amount") return {value: option, label : "Quantidade"}
    })

    useEffect(() => {
        setSelectedValue(undefined)
    }, [selectedProp]) 

    function displayInput() {
        if(!selectedProp) return
        if(selectedProp === "room") {
            return (
                <Select 
                    options={roomDict}
                    className="w-36"
                    onChange={(room) => setSelectedValue(room as unknown as RoomEnum)}
                    value={selectedValue}
                />
            )
        }
        if(selectedProp === "name") {
            return (
                <Input 
                    type="text" 
                    placeholder="Digite o novo nome" 
                    className="w-36" 
                    onChange={(val) => setSelectedValue(val.target.value as unknown as string)} 
                    value={selectedValue}
                />
            )
        }
        return (
            <InputNumber 
                min="0"
                max={selectedProp === "daily_use" ? "24" : (selectedProp === "month_use" ? "31" : undefined) }
                placeholder="Digite o novo valor"
                className="w-36" 
                onChange={(val) => setSelectedValue(val as string)} 
                value={selectedValue}
            />
        )
    }
  
    return (
        <Modal title="Alterar valor" open={isOpen} onOk={handleOk} onCancel={handleCancel} confirmLoading={isModalOkLoading}>
            <div className="flex justify-between items-end">
                <div className="flex flex-col">
                    <p>Selecione o que deseja alterar:</p>
                    <Select 
                        value={selectedProp} 
                        onChange={(val) => setSelectedProp(val)}
                        options={
                            translatedOptions.map((option) => ({value : option?.value, label: option?.label}))
                        }
                        className="w-36"
                    />
                    {currentPropValue && 
                        <p>Valor atual: <strong>{currentPropValue}</strong> </p>}
                    {displayInput()}
                </div>
                <Button 
                    onClick={deleteDevice} 
                    className="bg-red-500 text-white flex items-center" 
                    icon={<DeleteOutlined />}
                    loading={isDeleteRunning}
                    >Exluir aparelho
                </Button>
            </div>
        </Modal>
    )
}

export default ModalEditDevice;