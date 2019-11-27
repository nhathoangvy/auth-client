import React from 'react'
import { render } from 'react-dom'

import App from './modules/App'
import Login from './modules/Login'
import Register from './modules/Register'
import Edit from './modules/Edit'

let rootElement = document.getElementById('app')

import { Router, Route, browserHistory } from 'react-router'

render(
  <Router history={browserHistory}>
    <Route path="/" component={App} />
    <Route path="/register" component={Register}/>
    <Route path="/edit" component={Edit}/>
    <Route path="/login" component={Login}/>
  </Router>,
	
   rootElement
)