import { Modal, Button } from "antd"
import { Device, useDeviceStore } from "../../store/devices"
import { DeleteOutlined } from "@ant-design/icons"

type ModalProps = {
    isOpen : boolean
    device : Device | undefined
    setEditDeviceOpen : React.Dispatch<React.SetStateAction<boolean>>
}

function ModalEditDevice({ isOpen, device, setEditDeviceOpen }: ModalProps) {
    const { actions : {removeDevice} } = useDeviceStore()
    const handleOk = (device: any) => {
        console.log(device)
    }

    const handleCancel = () => {
        setEditDeviceOpen(false)
    }

    return (
        <Modal title="Editar" open={isOpen} onOk={handleOk} onCancel={handleCancel}>
            <Button className="bg-red-500 text-white flex items-center" icon={<DeleteOutlined />}>Exluir</Button>
        </Modal>
    )
}

export default ModalEditDevice;