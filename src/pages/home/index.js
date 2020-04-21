import React from "react";
import { Layout } from "antd";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import {get} from '@/api/ajax'

import ExamManage from "@/pages/exam/ExamManage.js";

const { Header, Sider, Content } = Layout
export default class Home extends React.Component {
  componentDidMount() {
    get('/login/checkLogin')
      .then(response => {
      })
  }
  render() {
    return (
      <Layout style={{height:' 100%'}}>
        <Header>
          顶部导航
        </Header>
        <Layout>
          <Sider width={200}>
            侧边导航
          </Sider>
          <Content>
            内容区
            <Router>
              <Switch>
                <Route path="/exam/exam" component={ExamManage}></Route>
                <Redirect to="/exam/exam"></Redirect>
              </Switch>
            </Router>
          </Content>
        </Layout>
      </Layout>
    )
  }
}