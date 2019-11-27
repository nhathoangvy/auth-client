import React from 'react'
import baseControlUrl from '../api/base.js'
import Headers from './Headers.js'

class Edit extends React.Component{
    constructor() {
        super();
    }
    componentDidMount() {
        if (typeof(Storage) == "undefined") {
            alert("please use update your browser")
        }
        var auth = localStorage.getItem('authorization');
        if(typeof(auth) == "undefined" || !auth){
            localStorage.removeItem('authorization');
            window.location.href = '/auth-client/login';
        }else {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', baseControlUrl + 'user/info', false);
            xhr.setRequestHeader("Authorization", auth)
            xhr.onreadystatechange = function() {
                var result;
                if(this.readyState == 4) {
                    if (this.status == 200) {
                        try {
                            result = JSON.parse(this.responseText);
                            if(result.id) document.getElementById("id").innerHTML = result.Id;
                            if(result.Profile.Fullname) document.getElementById("name").value = result.Profile.Fullname;
                            if(result.Profile.Phone) document.getElementById("phone").value = result.Profile.Phone;
                            if(result.Profile.Email) document.getElementById("email").value = result.Profile.Email;
                            if(result.Profile.Password) document.getElementById("password").value = result.Profile.Password;
                        }catch (e) {
                            result = null
                        }
                    }else {
                        localStorage.removeItem('authorization');
                        var result;
                        try {
                            result = JSON.parse(this.responseText);
                        } catch (e) {
                            result = null
                        }
                        window.location.href = '/auth-client/login';
                    }
                    if (!result) {
                        window.location.href = '/auth-client/login';
                    }
                }
            };
            xhr.send();
        }
    }

    update() {
        var auth = localStorage.getItem('authorization');
        if(typeof(auth) == "undefined" || !auth){
            localStorage.removeItem('authorization');
            window.location.href = '/auth-client/login';
        }
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

        if(!phone && !password && !email && !fullname) {
            alert("Info not change anything")
        }else {
            var xhr = new XMLHttpRequest();
            xhr.open('PUT', baseControlUrl + 'user/update', false);
            xhr.setRequestHeader("Authorization", auth)
            xhr.onreadystatechange = function() {
                var result;
                if(this.readyState == 4) {
                    if (this.status == 200) {
                        try {
                            result = JSON.parse(this.responseText);
                        } catch (e) {
                            result = null
                        }
                    }else {
                        localStorage.removeItem('authorization');
                        var result;
                        try {
                            result = JSON.parse(this.responseText);
                        } catch (e) {
                            result = null
                        }
                        window.location.href = '/auth-client/login';
                    }
                    if (!result) {
                        window.location.href = '/auth-client/login';
                    }else {
                        alert(result.message);
                        window.location.href = '/auth-client';
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
        Edit ! 
        <ul>
            <li id="id"></li>
            <li><input id="name"/></li>
            <li><input id="phone"/></li>
            <li><input id="email"/></li>
            <li><input id="password"/></li>
            <li><button onClick={this.update}>Update</button></li>
        </ul>
        </div>
    )
  }
}

export default Edit