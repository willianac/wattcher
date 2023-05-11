import { Card, Col, Row, Statistic } from 'antd';

import { useUserStore } from '../../store/user';
import { useDeviceStore } from '../../store/devices';
import { useCalculateEnergy } from '../../hooks/useCalculateEnergy';

function ConsumptionCard() {
    const { kWhValue } = useUserStore()
    const { devices } = useDeviceStore()
    const { extras } = useUserStore()

    const consumption = devices.reduce((acum, current) => {
        let result = useCalculateEnergy(current)
        return acum = acum + Number(result)
        
    }, 0)

    const totalValue = consumption * (kWhValue ? kWhValue : 0) + extras

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