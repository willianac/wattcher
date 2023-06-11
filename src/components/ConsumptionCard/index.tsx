import { Card, Col, Row, Statistic } from "antd";

import { useUserStore } from "../../store/user";
import { useDeviceStore } from "../../store/devices";
import { useCalculateEnergy } from "../../hooks/useCalculateEnergy";

function ConsumptionCard() {
    const { user } = useUserStore()
    const { devices } = useDeviceStore()
    
    const calculateEnergy = useCalculateEnergy

    const consumption = devices.reduce((acum, current) => {
        const result = calculateEnergy(current)
        return acum = acum + Number(result)    
    }, 0)

    const totalValue = consumption * (user.local_kwh ? user.local_kwh : 0) + (user.taxes ? user.taxes : 0)
    
    return (
        <Row gutter={16} className='p-4 bg-grayPrimary'>
            <Col span={12}>
                <Card bordered={false}>
                <Statistic
                    title="Consumo por mês (kWh)"
                    value={consumption}
                    precision={2}
                />
                </Card>
            </Col>
            <Col span={12}>
                <Card bordered={false}>
                <Statistic
                    title="Valor aproximado (R$)"
                    value={totalValue}
                    precision={2}
                />       
                </Card>
            </Col>
        </Row>
    )
}

export default ConsumptionCard;