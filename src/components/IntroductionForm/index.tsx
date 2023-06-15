import { Form, InputNumber, Button, Select, SelectProps } from "antd";
import { Device } from "../../store/devices";

type ComponentProps = {
    calc : (device: Device) => void
}

const options: SelectProps["options"] = [];

for(let i = 1; i <= 24; i++) {
  options.push(
    {value : i, label : `${i} horas`}
  )
}

function IntroForm ({ calc }: ComponentProps) {
    const [form] = Form.useForm()

    const getValues = () => {
        const values = form.getFieldsValue() as Device
        calc(values)
        form.resetFields()
    }

    return (
        <div>
            <Form
                name="deviceInfo"
                onFinish={getValues}
                autoComplete="off"
                form={form}
            >
                <p>Qual a potência dele em watts?</p>
                <Form.Item name="power" rules={[{required : true}]}>
                    <InputNumber className="w-full"/>
                </Form.Item>

                <p>Quantas horas por dia você usa?</p>
                <Form.Item name="daily_use" rules={[{required : true}]}>
                    <Select
                        options={options}
                    />
                </Form.Item>

                <p>Quantos dias em um mês?</p>
                <Form.Item name="month_use" rules={[{required : true}]}>
                    <InputNumber min={1} max={31} className="w-full"/>
                </Form.Item>

                <Form.Item>
                    <Button 
                        type="primary" 
                        htmlType="submit" 
                        className="bg-colorPrimary" 
                        size="large"
                        >Calcular
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default IntroForm;