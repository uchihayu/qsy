import React, { Component } from "react";
import { Button, Form, Input, Icon , Row, Col, message } from "antd";
import './index.less'

const INTERVAL_CODE = 30

class FormRegist extends Component {
  
  state = {
    disableSendCode: false,
    timeDisableCode: INTERVAL_CODE
  }
  handleSendCode = (e) => {
    message.success('已发送验证码，请注意查收。')
    this.setState({
      disableSendCode: true,
      timeDisableCode: INTERVAL_CODE
    })
    const timerDisable = setInterval(() => {
      if(this.state.timeDisableCode <= 0) {
        clearTimeout(timerDisable)
        this.setState({
          disableSendCode: false,
          timeDisableCode: INTERVAL_CODE
        })
      } else {
        this.setState({
          timeDisableCode: this.state.timeDisableCode -1
        })
      }
    }, 1000);
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if(!err) {
        message.info('校验通过')
      }
    })
  }
  
  render() {
    const { getFieldDecorator } = this.props.form
    const layoutForm = {
      labelCol: { span: 0 },
      wrapperCol: { span: 24 }
    }
    const rulesPhone = [
      {required: true, message:'手机号不能为空'},
      {pattern: /1[3-9]\d{9}/, message:'手机号为11位'},
    ]
    const rulesCode = [
      {required: true, message:'验证码不能为空'}
    ]
    const rulesPwd = [
      {required: true, message:'密码不能为空',},
      {min: 6, message: '长度至少为6'}
    ]

    return (
      <Form {...layoutForm} onSubmit={ this.handleSubmit } className="form-area">
        <Form.Item >
          {getFieldDecorator('phone', {
            rules: rulesPhone,
            validateTrigger: 'onBlur'
          })(
            <Input prefix={ <Icon type="phone" /> } size="large" placeholder="请输入手机号" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('verificationCode', {
            rules: rulesCode,
            validateTrigger: 'onBlur'
          })(
          <Row>
            <Col span={14}>
              <Input prefix={ <Icon type="code" /> } size="large" placeholder="请输入验证码" />
            </Col>
            <Col span={9} offset={1}>
              <Button type="primary" block size="large" disabled={this.state.disableSendCode} onClick={ this.handleSendCode }>
                {this.state.disableSendCode ? this.state.timeDisableCode + ' 秒后重新发送' : '发送验证码'}
              </Button>
            </Col>
          </Row>
          )}
        </Form.Item>
        <Form.Item >
          {getFieldDecorator('password', {
            rules: rulesPwd,
            validateTrigger: 'onBlur'
          })(
            <Input type="password" prefix={ <Icon type="key" /> } size="large" placeholder="请输入密码" />
          )}
        </Form.Item>
        <Button type="primary" size="large" block htmlType="submit">注册</Button>
      </Form>
    )
  }
}

const WrappedFormRegist = Form.create()(FormRegist)

export default class Regist extends Component {
  clickBackLogin = () => {
    this.props.history.push({ pathname:'/login' })
  }
  render () {
    return (
      <div className='regist'>
        <div className="main">
          <div className="logo-banner">
            <img src={require('@img/logo-banner.png')} alt="logo"/>
          </div>
          <div>
            <WrappedFormRegist className="form-area" />
          </div>
          <div className="back-login">
            <Button type="link" size="small" onClick={ this.clickBackLogin }>返回登录</Button>
            <div style={{lineHeight:'40px', color: '#aaa'}}>
              <Icon type="info-circle" style={{marginRight: '10px', color: '#ff6700'}}  />
              本页为管理员注册入口，学员注册入口请联系管理员获取入口链接
            </div>
          </div>
        </div>
      </div>
    )
  }
}