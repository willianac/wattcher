import { Form, InputNumber, Button, Select, SelectProps } from "antd";
import FormItem from "antd/es/form/FormItem";
import { Device } from "../../store/devices";

const options: SelectProps["options"] = [];

for(let i = 1; i <= 24; i++) {
  options.push(
    {value : i, label : `${i} horas`}
  )
}

function IntroForm ({ calc }: any) {
    const [form] = Form.useForm()

    const getValues = () => {
        let values = form.getFieldsValue() as Device
        calc(values)
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
                <FormItem name="power" rules={[{required : true}]}>
                    <InputNumber className="w-full"/>
                </FormItem>

                <p>Quantas horas por dia você usa?</p>
                <FormItem name="daily_use" rules={[{required : true}]}>
                    <Select
                        options={options}
                    />
                </FormItem>

                <p>Quantos dias em um mês?</p>
                <FormItem name="month_use" rules={[{required : true}]}>
                    <InputNumber min={1} max={31} className="w-full"/>
                </FormItem>

                <FormItem>
                    <Button type="primary" htmlType="submit" className="bg-colorPrimary" size="large">Calcular</Button>
                </FormItem>
            </Form>
        </div>
    )
}

export default IntroForm;