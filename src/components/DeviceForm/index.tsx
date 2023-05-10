import { Form, InputNumber, Slider, Select, Button, AutoComplete } from "antd"
import { useEffect, useState } from "react"
import { Device } from "../../store/devices"

const OPTIONS = {
    autocompleteOptions : [{value: "geladeira"}, {value : "máquina de lavar"}, {value : "lava-louças"}, {value : "computador"}, {value : "televisão"}, {value : "monitor"}, {value : "lâmpada"}, {value : "ventilador"}, {value : "ar-condicionado"}, {value : "chuveiro elétrico"}],
    selectOptions : [{value : "Sala", label : "Sala"}, {value: "Banheiro", label: "Banheiro"}, {value: "Cozinha", label: "Cozinha"}, {value: "Quarto", label: "Quarto"}, {value: "Escritório", label: "Escritório"}, {value: "Quintal", label: "Quintal"}, {value: "Terraço/Varanda", label: "Terraço/Varanda"}, {value : "Garagem", label : "Garagem"}, {value: "Outros", label: "Outros"}]
}

type DeviceFormActions = {
    saveDevice: (device: Device) => void,
    throwToastError: () => void
}

function DeviceForm({ saveDevice, throwToastError }: DeviceFormActions) {
    const [options, setOptions] = useState(OPTIONS.autocompleteOptions)
    const [amountInput, setAmountInput] = useState(false)

    const handleAutocompleteChange = (text: string) => {
        handleAmountInput(text)
        if(!text.trim()) {return setOptions(OPTIONS.autocompleteOptions)}
        let filteredOptions = OPTIONS.autocompleteOptions.filter((val) => val.value.startsWith(text))
        setOptions(filteredOptions)
    } 

    const handleAmountInput = (text: string) => {
        if(text === "lâmpada") return setAmountInput(true)
        if(text !== "lâmpada" && !amountInput) {return}
        setAmountInput(false)
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
                    onChange={handleAutocompleteChange}
                    className="w-full" 
                    options={options}
                    />
            </Form.Item>

            {amountInput && <Form.Item name="amount">
                                <InputNumber className="w-full" placeholder="Quantidade"/>
                            </Form.Item>}

            <p>Potência</p>
            <Form.Item name="power" rules={[{required : true, message : "Por favor insira a potência"}]}>
                <InputNumber className="w-full"/>
            </Form.Item>

            <p>Uso diário (horas)</p>
            <Form.Item name="daily_use" initialValue={1}>
                <Slider min={1} max={24}/>
            </Form.Item>

            <p>Dias por mês</p>
            <Form.Item name="month_use" initialValue={1}>
                <Slider min={1} max={31} />
            </Form.Item>

            <p>Onde esse objeto fica?</p>
            <Form.Item name="room" rules={[{required : true, message : "Por favor selecione o local"}]}>
                <Select options={OPTIONS.selectOptions}/>
            </Form.Item>

            <Form.Item>
                <Button htmlType="submit" type="primary" size="large" className="bg-colorPrimary w-full">Adicionar</Button>
            </Form.Item>

        </Form>
    )
}

export default DeviceForm;