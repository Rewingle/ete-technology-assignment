import React, { useState, useEffect } from 'react'
import { Button, Spin } from 'antd'
import { useAuth } from '../utils/authProvider'
import { Col, Row, Statistic, Card } from 'antd';
import { ShopOutlined, GithubOutlined, HistoryOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { PieChart } from '@mui/x-charts/PieChart';

type Props = {}

const Reports = (props: Props) => {
  const token = useAuth();

  interface report { lastCompany: any, count: any, pie: any, highestRevenue: any }

  const [report, setReport] = useState<report>()

  const Companies = () => {

    return (
      <Card title="Companies" bordered={false} style={{ width: '100%'}}>
        {report?<Row gutter={16}>
          <Col span={12}>
            <Statistic title="Total Companies" value={report.count} prefix={<ShopOutlined style={{color:'#F3797E'}} />} />
          </Col>
          <Col span={12}>
            <Row style={{opacity:0.7,fontSize:'14px'}}>{'Highest Earned Company'} </Row>
            <hr style={{opacity:0.7}}/>
            <Row style={{fontSize:'18px'}}>{report.highestRevenue[0].name}</Row>
            
          </Col>
        </Row>:<Spin size='large'/>}
      </Card>
    )
  }


  const getTimeInterval = () => {
    let createdAt = Date.parse(report?.lastCompany[0].createdAt)
    var time = new Date((Date.now() - createdAt)).getMinutes().toString()
    return time
  }

  const LastlyAdded = () => {

    return (
      <Card title="Lastly Added Company" bordered={false} style={{ width: '100%' }}>
        <Row gutter={32}>
          {report ? <>
            <Col span={4} style={{ display: 'flex', alignItems: 'center' }}><ClockCircleOutlined style={{ fontSize: '34px' }} /></Col>

            <Col span={16}>
              <Row gutter={32} style={{ fontSize: '2em', fontWeight: '600' }}>{report.lastCompany[0].name}</Row>
              <Row gutter={32} style={{ opacity: 0.7, fontSize: '16px' }}>{'Added ' + getTimeInterval() + ' Minutes Ago'}</Row>
            </Col>
            <Col span={4}>
              {report.lastCompany.name}
            </Col>
          </> : <Spin size='large'/>}
        </Row>
      </Card>
    )
  }
  const Sectors = () => {
    return (
      <Card title="Sectors" bordered={false} style={{ width: '100%' }}>
        <Row gutter={32}>
          {report ? <PieChart
            series={[
              {
                data: report.pie,
              },
            ]}
            width={400}
            height={200}
          /> : <Spin size='large' />}
        </Row>
      </Card>
    )
  }

  useEffect(() => {
    const getReport = async () => {
      await fetch('http://localhost:5000/api/getReport').then((res) => {
        if (res.ok) {

          res.json().then(data => {
            setReport(data)
          })
        }

      }).catch((err) => { console.log(err); alert(err) })

    }
    getReport()
  }, [])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: 1000, marginTop: '6em' }}>
        <div>ONLINE</div>
        <br/>
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