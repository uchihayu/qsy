import React from "react"
import { Button, Form, Input, message } from 'antd'
import './login.css'
import {post} from '@/api/ajax'


class LoginForm extends React.Component {

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
        onSubmit={this.handleSubmit}
      >
        <Form.Item 
          label="用户名"
        >
          {getFieldDecorator('account', {
            rules: rulesAccount,
            validateTrigger: 'onBlur'
          })(
            <Input allowClear/>
          )}
        </Form.Item>
        <Form.Item 
          label="密码"
        >
          {getFieldDecorator('password', {
            rules: rulesPwd,
            validateTrigger: 'onBlur'
          })(
            <Input type="password" allowClear/>
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    )
    
  }
}

const WrappedLogin = Form.create()(LoginForm)

export default class Login extends React.Component {
  render () {
    return (
      <div className='login'>
        <div className="login-block">
          <h2>登录</h2>
          <WrappedLogin/>
        </div>
      </div>
    )
  }
}
