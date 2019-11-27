import React from 'react'
import baseControlUrl from '../api/base.js'
import Headers from './Headers.js'

class Home extends React.Component{
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
                            if(result.Profile.Fullname) document.getElementById("name").innerHTML = result.Profile.Fullname;
                            if(result.Profile.Phone) document.getElementById("phone").innerHTML = result.Profile.Phone;
                            if(result.Profile.Email) document.getElementById("email").innerHTML = result.Profile.Email;
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

    logout() {
        var auth = localStorage.getItem('authorization');
        if(typeof(auth) == "undefined" || !auth){
            localStorage.removeItem('authorization');
            window.location.href = '/auth-client/login';
        }else {
            var xhr = new XMLHttpRequest();
            xhr.open('DELETE', baseControlUrl + 'user/signout', false);
            xhr.setRequestHeader("Authorization", auth)
            xhr.onreadystatechange = function() {
                var result;
                if(this.readyState == 4) {
                    if (this.status == 200) {
                        try {
                            result = JSON.parse(this.responseText);
                        }catch (e) {
                            result = null
                        }
                    }else {
                        try {
                            result = JSON.parse(this.responseText);
                        } catch (e) {
                            result = null
                        }
                    }
                    localStorage.removeItem('authorization');
                    if (!result) {
                        window.location.href = '/auth-client/login';
                    }
                }
            };
            xhr.send();
        }
    }
  render() 
  {
    return (
        <div id="home">
            {this.props.children || <Headers/>}
        Welcome ! 
        <ul>
            <li id="id"></li>
            <li id="name"></li>
            <li id="phone"></li>
            <li id="email"></li>
        </ul>
        <a href="/auth-client/edit">Edit</a>
        <a onClick={this.logout}>Logout</a>
        </div>
    )
  }
}

export default Home