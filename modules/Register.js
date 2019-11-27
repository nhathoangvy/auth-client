import React from 'react'
import baseControlUrl from '../api/base.js'
import Headers from './Headers.js'

class Register extends React.Component{
    constructor() {
        super();
    }
    componentDidMount() {
        if (typeof(Storage) == "undefined") {
            alert("please use update your browser")
        }
    }

    register() {
        let formData = new FormData();
        let phone, password, email, fullname;
        try {
            phone = document.getElementById('phone').value;
            if(typeof(phone) != "undefined" || phone) formData.append('phone', phone);
        }catch(e) {}
        try {
            password = document.getElementById('password').value;
            if(typeof(password) != "undefined" || password) formData.append('password', password);
        }catch (e){}
        try{
            email = document.getElementById('email').value;
            if(typeof(email) != "undefined" || email) formData.append('email', email);
        } catch (e) {}
        try{
            fullname = document.getElementById('name').value;
            if(typeof(fullname) != "undefined" || fullname) formData.append('fullname', fullname);    
        } catch (e) {}

        if(!phone || !password) {
            alert("Please fill full phone and password")
        }else {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', baseControlUrl + 'signup', false);
            xhr.onreadystatechange = function() {
                var result;
                if(this.readyState == 4) {
                    if (this.status == 200) {
                        try {
                            result = JSON.parse(this.responseText);
                            window.location.href = '/login';
                        } catch (e) {
                            result = null
                        }
                    }else {
                        try {
                            result = JSON.parse(this.responseText);
                        } catch (e) {
                            result = null
                        }
                    }
                    if (result) {
                        alert(result.message);
                    }
                }
            };
            xhr.send(formData);
        }
    }
  render() 
  {
    return (
        <div id="home">
            {this.props.children || <Headers/>}
        Register ! 
        <ul>
            <li><input id="name" placeholder="Name"/></li>
            <li><input id="phone" placeholder="Phone"/></li>
            <li><input id="email" placeholder="Email"/></li>
            <li><input id="password" placeholder="Password"/></li>
            <li><button onClick={this.register}>Register</button></li>
        </ul>
        </div>
    )
  }
}

export default Register