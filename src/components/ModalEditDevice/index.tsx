import { Modal, Button, Select, Input, InputNumber } from "antd"
import { Device, useDeviceStore } from "../../store/devices"
import { DeleteOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"
import axios from "axios"

const URL = import.meta.env.VITE_API_URL

type ModalProps = {
    isOpen : boolean
    device : Device | undefined
    setEditDeviceOpen : React.Dispatch<React.SetStateAction<boolean>>
}

const selectOptions = [
    {value : "Sala", label : "Sala"}, 
    {value: "Banheiro", label: "Banheiro"}, 
    {value: "Cozinha", label: "Cozinha"}, 
    {value: "Quarto", label: "Quarto"}, 
    {value: "Escritório", label: "Escritório"}, 
    {value: "Quintal", label: "Quintal"}, 
    {value: "Terraço/Varanda", label: "Terraço/Varanda"}, 
    {value : "Garagem", label : "Garagem"}, 
    {value: "Outros", label: "Outros"}
]

function ModalEditDevice({ isOpen, device, setEditDeviceOpen }: ModalProps) {
    const { actions : { clearDeviceStore } } = useDeviceStore()
    const [selectedProp, setSelectedProp] = useState("")
    const [selectedValue, setSelectedValue] = useState("")
    let currentPropValue: string | number = device ? device[selectedProp] : "";
   
    const handleOk = async () => {
        if(!selectedProp.trim() || !selectedValue) {
            return
        }
        await axios.put(URL + "/modifydevice", {
            id : device?.id, 
            prop : selectedProp, 
            value : selectedValue
        })
        setEditDeviceOpen(false)
    }
    const handleCancel = () => {
        setSelectedProp("")
        setEditDeviceOpen(false)
    }

    const deleteDevice = async () => {
        device && await axios.delete(URL + "/deletedevice", {data : device.id})
        clearDeviceStore()
        setEditDeviceOpen(false)
    }

    // aqui podemos possivelmente o escolher o que retornar do repository de devices, ao invés desse filtro abaixo

    let OPTIONS = Object.keys(device ?? "").filter(prop => (
        prop !== "id" && 
        prop !== "createdAt" && 
        prop !== "updatedAt" && 
        prop !== "user_id"
    ))
    
    const translatedOptions = OPTIONS.map((option) => {
        if(option === "name") return {value : option, label : "Nome"} 
        if(option === "power") return {value : option, label : "Potência"} 
        if(option === "room") return {value : option, label : "Cômodo"} 
        if(option === "daily_use") return {value : option, label : "Uso diário (horas)"} 
        if(option === "month_use") return {value : option, label : "Uso mensal (dias)"} 
        if(option === "amount") return {value: option, label : "Quantidade"}
    })

    useEffect(() => {
        setSelectedValue("")
    }, [selectedProp]) 

    function displayInput() {
        if(!selectedProp) return
        if(selectedProp === "room") {
            return (
                <Select 
                    options={selectOptions}
                    className="w-36"
                    onChange={(room) => setSelectedValue(room)}
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
                    onChange={(val) => setSelectedValue(val.target.value)} 
                    value={selectedValue}
                />
            )
        }
        return (
            <InputNumber 
                min="0" 
                max={selectedProp === "daily_use" ? "24" : (selectedProp === "month_use" ? "31" : "") }  
                placeholder="Digite o novo valor"
                className="w-36" 
                onChange={(val) => setSelectedValue(val!)} 
                value={selectedValue}
            />
        )
    }
  
    return (
        <Modal title="Alterar valor" open={isOpen} onOk={handleOk} onCancel={handleCancel}>
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
                    >Exluir aparelho
                </Button>
            </div>
        </Modal>
    )
}

export default ModalEditDevice;