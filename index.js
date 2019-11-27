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
    <Route path="/auth-client" component={App} />
    <Route path="/auth-client/register" component={Register}/>
    <Route path="/auth-client/edit" component={Edit}/>
    <Route path="/auth-client/login" component={Login}/>
  </Router>,
	
   rootElement
)