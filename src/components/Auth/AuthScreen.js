import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import '../../App.css';

class AuthScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      auth_screen: 0
    }

    this.footer_el = React.createRef();
  }

  switch_authscreen(screen){

    this.setState({
      auth_screen: screen
    }, ()=>{

      let cc_buttons = this.footer_el.current.childNodes;

      switch(this.state.auth_screen){
        case 0:
          this.render_menu();
          break;
        case 1:
          this.render_signup();
          break;
        case 2:
          this.render_signin();
          break;
      }
    });

  }

  render_menu(){
    
  }

  render_signup(){

  }

  render_signin(){

  }

  render(){
    return(
      <div className="AuthScreen">

          <i className="far fa-chevron-left" id="back-icon" onClick={()=>{this.switch_authscreen(0)}}/>

          <div className="header">
            {/* <img src="./images/logo.svg" className="logo logo-light"/> */}
            <p className="logo-text">campuschat</p>
          </div>
          <div className="body">
            <div className="login-form">
              <h1>Login</h1>
              <input name="login-mail" placeholder="E-Mail Address" type="email"></input>
              <input name="login-pass" placeholder="Password" type="password"></input>
            </div>

            <div className="signup-form">
              <h1>Signup</h1>
              <input name="register-mail" placeholder="E-Mail Address" type="email"></input>
              <input name="register-pass" placeholder="Password" type="password"></input>
            </div>
          </div>
          <div className="footer" ref={this.footer_el}>
            
              <button className="btn btn-secondary btn-light btn-left" onClick={()=>{this.switch_authscreen(1)}}>Sign Up</button>
              <button className="btn btn-primary btn-light" onClick={()=>{this.switch_authscreen(2)}}>Log In</button>
            
          </div>
      </div>
    );
  }
}

export default AuthScreen;