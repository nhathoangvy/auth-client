import React, { Component } from 'react'
import Home from './Home.js'
class App extends Component {
   render() {
      return (
          <div>
           {this.props.children || <Home/>}
           </div>
      )
   }
}

export default App