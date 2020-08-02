import React from "react"
import { BrowserRouter as Router , Route, Switch, Redirect } from "react-router-dom";

import Login from './pages/login/login'
import Regist from './pages/login/regist'
import MainApp from './pages/home/index'

export default () => (
  <Router>
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/exam" />}></Route>
      <Route path='/exam' component={MainApp}></Route>
      <Route path="/login" exact component={Login} ></Route>
      <Route path="/regist" exact component={Regist} ></Route>
      <Redirect to="/login"></Redirect>
    </Switch>
  </Router>
)
