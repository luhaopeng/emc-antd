import { Breadcrumb, Card,Col, Layout,Row } from 'antd'
import React from 'react'
import './index.less'

const Homepage = (): React.ReactNode => {
  return (
    <Layout.Content className='hl-page-wrapper'>
      <Row gutter={16} className='stats-row'>
        <Col span={6}>
          <Card title='Card title' bordered={false}>
            Card content
          </Card>
        </Col>
        <Col span={6}>
          <Card title='Card title' bordered={false}>
            Card content
          </Card>
        </Col>
        <Col span={6}>
          <Card title='Card title' bordered={false}>
            Card content
          </Card>
        </Col>
        <Col span={6}>
          <Card title='Card title' bordered={false}>
            Card content
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
