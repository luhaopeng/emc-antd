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
      cost: 3.1,
      month: '2019-01'
    },
    {
      cost: 2.8,
      month: '2019-02'
    },
    {
      cost: 4.4,
      month: '2019-03'
    },
    {
      cost: 2.9,
      month: '2019-04'
    },
    {
      cost: 3.5,
      month: '2019-05'
    },
    {
      cost: 4.7,
      month: '2019-06'
    },
    {
      cost: 5.1,
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

  const cardBodyStyle = { padding: '20px 24px 8px' }
  const cardFooterStyle = { fontSize: '14px', color: '#777' }

  return (
    <Layout.Content className='hl-page-wrapper'>
      <Row gutter={16} className='stats-row'>
        <Col span={6}>
          <Card bodyStyle={cardBodyStyle} bordered={false}>
            <Statistic title='年用电量（kWh）' value={366798.07} />
            <ResponsiveContainer width='100%' height={60}>
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
                  stroke='#8884d8'
                  fill='#8884d8'
                />
              </AreaChart>
            </ResponsiveContainer>
            <Statistic
              className='card-footer'
              prefix='月用电量 '
              value={26618}
              valueStyle={cardFooterStyle}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bodyStyle={cardBodyStyle} bordered={false}>
            <Statistic title='年用电费（万元）' value={54.07} />
            <ResponsiveContainer width='100%' height={60}>
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
                  type='monotone'
                  dataKey='cost'
                  stroke='#3aa0ff'
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
            <Statistic
              className='card-footer'
              prefix='月用电费 ￥'
              value={5.1}
              valueStyle={cardFooterStyle}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bodyStyle={cardBodyStyle} bordered={false}>
            <Statistic title='年用水量（吨）' value={597.0} />
            <ResponsiveContainer width='100%' height={60}>
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
                  stroke='#8884d8'
                  fill='#8884d8'
                />
              </AreaChart>
            </ResponsiveContainer>
            <Statistic
              className='card-footer'
              prefix='月用水量 '
              value={51}
              valueStyle={cardFooterStyle}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bodyStyle={cardBodyStyle} bordered={false}>
            <Statistic title='年用水费（元）' value={2268.6} />
            <ResponsiveContainer width='100%' height={60}>
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
                  type='monotone'
                  dataKey='cost'
                  stroke='#3aa0ff'
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
            <Statistic
              className='card-footer'
              prefix='月用水费 ￥'
              value={17.8}
              valueStyle={cardFooterStyle}
            />
          </Card>
        </Col>
      </Row>
      <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
        This is homepage.
      </div>
    </Layout.Content>
  )
}

export default Homepage
