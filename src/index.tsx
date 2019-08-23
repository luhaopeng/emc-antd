import { Breadcrumb, Icon, Layout } from 'antd'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Link } from 'react-router-dom'
import HLMenu from './components/hl-menu'
import HLRouter from './components/router'
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
      { icon: 'home', key: 'homepage', link: '/', text: '首页' },
      {
        children: [
          {
            key: 'data-realtime',
            link: '/data/realtime',
            text: '实时数据'
          },
          { key: 'data-meter', link: '/data/meter', text: '抄表数据' },
          { key: 'data-usage', link: '/data/usage', text: '用能数据' }
        ],
        icon: 'database',
        key: 'data',
        text: '数据监测'
      },
      {
        children: [
          {
            key: 'analytics-power-factor',
            link: '/analytics/power-factor',
            text: '功率因数'
          },
          {
            key: 'analytics-payload',
            link: '/analytics/payload',
            text: '负载率'
          },
          {
            key: 'analytics-graph',
            link: '/analytics/graph',
            text: '曲线分析'
          },
          {
            key: 'analytics-three-phases',
            link: '/analytics/three-phases',
            text: '三相不平衡'
          },
          {
            key: 'analytics-balance',
            link: '/analytics/balance',
            text: '电平衡分析'
          },
          { key: 'analytics-alert', link: '/analytics/alert', text: '告警查询' }
        ],
        icon: 'line-chart',
        key: 'analytics',
        text: '优质用电'
      },
      {
        children: [
          {
            key: 'stats-level-item',
            link: '/stats/level-item',
            text: '分级分项统计'
          },
          {
            key: 'stats-level-time',
            link: '/stats/level-time',
            text: '分级分时统计'
          },
          {
            key: 'stats-class-time',
            link: '/stats/class-time',
            text: '分类分时统计'
          },
          { key: 'stats-class', link: '/stats/class', text: '分类汇总统计' },
          {
            key: 'stats-horizontal',
            link: '/stats/horizontal',
            text: '横向对比分析'
          },
          {
            key: 'stats-vertical',
            link: '/stats/vertical',
            text: '纵向对比分析'
          },
          {
            key: 'stats-periodical',
            link: '/stats/periodical',
            text: '同期对比分析'
          },
          { key: 'stats-report', link: '/stats/report', text: '能耗周期报表' }
        ],
        icon: 'bar-chart',
        key: 'stats',
        text: '能耗分析'
      },
      {
        children: [
          { key: 'report-custom', link: '/report/custom', text: '自定义报表' }
        ],
        icon: 'file',
        key: 'report',
        text: '报表管理'
      },
      {
        children: [
          {
            children: [
              {
                key: 'prepaid-elec-account',
                link: '/prepaid/elec/account',
                text: '用电账户'
              },
              {
                key: 'prepaid-elec-bill',
                link: '/prepaid/elec/bill',
                text: '用户电费'
              },
              {
                key: 'prepaid-elec-point-bill',
                link: '/prepaid/elec/point-bill',
                text: '计量点电费'
              },
              {
                key: 'prepaid-elec-meter',
                link: '/prepaid/elec/meter',
                text: '电表设置'
              },
              {
                key: 'prepaid-elec-price',
                link: '/prepaid/elec/price',
                text: '电价设置'
              },
              {
                key: 'prepaid-elec-price-rule',
                link: '/prepaid/elec/price-rule',
                text: '电价规则'
              },
              {
                key: 'prepaid-elec-report',
                link: '/prepaid/elec/report',
                text: '电量报表'
              }
            ],
            key: 'prepaid-elec',
            text: '用电'
          },
          {
            children: [
              {
                key: 'prepaid-water-account',
                link: '/prepaid/water/account',
                text: '用水账户'
              },
              {
                key: 'prepaid-water-bill',
                link: '/prepaid/water/bill',
                text: '用户水费'
              },
              {
                key: 'prepaid-water-point-bill',
                link: '/prepaid/water/point-bill',
                text: '计量点水费'
              },
              {
                key: 'prepaid-water-meter',
                link: '/prepaid/water/meter',
                text: '水表设置'
              },
              {
                key: 'prepaid-water-price',
                link: '/prepaid/water/price',
                text: '水价设置'
              },
              {
                key: 'prepaid-water-price-rule',
                link: '/prepaid/water/price-rule',
                text: '水价规则'
              }
            ],
            key: 'prepaid-water',
            text: '用水'
          },
          { key: 'prepaid-recharge-history', text: '充值记录' },
          { key: 'prepaid-log', text: '资金日志' }
        ],
        icon: 'account-book',
        key: 'prepaid',
        text: '远程预付费'
      },
      {
        children: [
          { key: 'icm-account', link: '/icm/account', text: '用电账户' },
          { key: 'icm-bill', link: '/icm/bill', text: '用户电费' },
          { key: 'icm-settle', link: '/icm/settle', text: '电表开户' },
          { key: 'icm-price', link: '/icm/price', text: '电价设置' },
          { key: 'icm-price-rule', link: '/icm/price-rule', text: '电价规则' },
          { key: 'icm-log', link: '/icm/log', text: '操作记录' }
        ],
        icon: 'credit-card',
        key: 'icm',
        text: '费控管理（电量）'
      },
      {
        children: [
          { key: 'esam-account', link: '/esam/account', text: '用电账户' },
          { key: 'esam-bill', link: '/esam/bill', text: '用户电费' },
          { key: 'esam-settle', link: '/esam/settle', text: '电表开户' },
          { key: 'esam-price', link: '/esam/price', text: '电价设置' },
          {
            key: 'esam-price-rule',
            link: '/esam/price-rule',
            text: '电价规则'
          },
          { key: 'esam-log', link: '/esam/log', text: '操作记录' }
        ],
        icon: 'credit-card',
        key: 'esam',
        text: '费控管理（电费）'
      },
      {
        children: [
          {
            key: 'docs-corporation',
            link: '/docs/corporation',
            text: '企业信息'
          },
          { key: 'docs-struct', link: '/docs/struct', text: '用能结构' },
          { key: 'docs-terminal', link: '/docs/terminal', text: '终端维护' },
          { key: 'docs-formula', link: '/docs/formula', text: '平衡公式' },
          { key: 'docs-alert', link: '/docs/alert', text: '告警参数' },
          { key: 'docs-prepaid', link: '/docs/prepaid', text: '预付费用户' },
          { key: 'docs-scheme', link: '/docs/scheme', text: '计算方案' },
          { key: 'docs-device', link: '/docs/device', text: '设备管理' }
        ],
        icon: 'folder-open',
        key: 'docs',
        text: '档案管理'
      },
      {
        children: [
          { key: 'manage-user', link: '/manage/user', text: '用户管理' },
          { key: 'manage-role', link: '/manage/role', text: '角色管理' }
        ],
        icon: 'user',
        key: 'manage',
        text: '用户中心'
      },
      {
        children: [
          {
            key: 'system-data-dict',
            link: '/system/data-dict',
            text: '数据字典'
          },
          { key: 'system-logon', link: '/system/logon', text: '登录日志' },
          {
            key: 'system-operation',
            link: '/system/operation',
            text: '操作日志'
          },
          { key: 'system-channel', link: '/system/channel', text: '通道设置' },
          {
            key: 'system-collection',
            link: '/system/collection',
            text: '采集方案'
          },
          {
            key: 'system-calculation',
            link: '/system/calculation',
            text: '计算任务'
          },
          {
            key: 'system-announce',
            link: '/system/announce',
            text: '公告资讯'
          },
          { key: 'system-report', link: '/system/report', text: '报表设置' }
        ],
        icon: 'setting',
        key: 'system',
        text: '系统配置'
      },
      {
        children: [
          { key: 'maintain-meter', link: '/maintain/meter', text: '抄表总览' },
          {
            key: 'maintain-terminal',
            link: '/maintain/terminal',
            text: '终端状态'
          },
          { key: 'maintain-task', link: '/maintain/task', text: '任务下发' },
          {
            key: 'maintain-switch',
            link: '/maintain/switch',
            text: '拉合闸记录'
          },
          {
            key: 'maintain-expire',
            link: '/maintain/expire',
            text: '企业使用年限'
          }
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
            <Link to='/'>
              <Icon className='icon' type='fire' />
              <h1>能源管理云平台</h1>
            </Link>
          </div>
          <HLMenu collapsed={this.state.collapsed} menu={menu} />
        </Layout.Sider>
        <Layout>
          <Layout.Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className='trigger'
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.hToggle}
            />
          </Layout.Header>
          <HLRouter />
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
}

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
)
