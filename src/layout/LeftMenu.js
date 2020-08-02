import React, { Component } from "react";
import { Layout, Menu } from "antd";
import { get } from '@/api/ajax'

const { Sider } = Layout
const { SubMenu } = Menu

class LeftMenu extends Component {
  state ={
    menuList: []
  }

  componentDidMount() {
    get('/sys/menu')
      .then(body => {
        const menuList = formatMenu(body)
        this.setState({ menuList })
        
      })

    function formatMenu(list) {
      let menus = []
      let submenus = []
      list.forEach(item => {
        if(item.resType === 1) {
          item.children = []
          menus.push(item)
        } else {
          submenus.push(item)
        }
      })
      submenus.forEach(menu => {
        const parentIndex = menus.findIndex(p => p.id === menu.parentId)
        if(parentIndex > -1) {
          menus[parentIndex].children.push(menu)
        }
      })
      return menus
    }
  }
  render() {
    return (
      <Menu
         mode="inline" 
         theme="dark"
         onClick={({key}) => {
          console.log(key)
         }}
      >
        { this.state.menuList.map(menu => (
           menu.children.length ? (
            <SubMenu key={menu.id} title={menu.resName}>
              { menu.children.map(child => (
                <Menu.Item key={child.url}>{ child.resName }</Menu.Item>
              )) }
            </SubMenu>
          ): (
            <Menu.Item key={menu.url}> {menu.resName}</Menu.Item>
          )
        )) }
      </Menu>
    )
  }
} 

export default () => (
  <Sider width={200}>
    <LeftMenu></LeftMenu>
  </Sider>
)
