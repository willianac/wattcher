import { Form, InputNumber, Slider, Select, Button, AutoComplete } from "antd"
import { useState } from "react"
import { Device } from "../../store/devices"

const OPTIONS = {
    autocompleteOptions : [{value: "geladeira"}, {value : "máquina de lavar"}, {value : "lava-louças"}, {value : "computador"}, {value : "televisão"}, {value : "monitor"}, {value : "lâmpada"}, {value : "ventilador"}, {value : "ar-condicionado"}, {value : "chuveiro elétrico"}],
    selectOptions : [{value : "living_room", label : "Sala"}, {value: "bathroom", label: "Banheiro"}, {value: "kitchen", label: "Cozinha"}, {value: "bedroom", label: "Quarto"}, {value: "office", label: "Escritório"}, {value: "backyard", label: "Quintal"}, {value: "terrace", label: "Terraço/Varanda"}, {value : "garage", label : "Garagem"}, {value: "others", label: "Outros"}]
}

type DeviceFormActions = {
    saveDevice: (device: Device) => void,
    throwToastError: () => void
}

function DeviceForm({ saveDevice, throwToastError }: DeviceFormActions) {
    const [options, setOptions] = useState(OPTIONS.autocompleteOptions)

    const handleChange = (text: string) => {
        let filteredOptions = OPTIONS.autocompleteOptions.filter((val) => val.value.startsWith(text))
        if(!text.trim()) {return setOptions(OPTIONS.autocompleteOptions)}
        setOptions(filteredOptions)
    } 

    return (
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
    )
}

export default DeviceForm;