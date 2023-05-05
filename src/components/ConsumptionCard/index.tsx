import { Card, Col, Row, Statistic } from 'antd';

type CardProps = {
    consumption: number
}

function ConsumptionCard({ consumption }: CardProps ) {
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
                    value={9.3}
                    precision={2}
                />
                </Card>
            </Col>
        </Row>
    )
}

export default ConsumptionCard;