import React from 'react'
import baseControlUrl from '../api/base.js'
import Headers from './Headers.js'

class Login extends React.Component{
    constructor() {
        super();
          
        this.state = {
           data: []
        }
    }

    componentDidMount() {
        if (typeof(Storage) == "undefined") {
            alert("please use update your browser")
        }
        var history = localStorage.getItem('authorization');
        if(history){
            window.location.href = '/auth-client';
        }
        
    }
    login() {
        let formData = new FormData();
        formData.append('phone', document.getElementById('phone').value);
        formData.append('password', document.getElementById('password').value);

        var xhr = new XMLHttpRequest();
        xhr.open('POST', baseControlUrl + 'signin', true);
        xhr.onreadystatechange = function() {
            var result;
            if(this.readyState == 4) {
                if (this.status == 200) {
                    var auth = this.getResponseHeader("authorization");
                    if (typeof(auth) != "undefined") {
                        try {
                            result = JSON.parse(this.responseText);
                            localStorage.setItem('authorization',auth);
                            window.location.href = '/auth-client';
                        }catch (e) {
                            result = null
                        }
                    }else {
                        result = { message : "error"}
                    }
                }else {
                    var result;
                    try {
                        result = JSON.parse(this.responseText);
                    } catch (e) {
                        result = null
                    }
                }
                if (result) alert(result.message);
            }
        };
        xhr.send(formData);
    }


  
  render() 
  {
    return (
        <div id="home">
            {this.props.children || <Headers/>}
            <div id = 'login'>
                <div id = 'form'>
                <label>Phone</label><br/><br/>
                <input id="phone" name="phone"/><br/><br/>
                <label>Password</label><br/><br/>
                <input type="password" id="password" name="password"/>
                </div><br/><br/>
                <a onClick={this.login}>Login</a>
                <a href="/auth-client/register">Register</a>
            </div>
        </div>
    )
  }
}

export default Login