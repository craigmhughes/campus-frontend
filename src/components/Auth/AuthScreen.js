import React from 'react';
import logo from '../../images/logo.svg';
import '../../App.css';

import GradientBG from '../../images/gradient-bg2.svg';
import xcircle from '../../images/icons/x-circle.svg';

class AuthScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      auth_screen: 0
    }

    this.footer_el = React.createRef();
    this.back_el = React.createRef();
    this.login_form = React.createRef();
    this.signup_form = React.createRef();
    this.signup_screen = React.createRef();
  }

  toggle_signup(){

    if(this.signup_screen.current.className.includes("hidden")){
      this.signup_screen.current.className = this.signup_screen.current.className.replace("hidden", "");
    } else {
      this.signup_screen.current.className += " hidden";
    }
  }


  signin(){
    let mail = document.getElementsByName("login-mail")[0].value;
    let password = document.getElementsByName("login-pass")[0].value;

    if(mail.length < 4 || password < 1){
      return false;
    }

    fetch("http://127.0.0.1:8000/api/auth/login", {
      method: 'POST',
      body: JSON.stringify({
        email: mail,
        password: password
      }),
      headers:{
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      }
    }).then(res => res.json())
    .then((response) => {
      
      console.log('Success:', JSON.stringify(response));

      if(response.access_token.length > 0){
        this.assign_token(response.access_token);

      } else {
        this.login_error("Invalid Login");
        return;
      }
      
      window.location.href = "/";

    }).catch((error) => {
      this.login_error("Invalid Login");
    });

  }

  signup(){
    let name = document.getElementsByName("register-name")[0].value;
    let mail = document.getElementsByName("register-mail")[0].value;
    let password = document.getElementsByName("register-pass")[0].value;
    let passwordConfirm = document.getElementsByName("register-pass-confirm")[0].value;

    if(password !== passwordConfirm){
      this.signup_error("Passwords don't match");
      return false;
    }

    if(mail.length < 4 || password < 6){
      return false;
    }

    /*run logout before returning new account info.
      A user may delete localstorage items returning them to the 
      authscreen but shows other user's information.*/
    this.props.logout(true);

    fetch("http://127.0.0.1:8000/api/auth/register", {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        email: mail,
        password: password,
        password_confirmation: passwordConfirm
      }),
      headers:{
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      }
    }).then(res => res.json())
    .then((response) => {
      
      console.log('Success:', JSON.stringify(response));

      if(response.access_token.length > 0){
        this.assign_token(response.access_token);

      } else {
        this.signup_error("Issue with registering");
        return;
      }
      
      window.location.href = "/";

    }).catch((error) => {
      this.signup_error("Issue with registering");
    });

  }

  signup_error(err){
    document.getElementById("register-error").innerText = err;
    document.getElementById("register-error").style.opacity = 1;
    document.getElementById("register-error").style.bottom = "5em";
  }

  login_error(err){
    document.getElementById("login-error").innerText = err;
    document.getElementById("login-error").style.opacity = 1;
    document.getElementById("login-error").style.bottom = "5em";
  }

  assign_token(token){
    localStorage.setItem("AUTH", token);
  }


  render(){
    return(
      <section className="AuthScreen">

        <div className="signup-screen hidden" ref={this.signup_screen}>
          <div className="head" onClick={()=>{this.toggle_signup()}}>
            <img src={xcircle}></img>
            <p>Back to Sign in</p>
          </div>

          <div className="body">
            <div className="intro">
              <h1>New here?</h1>
              <p>Let's get you set up</p>
            </div>

            <div className="signup-form" ref={this.signup_form}>
              <div className="input-item">
                <label to="register-name">Full name</label>
                <input name="register-name" type="text"></input>
              </div>
              <div className="input-item">
                <label to="register-mail">E-Mail Address</label>
                <input name="register-mail" type="text"></input>
              </div>
              <div className="input-item">
                <label to="register-pass">Password</label>
                <input name="register-pass" type="password"></input>
              </div>
              <div className="input-item">
                <label to="register-pass-confirm">Password Confirm</label>
                <input name="register-pass-confirm" type="password"></input>
              </div>

              <p id="register-error"></p>
            </div>
          </div>
          <div className="footer">
            <button className="btn btn-primary" onClick={()=>{this.signup()}}>Sign Up</button>
          </div>
        </div>
        

        <img src={GradientBG} id="gradient-bg"></img>

        <div className="header">
          <div className="logo-container">
            <img src={logo} className="logo logo-light"/>
            <p className="logo-text">campuschat</p>
          </div>
        </div>
        <div className="body">

          <div className="intro">
            <h1>Hello!</h1>
            <p>Sign in to get started</p>
          </div>

          <div className="login-form" ref={this.login_form}>
            <div className="input-item">
              <label to="login-mail">E-Mail Address</label>
              <input name="login-mail" type="email"></input>
            </div>
            <div className="input-item">
              <label to="login-pass">Password</label>
              <input name="login-pass" type="password"></input>
            </div>
            
            <p id="login-error"></p>
          </div>
        </div>
        <div className="footer" ref={this.footer_el}>
          
          <button className="btn btn-primary btn-light" onClick={()=>{this.signin()}}>Sign In</button>
          <button className="btn btn-secondary btn-light" onClick={()=>{this.toggle_signup()}}>Don't have an account? Sign Up</button>
          
        </div>
      </section>
    );
  }
}

export default AuthScreen;