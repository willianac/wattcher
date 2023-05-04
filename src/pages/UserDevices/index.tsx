import { Card, Col, Row, Statistic } from 'antd';

import { useCalculateEnergy } from '../../hooks/useCalculateEnergy';
import { useDeviceStore } from "../../store/devices";

function UserDevices() {
    const { devices } = useDeviceStore()

    const consumoTotal = devices.reduce((acum, current) => {
        let result = useCalculateEnergy(current)
        return acum = acum + Number(result)
        
    }, 0)
    
    return (
        <Row gutter={16} className='p-6 bg-slate-300 w-3/5 '>
            <Col span={12}>
                <Card bordered={false}>
                <Statistic
                    title="Consumo por mês (kWh)"
                    value={consumoTotal}
                    precision={2}
                />
                </Card>
            </Col>
            <Col span={12}>
                <Card bordered={false}>
                <Statistic
                    title="Valor aproximado (R$)"
                    value={9.3}
                    precision={2}
                />
                </Card>
            </Col>
        </Row>
    )
}

export default UserDevices;