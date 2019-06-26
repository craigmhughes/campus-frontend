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
    this.back_el = React.createRef();
  }

  switch_authscreen(screen){

    console.log(screen);

    this.setState({
      auth_screen: screen
    }, ()=>{

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
    this.switchMenuButtons(0);
  }

  render_signup(){
    this.switchMenuButtons(1);
  }

  render_signin(){
    this.switchMenuButtons(2);
  }

  switchMenuButtons(direction){
    let cc_buttons = this.footer_el.current.childNodes;

    let buttons = direction == 1 ? [0,1] : [1,0];

    console.log(direction);

    
    if (direction > 0){
      // Start button switch
      if (cc_buttons[buttons[0]].className.includes("shrink")) {
        cc_buttons[buttons[0]].className = cc_buttons[buttons[0]].className.replace("shrink", "");
      }

      if(cc_buttons[buttons[1]].className.includes("expand")){
        cc_buttons[buttons[1]].className = cc_buttons[buttons[1]].className.replace("expand", "");
      }
  
      if (!cc_buttons[buttons[0]].className.includes("expand")) {
        cc_buttons[buttons[0]].className += " expand";
      }
  
      if(!cc_buttons[buttons[1]].className.includes("shrink")){
        cc_buttons[buttons[1]].className += " shrink";
      }

      // End button switch

      if(!this.back_el.current.className.includes(" show")){
        this.back_el.current.className += " show";
      }


    } else {

      console.log("here");

      if (cc_buttons[buttons[0]].className.includes("shrink")) {
        cc_buttons[buttons[0]].className = cc_buttons[buttons[0]].className.replace("shrink", "");
      }

      if(cc_buttons[buttons[0]].className.includes("expand")){
        cc_buttons[buttons[0]].className = cc_buttons[buttons[0]].className.replace("expand", "");
      }

      if (cc_buttons[buttons[1]].className.includes("shrink")) {
        cc_buttons[buttons[1]].className = cc_buttons[buttons[1]].className.replace("shrink", "");
      }

      if(cc_buttons[buttons[1]].className.includes("expand")){
        cc_buttons[buttons[1]].className = cc_buttons[buttons[1]].className.replace("expand", "");
      }

      console.log(this.back_el.current.className.includes("show"));
      
      if(this.back_el.current.className.includes("show")){
        this.back_el.current.className = this.back_el.current.className.replace("show", "");
      }

    }
    
  }

  render(){
    return(
      <div className="AuthScreen">

          
          <button id="back-icon" className="" ref={this.back_el} onClick={()=>{this.switch_authscreen(0)}}><i className="material-icons">chevron_left</i><p>back</p></button>

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