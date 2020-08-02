import React from 'react'
import { Layout, Icon, message } from 'antd'
import { withRouter } from 'react-router-dom'
import { get } from '@/api/ajax'

const { Header }  = Layout

function TopHeader (props) {
  function logOut(history) {
    console.log(history)
    get('/sys/logout')
      .then(() => {
        message.info('退出登录成功')
        history.push('/login')
      })
  }
  const LogOutIcon = withRouter(({history}) => (
    <Icon type="logout" onClick={logOut.bind(null,history)}/>
  ))

  return (
    <Header style={{color: 'white'}}>
      <div className="logo dpib" style={{width:'200px',height: '100%'}}>

      </div>
      {/* <h1>顶部菜单</h1> */}
      <div className="fr">
        <LogOutIcon />
      </div>
    </Header>
  )
}

export default TopHeader