import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from '../../images/logo.svg';
import '../../App.css';

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
  }

  
  /**
   * Menu change function. passing value 0 = reset. 1 or 2 = direction.
   * 
   * @param {*} direction = Decides on which order to affect buttons.
   */
  switchMenuButtons(direction){
    let cc_buttons = this.footer_el.current.childNodes;

    let buttons = direction == 1 ? [0,1] : [1,0];

    
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

      if(direction == 1){
        if(this.signup_form.current.className.includes("hidden")){
          this.signup_form.current.className = this.signup_form.current.className.replace(" hidden", "");
        }

        if(!this.login_form.current.className.includes("hidden")){
          this.login_form.current.className += " hidden";
        }

      } else {
        if(this.login_form.current.className.includes("hidden")){
          this.login_form.current.className = this.login_form.current.className.replace(" hidden", "");
        }
        
        if(!this.signup_form.current.className.includes("hidden")){
          this.signup_form.current.className += " hidden";
        }
      }


    } else {

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

      
      if(this.back_el.current.className.includes("show")){
        this.back_el.current.className = this.back_el.current.className.replace(" show", "");
      }

      if(!this.signup_form.current.className.includes("hidden")){
        this.signup_form.current.className += " hidden";
      }

      if(!this.login_form.current.className.includes("hidden")){
        this.login_form.current.className += " hidden";
      }

    }
    
  }

  render(){
    return(
      <div className="AuthScreen">

          
          <button id="back-icon" className="btn btn-secondary btn-light" ref={this.back_el} onClick={()=>{this.switchMenuButtons(0)}}>
            <i className="material-icons">chevron_left</i><p>back</p>
          </button>

          <div className="header">
            <div className="logo-container">
              <img src={logo} className="logo logo-light"/>
              <p className="logo-text">campus<b>chat</b></p>
            </div>
          </div>
          <div className="body">
            
            <div className="signup-form hidden" ref={this.signup_form}>
              <input name="register-name" placeholder="Name" type="text"></input>
              <input name="register-mail" placeholder="E-Mail Address" type="email"></input>
              <input name="register-pass" placeholder="Password" type="password"></input>
              <input name="register-pass-confirm" placeholder="Confirm Password" type="password"></input>
            </div>

            <div className="login-form hidden" ref={this.login_form}>
              <input name="login-mail" placeholder="E-Mail Address" type="email"></input>
              <input name="login-pass" placeholder="Password" type="password"></input>
            </div>
          
          </div>
          <div className="footer" ref={this.footer_el}>
            
              <button className="btn btn-secondary btn-light btn-left" onClick={()=>{this.switchMenuButtons(1)}}>Sign Up</button>
              <button className="btn btn-primary btn-light" onClick={()=>{this.switchMenuButtons(2)}}>Log In</button>
            
          </div>
      </div>
    );
  }
}

export default AuthScreen;