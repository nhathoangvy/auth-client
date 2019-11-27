import React from 'react'
class Headers extends React.Component{
  constructor() {
    super();
  
    this.state = {
       data: []
    }
 }
  
  render() 
  {
    return (
        <h1><a href="/auth-client">Simple app</a></h1>
    )
  }
}

export default Headers