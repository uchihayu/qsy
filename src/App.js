import React from "react";
import logo from "./logo.svg";
import "./App.css";
// import axios from "axios";

function Hello(props) {
  return <p>Hello, {props.name}</p>;
}

function ButtonRequest() {
  function request() {
    // axios.post("http://120.27.214.61:7001/login/login", {
    //   account: "qsy001",
    //   password: "123456",
    // });
    React.$get("login/login", {
      account: "qsy001",
      password: "123456",
    });
  }
  return <button onClick={request}>请求登录</button>;
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Hello name={"Betty"}></Hello>
        <ButtonRequest />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
