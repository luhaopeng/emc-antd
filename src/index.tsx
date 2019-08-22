import { Breadcrumb, Icon, Layout } from 'antd'
import React from 'react'
import ReactDOM from 'react-dom'
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
    const menu = [
      { icon: 'home', key: 'homepage', text: '首页' },
      {
        children: [
          {
            key: 'realtime',
            text: '实时数据'
          },
          { key: 'meter', text: '抄表数据' },
          { key: 'usage', text: '用能数据' }
        ],
        icon: 'database',
        key: 'data',
        text: '数据监测'
      },
      {
        children: [
          { key: 'power-factor', text: '功率因数' },
          { key: 'payload', text: '负载率' },
          { key: 'graph', text: '曲线分析' },
          { key: 'three-phases', text: '三相不平衡' },
          { key: 'balance', text: '电平衡分析' },
          { key: 'alert', text: '告警查询' }
        ],
        icon: 'line-chart',
        key: 'analytics',
        text: '优质用电'
      },
      {
        children: [
          { key: 'level-item', text: '分级分项统计' },
          { key: 'level-time', text: '分级分时统计' },
          { key: 'class-time', text: '分类分时统计' },
          { key: 'class', text: '分类汇总统计' },
          { key: 'horizontal', text: '横向对比分析' },
          { key: 'vertical', text: '纵向对比分析' },
          { key: 'periodical', text: '同期对比分析' },
          { key: 'report', text: '能耗周期报表' }
        ],
        icon: 'bar-chart',
        key: 'stats',
        text: '能耗分析'
      },
      {
        children: [{ key: 'custom', text: '自定义报表' }],
        icon: 'file',
        key: 'report',
        text: '报表管理'
      },
      {
        children: [
          {
            children: [
              { key: 'account', text: '用电账户' },
              { key: 'bill', text: '用户电费' },
              { key: 'point-bill', text: '计量点电费' },
              { key: 'meter', text: '电表设置' },
              { key: 'price', text: '电价设置' },
              { key: 'price-rule', text: '电价规则' },
              { key: 'report', text: '电量报表' }
            ],
            key: 'elec',
            text: '用电'
          },
          {
            children: [
              { key: 'account', text: '用水账户' },
              { key: 'bill', text: '用户水费' },
              { key: 'point-bill', text: '计量点水费' },
              { key: 'meter', text: '水表设置' },
              { key: 'price', text: '水价设置' },
              { key: 'price-rule', text: '水价规则' }
            ],
            key: 'water',
            text: '用水'
          },
          { key: 'recharge-history', text: '充值记录' },
          { key: 'log', text: '资金日志' }
        ],
        icon: 'account-book',
        key: 'prepaid',
        text: '远程预付费'
      },
      {
        children: [
          { key: 'account', text: '用电账户' },
          { key: 'bill', text: '用户电费' },
          { key: 'settle', text: '电表开户' },
          { key: 'price', text: '电价设置' },
          { key: 'price-rule', text: '电价规则' },
          { key: 'log', text: '操作记录' }
        ],
        icon: 'credit-card',
        key: 'icm',
        text: '费控管理（电量）'
      },
      {
        children: [
          { key: 'account', text: '用电账户' },
          { key: 'bill', text: '用户电费' },
          { key: 'settle', text: '电表开户' },
          { key: 'price', text: '电价设置' },
          { key: 'price-rule', text: '电价规则' },
          { key: 'log', text: '操作记录' }
        ],
        icon: 'credit-card',
        key: 'esam',
        text: '费控管理（电费）'
      },
      {
        children: [
          { key: 'corporation', text: '企业信息' },
          { key: 'struct', text: '用能结构' },
          { key: 'terminal', text: '终端维护' },
          { key: 'formula', text: '平衡公式' },
          { key: 'alert', text: '告警参数' },
          { key: 'prepaid', text: '预付费用户' },
          { key: 'scheme', text: '计算方案' },
          { key: 'device', text: '设备管理' }
        ],
        icon: 'folder-open',
        key: 'docs',
        text: '档案管理'
      },
      {
        children: [
          { key: 'user', text: '用户管理' },
          { key: 'role', text: '角色管理' }
        ],
        icon: 'user',
        key: 'manage',
        text: '用户中心'
      },
      {
        children: [
          { key: 'data-dict', text: '数据字典' },
          { key: 'logon', text: '登录日志' },
          { key: 'operation', text: '操作日志' },
          { key: 'channel', text: '通道设置' },
          { key: 'collection', text: '采集方案' },
          { key: 'calculation', text: '计算任务' },
          { key: 'announce', text: '公告资讯' },
          { key: 'report', text: '报表设置' }
        ],
        icon: 'setting',
        key: 'system',
        text: '系统配置'
      },
      {
        children: [
          { key: 'meter', text: '抄表总览' },
          { key: 'terminal', text: '终端状态' },
          { key: 'task', text: '任务下发' },
          { key: 'switch', text: '拉合闸记录' },
          { key: 'expire', text: '企业使用年限' }
        ],
        icon: 'gold',
        key: 'maintain',
        text: '运维分析'
      }
    ]
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Layout.Sider collapsed={this.state.collapsed} width={240}>
          <div className='logo'>
            <a onClick={this.hHomepage}>
              <Icon className='icon' type='fire' />
              <h1>能源管理云平台</h1>
            </a>
          </div>
          <HLMenu menu={menu} />
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
            Holley Inc. &copy;2019 All Rights Reserved.
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
