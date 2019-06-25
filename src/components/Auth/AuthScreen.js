import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import '../../App.css';

class AuthScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      auth_screen: 0
    }
  }

  render(){
    return(
      <div className="LoginScreen">

          <div className="header">
            <img src="./images/logo.svg" className="logo logo-light"/>
            <p className="logo-text">campuschat</p>
          </div>
          <div className="body">

          </div>
          <div className="footer">
            
              <a className="cc-button light-secondary">Sign Up</a>
              <a className="cc-button primary right">Log In</a>
            
          </div>
      </div>
    );
  }
}

export default AuthScreen;