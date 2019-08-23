import { Icon, Menu } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

const { SubMenu } = Menu

interface IMenuItem {
  key: string
  text: string
  link?: string
  icon?: string
  children?: IMenuItem[]
}

interface IMenuProp {
  collapsed: boolean
  menu: IMenuItem[]
}

interface IMenuState {
  openKeys: string[]
  spreadOpenKeys: string[]
  collapsed: boolean
}

export default class HLMenu extends React.Component<IMenuProp, IMenuState> {
  public static getDerivedStateFromProps(
    nextProps: IMenuProp,
    prevState: IMenuState
  ): null | IMenuState {
    if (nextProps.collapsed !== prevState.collapsed) {
      if (nextProps.collapsed) {
        return {
          collapsed: nextProps.collapsed,
          openKeys: [],
          spreadOpenKeys: prevState.openKeys
        }
      } else {
        return {
          collapsed: nextProps.collapsed,
          openKeys: prevState.spreadOpenKeys,
          spreadOpenKeys: []
        }
      }
    }
    return null
  }

  private rootSubmenuKeys: string[]

  constructor(props: IMenuProp) {
    super(props)
    this.state = { openKeys: [], spreadOpenKeys: [], collapsed: false }
    this.rootSubmenuKeys = props.menu.map(item => item.key)
  }

  public render() {
    const { menu } = this.props
    return (
      <Menu
        theme='dark'
        defaultSelectedKeys={[menu[0].key]}
        mode='inline'
        openKeys={this.state.openKeys}
        onOpenChange={this.onOpenChange}
        onSelect={this.onSelect}
      >
        {menu.map(item => this.buildMenuItem(item))}
      </Menu>
    )
  }

  private buildMenuItem = (item: IMenuItem): React.ReactNode => {
    if (item.children) {
      return (
        <SubMenu
          key={item.key}
          title={
            <span>
              {item.icon ? <Icon type={item.icon} /> : null}
              <span>{item.text}</span>
            </span>
          }
        >
          {item.children.map(subItem => this.buildMenuItem(subItem))}
        </SubMenu>
      )
    } else {
      return (
        <Menu.Item key={item.key}>
          <Link to={item.link ? item.link : '/'}>
            {item.icon ? <Icon type={item.icon} /> : null}
            <span>{item.text}</span>
          </Link>
        </Menu.Item>
      )
    }
  }

  private onOpenChange = (openKeys: string[]) => {
    // 找到最新添加到openKeys中的key
    const latestOpenKey = openKeys.find(
      key => this.state.openKeys.indexOf(key) === -1
    )
    if (!latestOpenKey) {
      this.setState({ openKeys })
    } else if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      // 这是在原有展开菜单项中的子项
      this.setState({ openKeys })
    } else {
      // 展开了其他一级菜单
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : []
      })
    }
  }

  private onSelect = ({ key }) => {
    if (this.props.collapsed) {
      this.setState({ spreadOpenKeys: this.findKeyPath(key) })
    }
  }

  private findKeyPath = (key: string): string[] => {
    const { menu } = this.props
    const path = []
    menu.some(item => this.finder(item, path, key))
    return path
  }

  private finder = (
    cur: IMenuItem,
    path: string[],
    toMatch: string
  ): boolean => {
    if (cur.key === toMatch) {
      return true
    } else if (cur.children) {
      if (cur.children.some(child => this.finder(child, path, toMatch))) {
        path.unshift(cur.key)
        return true
      }
    }
    return false
  }
}
