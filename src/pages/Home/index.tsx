import { AutoComplete, Empty, InputNumber, Slider, Button, Form, message, Select } from "antd";
import { useState } from "react";
import AnimatedWrapper from "../../animations/AnimatedWrapper";
import DeviceIcon from "../../components/DeviceIcon";
import { Device, useDeviceStore } from "../../store/devices";
import { Link } from "react-router-dom";
import { useRoomCounter } from "../../hooks/useRoomCounter";

const OPTIONS = {
    autocompleteOptions : [{value: "geladeira"}, {value : "máquina de lavar"}, {value : "lava-louças"}, {value : "computador"}, {value : "televisão"}, {value : "monitor"}, {value : "lâmpada"}, {value : "ventilador"}, {value : "ar-condicionado"}, {value : "chuveiro elétrico"}],
    selectOptions : [{value : "living_room", label : "Sala"}, {value: "bathroom", label: "Banheiro"}, {value: "kitchen", label: "Cozinha"}, {value: "bedroom", label: "Quarto"}, {value: "office", label: "Escritório"}, {value: "backyard", label: "Quintal"}, {value: "terrace", label: "Terraço/Varanda"}, {value : "garage", label : "Garagem"}, {value: "others", label: "Outros"}]
}

function Home() {
    const { actions : { addDevice }, devices } = useDeviceStore()
    const [options, setOptions] = useState(OPTIONS.autocompleteOptions)
    const [messageAPI, contextHolder] = message.useMessage()
    const roomCounts = useRoomCounter(devices)

    const handleChange = (text: string) => {
        let filteredOptions = OPTIONS.autocompleteOptions.filter((val) => val.value.startsWith(text))
        if(!text.trim()) {return setOptions(OPTIONS.autocompleteOptions)}
        setOptions(filteredOptions)
    } 

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
            <AnimatedWrapper>
                {contextHolder}
                {devices.length ? 
                    <div className="grid grid-cols-3 gap-y-3 place-items-center">
                        {Object.keys(roomCounts).map((room, index) => (
                             <DeviceIcon icon_name={room} quantity={roomCounts[room]} key={index}/>
                        ))}
                    </div> :
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<span>Você ainda não tem nenhum equipamento</span>}/>
                }
                <h1 className="text-3xl font-bold tracking-tighter mt-6">Vamos começar</h1>
                <p className="text-sm w-3/4 mt-1 text-slate-500">Qual equipamento você quer inserir primeiro?</p>
                <Form
                    onFinish={saveDevice}
                    onFinishFailed={throwToastError}
                    className="mt-4"
                >
                    <p>Nome</p>
                    <Form.Item name="name" rules={[{required : true, message : "Escolha o nome do aparelho"}]}>
                        <AutoComplete
                            onChange={handleChange}
                            className="w-full" 
                            options={options}
                            />
                    </Form.Item>

                    <p>Potência</p>
                    <Form.Item name="power" rules={[{required : true, message : "Por favor insira a potência"}]}>
                        <InputNumber className="w-full"/>
                    </Form.Item>

                    <p>Uso diário (horas)</p>
                    <Form.Item name="daily_use">
                        <Slider min={1} max={24} />
                    </Form.Item>

                    <p>Dias por mês</p>
                    <Form.Item name="month_use">
                        <Slider min={1} max={31} />
                    </Form.Item>

                    <p>Onde esse objeto fica?</p>
                    <Form.Item name="room" >
                        <Select options={OPTIONS.selectOptions}/>
                    </Form.Item>

                    <Form.Item>
                        <Button htmlType="submit" type="primary" size="large" className="bg-colorPrimary w-full" >Adicionar</Button>
                    </Form.Item>

                </Form>
                <Link to="/mydevices">MEUS APARELHOS</Link>
            </AnimatedWrapper>     
        </div>
    )
}

export default Home;