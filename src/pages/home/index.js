import React from "react";
import { Layout } from "antd";
import { Route, Switch, Redirect } from "react-router-dom";

import TopHeader from '@/layout/TopHeader'
import LeftMenu from '@/layout/LeftMenu'

import {get} from '@/api/ajax'

import ExamManage from "@/pages/exam/ExamManage.js";

const { Content } = Layout

export default class Home extends React.Component {
  componentDidMount() {
    get('/login/checkLogin')
      .then(response => {
      })
  }
  render() {
    return (
      <Layout style={{height:' 100%'}}>
        <TopHeader />
        <Layout>
          <LeftMenu/>
          <Content>
            内容区
              <Switch>
                <Route path="/exam/exams" component={ExamManage}></Route>
                {/* <Route path="/exam" component={ExamManage}></Route> */}
                <Redirect to="/exam/exams"></Redirect>
              </Switch>
          </Content>
        </Layout>
      </Layout>
    )
  }
}