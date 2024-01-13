import React from 'react'
import { Button } from 'antd'
import { useAuth } from '../utils/authProvider'
import { Col, Row, Statistic, Card } from 'antd';
import { ShopOutlined, GithubOutlined, HistoryOutlined } from '@ant-design/icons';
import { PieChart } from '@mui/x-charts/PieChart';

type Props = {}

const Reports = (props: Props) => {
  const token = useAuth();

  const Companies = () => {
    const numberOfCompanies = 96
    const currentCompanies = 42
    return (
      <Card title="Companies" bordered={false} style={{ width: '100%' }}>
        <Row gutter={16}>
          <Col span={12}>
            <Statistic title="Total Companies" value={numberOfCompanies} prefix={<ShopOutlined />} />
          </Col>
          <Col span={12}>
            <Statistic title="Companies in our system" value={currentCompanies} suffix={`/${numberOfCompanies}`} />
          </Col>
        </Row>
      </Card>
    )
  }
  const LastlyAdded = () => {
    return (
      <Card title="Last Added Company" bordered={false} style={{ width: '100%' }}>
        <Row gutter={32}>
          <Col span={4}><GithubOutlined style={{ fontSize: '42px' }} /></Col>
          <Col span={16}>
            <Row gutter={32}>GITHUB</Row>
            <Row gutter={32} style={{ opacity: 0.7, fontSize: '12px' }}>GitHub is a code hosting platform for version control and collaboration. It lets you and others work together on projects from anywhere.</Row>
          </Col>
          <Col span={4}>
            <HistoryOutlined />
            <br />
            3H AGO
          </Col>
        </Row>
      </Card>
    )
  }
  const Sectors = () => {
    return (
      <Card title="Sectors" bordered={false} style={{ width: '100%' }}>
        <Row gutter={32}>
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 10, label: 'Clothing' },
                  { id: 1, value: 15, label: 'Technology' },
                  { id: 2, value: 20, label: 'Industry' },
                ],
              },
            ]}
            width={400}
            height={200}
          />
        </Row>
      </Card>
    )
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: 1000, marginTop: '6em' }}>
        <Row gutter={64}>
          <Col span={10}>
            <Companies />
          </Col>
          <Col span={14}>
            <LastlyAdded />
          </Col>
        </Row>
        <br />
        <Row gutter={32}>
          <Col span={13}>
            <Sectors />
          </Col>
          <Col span={11}>
            <Companies />
          </Col>
        </Row>

      </div>
    </div>
  )
}
export default Reports