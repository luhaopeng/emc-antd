import { Avatar, Card, Col, Layout, List, Row, Statistic, Tag } from 'antd'
import { Chart, Geom, Tooltip } from 'bizcharts'
import React, { useEffect, useState } from 'react'
import { Home } from '../../api'
import './index.less'

interface IEvent {
  content: string
  time: string
  type: string
  user: string
}

const Homepage: React.FunctionComponent = (): JSX.Element => {
  const [elecUse, setElecUse] = useState([])
  const [elecCost, setElecCost] = useState([])
  const [waterUse, setWaterUse] = useState([])
  const [waterCost, setWaterCost] = useState([])
  const [eventList, setEventList] = useState([])

  const queryElecUse = async () => {
    const { data } = await Home.ElecUse.query()
    setElecUse(data.data)
  }
  const queryElecCost = async () => {
    const { data } = await Home.ElecCost.query()
    setElecCost(data.data)
  }
  const queryWaterUse = async () => {
    const { data } = await Home.WaterUse.query()
    setWaterUse(data.data)
  }
  const queryWaterCost = async () => {
    const { data } = await Home.WaterCost.query()
    setWaterCost(data.data)
  }
  const queryEvents = async () => {
    const { data } = await Home.Events.query()
    setEventList(data.data)
  }

  const eventListRenderer = (item: IEvent) => (
    <List.Item extra={item.time}>
      <List.Item.Meta
        avatar={
          <Avatar src='http://resource.energyman.cn/data//res/img/fee/event_disconnect.png' />
        }
        title={item.user}
        description={
          <div>
            <Tag color='blue'>{item.type}</Tag> {item.content}
          </div>
        }
      />
    </List.Item>
  )

  useEffect(() => {
    queryElecCost()
    queryElecUse()
    queryWaterCost()
    queryWaterUse()
    queryEvents()
  }, [])

  const statsValueStyle = { fontSize: '30px' }
  const cardBodyStyle = { padding: '20px 24px 8px' }
  const chartPadding = ['2', '-20'] as [string, string]

  return (
    <Layout.Content className='hl-page-wrapper'>
      <Row gutter={16} className='home-row'>
        <Col span={6}>
          <Card bodyStyle={cardBodyStyle} bordered={false}>
            <Statistic
              title='年用电量（kWh）'
              value={366798.07}
              valueStyle={statsValueStyle}
            />
            <Chart
              padding={chartPadding}
              height={46}
              data={elecUse}
              forceFit={true}
            >
              <Tooltip crosshairs={{ type: 'y' }} />
              <Geom type='area' position='month*usage' shape='smooth' />
            </Chart>
            <div className='card-footer'>月用电量 26,618</div>
          </Card>
        </Col>
        <Col span={6}>
          <Card bodyStyle={cardBodyStyle} bordered={false}>
            <Statistic
              title='年用电费（元）'
              value={540000.07}
              valueStyle={statsValueStyle}
            />
            <Chart
              padding={chartPadding}
              height={46}
              data={elecCost}
              forceFit={true}
            >
              <Tooltip crosshairs={{ type: 'y' }} />
              <Geom type='line' position='month*cost' size={2} shape='smooth' />
            </Chart>
            <div className='card-footer'>月用电费 ￥50,000.1</div>
          </Card>
        </Col>
        <Col span={6}>
          <Card bodyStyle={cardBodyStyle} bordered={false}>
            <Statistic
              title='年用水量（吨）'
              value={597.0}
              valueStyle={statsValueStyle}
            />
            <Chart
              padding={chartPadding}
              height={46}
              data={waterUse}
              forceFit={true}
            >
              <Tooltip crosshairs={{ type: 'y' }} />
              <Geom type='area' position='month*usage' shape='smooth' />
            </Chart>
            <div className='card-footer'>月用水量 51</div>
          </Card>
        </Col>
        <Col span={6}>
          <Card bodyStyle={cardBodyStyle} bordered={false}>
            <Statistic
              title='年用水费（元）'
              value={2268.6}
              valueStyle={statsValueStyle}
            />
            <Chart
              padding={chartPadding}
              height={46}
              data={waterCost}
              forceFit={true}
            >
              <Tooltip crosshairs={{ type: 'y' }} />
              <Geom type='line' position='month*cost' size={2} shape='smooth' />
            </Chart>
            <div className='card-footer'>月用水费 ￥17.8</div>
          </Card>
        </Col>
      </Row>
      <Row className='home-row'>
        <Col>
          <Card title='运行工况统计' bordered={false}>
            <Row>
              <Col span={4}>
                <Statistic title='用户总数' value={18} />
              </Col>
              <Col span={4}>
                <Statistic title='已欠费数' value={4} suffix={`/ ${18}`} />
              </Col>
              <Col span={4}>
                <Statistic title='可催费数' value={0} suffix={`/ ${18}`} />
              </Col>
              <Col span={4}>
                <Statistic title='未按时上报数' value={200} />
              </Col>
              <Col span={4}>
                <Statistic title='催费次数' value={6} />
              </Col>
              <Col span={4}>
                <Statistic title='拉闸次数' value={52} />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Row className='home-row'>
        <Col>
          <Card
            title='告警事件'
            bordered={false}
            bodyStyle={{ padding: '8px 24px' }}
          >
            <List
              itemLayout='horizontal'
              dataSource={eventList}
              pagination={{ position: 'bottom' }}
              renderItem={eventListRenderer}
            />
          </Card>
        </Col>
      </Row>
    </Layout.Content>
  )
}

export default Homepage
