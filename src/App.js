import React from "react"
import { BrowserRouter as Router , Route, Switch, Redirect } from "react-router-dom";

import Login from './pages/login/login.js'
import MainApp from './pages/home/index'

class App extends React.Component {
 
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login} ></Route>
          <Route path='/app' component={MainApp}></Route>
          <Redirect to="/login"></Redirect>
        </Switch>
      </Router>
    )
    
  }
}

export default App
