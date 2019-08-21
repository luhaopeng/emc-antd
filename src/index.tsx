import { Breadcrumb, Icon, Layout } from 'antd'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import HLMenu from './components/hl-menu'
import './index.less'

interface IAppState {
  collapsed: boolean
}

class App extends React.Component<{}, IAppState> {
  constructor(props: {}) {
    super(props)
    this.state = {
      collapsed: false
    }
  }

  public render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Layout.Sider collapsed={this.state.collapsed} width={240}>
          <div className='logo'>
            <a onClick={this.hHomepage}>
              <Icon className='icon' type='fire' />
              <h1>能源管理云平台</h1>
            </a>
          </div>
          <HLMenu />
        </Layout.Sider>
        <Layout>
          <Layout.Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className='trigger'
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.hToggle}
            />
          </Layout.Header>
          <Layout.Content style={{ padding: '0 50px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              Bill is a cat.
            </div>
          </Layout.Content>
          <Layout.Footer style={{ textAlign: 'center' }}>
            Holley &copy;2019 All Rights Reserved.
          </Layout.Footer>
        </Layout>
      </Layout>
    )
  }

  private hToggle = () => {
    this.setState({ collapsed: !this.state.collapsed })
  }

  private hHomepage = () => {
    console.log('homepage')
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
