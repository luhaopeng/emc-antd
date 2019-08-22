import { Icon, Menu } from 'antd'
import React, { ReactElement } from 'react'

const { SubMenu } = Menu

interface IMenuItem {
  key: string
  text: string
  icon?: string
  children?: IMenuItem[]
}

interface IMenuProp {
  menu: IMenuItem[]
}

export default class HLMenu extends React.Component<IMenuProp, {}> {
  public render() {
    const { menu } = this.props
    return (
      <Menu theme='dark' defaultSelectedKeys={['1']} mode='inline'>
        {menu.map(item => this.buildMenuItem(item))}
      </Menu>
    )
  }

  private buildMenuItem(item: IMenuItem): ReactElement {
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
          {item.icon ? <Icon type={item.icon} /> : null}
          <span>{item.text}</span>
        </Menu.Item>
      )
    }
  }
}
