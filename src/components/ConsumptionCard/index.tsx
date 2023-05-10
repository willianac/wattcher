import { Card, Col, Row, Statistic } from 'antd';
import { useUserStore } from '../../store/user';

type CardProps = {
    consumption: number
}

function ConsumptionCard({ consumption }: CardProps ) {
    const { kWhValue } = useUserStore()
    const totalValue = consumption * (kWhValue ? kWhValue : 0)

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