import { Card, Col, Layout, Row, Statistic } from 'antd'
import React from 'react'
import {
  Area,
  AreaChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis
} from 'recharts'
import './index.less'

const Homepage = (): React.ReactNode => {
  const dataYearElecUse = [
    {
      month: '2019-01',
      usage: 24072
    },
    {
      month: '2019-02',
      usage: 27163
    },
    {
      month: '2019-03',
      usage: 20254
    },
    {
      month: '2019-04',
      usage: 17345
    },
    {
      month: '2019-05',
      usage: 25436
    },
    {
      month: '2019-06',
      usage: 21527
    },
    {
      month: '2019-07',
      usage: 26618
    }
  ]
  const dataYearElecCost = [
    {
      cost: 30000.1,
      month: '2019-01'
    },
    {
      cost: 20000.8,
      month: '2019-02'
    },
    {
      cost: 40000.4,
      month: '2019-03'
    },
    {
      cost: 20000.9,
      month: '2019-04'
    },
    {
      cost: 30000.5,
      month: '2019-05'
    },
    {
      cost: 40000.7,
      month: '2019-06'
    },
    {
      cost: 50000.1,
      month: '2019-07'
    }
  ]
  const dataYearWaterUse = [
    {
      month: '2019-01',
      usage: 45
    },
    {
      month: '2019-02',
      usage: 49
    },
    {
      month: '2019-03',
      usage: 33
    },
    {
      month: '2019-04',
      usage: 37
    },
    {
      month: '2019-05',
      usage: 56
    },
    {
      month: '2019-06',
      usage: 46
    },
    {
      month: '2019-07',
      usage: 51
    }
  ]
  const dataYearWaterCost = [
    {
      cost: 15.1,
      month: '2019-01'
    },
    {
      cost: 9.9,
      month: '2019-02'
    },
    {
      cost: 10.6,
      month: '2019-03'
    },
    {
      cost: 16.0,
      month: '2019-04'
    },
    {
      cost: 12.7,
      month: '2019-05'
    },
    {
      cost: 18.9,
      month: '2019-06'
    },
    {
      cost: 17.8,
      month: '2019-07'
    }
  ]

  const usageFormatter = (value: number) => [value, '月用量']
  const costFormatter = (value: number) => [value, '月费用']

  const statsValueStyle = { fontSize: '30px' }
  const cardBodyStyle = { padding: '20px 24px 8px' }

  const debounce = 30

  return (
    <Layout.Content className='hl-page-wrapper'>
      <Row gutter={16} className='stats-row'>
        <Col span={6}>
          <Card bodyStyle={cardBodyStyle} bordered={false}>
            <Statistic
              title='年用电量（kWh）'
              value={366798.07}
              valueStyle={statsValueStyle}
            />
            <ResponsiveContainer debounce={debounce} width='100%' height={46}>
              <AreaChart
                data={dataYearElecUse}
                margin={{
                  bottom: 5,
                  left: 0,
                  right: 0,
                  top: 5
                }}
              >
                <XAxis dataKey='month' hide={true} />
                <Tooltip formatter={usageFormatter} />
                <Area
                  type='monotone'
                  dataKey='usage'
                  stroke='#955fe2'
                  fill='#955fe2'
                />
              </AreaChart>
            </ResponsiveContainer>
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
            <ResponsiveContainer debounce={debounce} width='100%' height={46}>
              <LineChart
                data={dataYearElecCost}
                margin={{
                  bottom: 5,
                  left: 0,
                  right: 0,
                  top: 5
                }}
              >
                <XAxis dataKey='month' hide={true} />
                <Tooltip formatter={costFormatter} />
                <Line
                  dot={false}
                  type='monotone'
                  dataKey='cost'
                  stroke='#3aa0ff'
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
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
            <ResponsiveContainer debounce={debounce} width='100%' height={46}>
              <AreaChart
                data={dataYearWaterUse}
                margin={{
                  bottom: 5,
                  left: 0,
                  right: 0,
                  top: 5
                }}
              >
                <XAxis dataKey='month' hide={true} />
                <Tooltip formatter={usageFormatter} />
                <Area
                  type='monotone'
                  dataKey='usage'
                  stroke='#955fe2'
                  fill='#955fe2'
                />
              </AreaChart>
            </ResponsiveContainer>
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
            <ResponsiveContainer debounce={debounce} width='100%' height={46}>
              <LineChart
                data={dataYearWaterCost}
                margin={{
                  bottom: 5,
                  left: 0,
                  right: 0,
                  top: 5
                }}
              >
                <XAxis dataKey='month' hide={true} />
                <Tooltip formatter={costFormatter} />
                <Line
                  dot={false}
                  type='monotone'
                  dataKey='cost'
                  stroke='#3aa0ff'
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className='card-footer'>月用水费 ￥17.8</div>
          </Card>
        </Col>
      </Row>
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
            <Statistic title='未按时上报数' value={200}  />
          </Col>
          <Col span={4}>
            <Statistic title='催费次数' value={6}  />
          </Col>
          <Col span={4}>
            <Statistic title='拉闸次数' value={52}  />
          </Col>
        </Row>
      </Card>
    </Layout.Content>
  )
}

export default Homepage
