import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css'
import './index.css';
import App from './App';
import { get, post } from './api/ajax'
window.$get = get
window.$post = post

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);


