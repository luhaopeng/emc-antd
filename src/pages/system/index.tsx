import { Breadcrumb, Layout } from 'antd'
import React from 'react'

const PageSystem: React.FunctionComponent = (): JSX.Element => {
  return (
    <Layout.Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>User</Breadcrumb.Item>
        <Breadcrumb.Item>Bill</Breadcrumb.Item>
      </Breadcrumb>
      <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
        This is system.
      </div>
    </Layout.Content>
  )
}

export default PageSystem
