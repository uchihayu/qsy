import React from "react"
import { Icon, Button, Form, Input, message } from 'antd'

import './index.less'
import {post} from '@/api/ajax'


class LoginForm extends React.Component {
  componentDidUpdate() {
    console.log(this.props)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log(this.props)
    this.props.form.validateFields((err, values) => {
      if (!err) {
        post('/login/login', values)
          .then(response => {
            if (response.code === '200') {
              message.info('登录成功')
              this.props.history.push('/app')
            } else {
              message.warn('账号或密码错误，请重试')
            }
          })

      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const layout = {
      labelCol: {span: 6},
      wrapperCol: {span: 18}
    }
    const rulesAccount = [
      {required: true, message:'用户名不能为空'}
    ]
    const rulesPwd = [
      {required: true, message:'密码不能为空',},
      {min: 6, message: '长度至少为6'}
    ]
    return (
      <Form 
        {...layout}
        name="login"
        wrapperCol={{span:24 }}
        className="form-area"
        onSubmit={this.handleSubmit}
      >
        <Form.Item                 >
          {getFieldDecorator('account', {
            rules: rulesAccount,
            validateTrigger: 'onBlur'
          })(
            <Input prefix={ <Icon type="user"/> } size="large" placeholder="请输入手机号或账号" allowClear/>
          )}
        </Form.Item>
        <Form.Item 
        >
          {getFieldDecorator('password', {
            rules: rulesPwd,
            validateTrigger: 'onBlur'
          })(
            <Input
              prefix={ <Icon type='lock' /> } 
              type="password"
              size="large"
              placeholder="请输入密码"
              allowClear/>
          )}
        </Form.Item>
        {/* <Form.Item> */}
          <Button type="primary" htmlType="submit" block size="large">
            登录
          </Button>
        {/* </Form.Item> */}
      </Form>
    )
    
  }
}

const WrappedLogin = Form.create()(LoginForm)

class BottomBar extends React.Component{
  clickRegist = () => {
    this.props.history.push('/regist')
  }
  render() {
    return (
      <div className="bottom-bar">
        <Button type="link" size="small" onClick={ this.clickRegist }>免费注册</Button>
        <Button type="link" size="small">忘记密码？</Button>
        <div className="right">
          <Button icon="wechat" >微信登录</Button>
          <Button icon="qq" >QQ登录</Button>
        </div>
      </div>

    )
  }
    
  
}

export default class Login extends React.Component {
  render () {
    return (
      <div className='login'>
        <div className="main">
          <div className="logo-banner">
            <img src={require('@img/logo-banner.png')} alt="logo"/>
          </div>
          <WrappedLogin { ...this.props } />
          <BottomBar history={ this.props.history } />
        </div>
      </div>
    )
  }
}
