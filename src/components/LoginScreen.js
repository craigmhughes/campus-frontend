import React from 'react';
import '../App.css';

class LoginScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {

    }
  }

  render(){
    return(
      <div className="LoginScreen">
          <div className="header">
            <img src="./images/logo.svg" className="logo logo-light"/>
          </div>
      </div>
    );
  }
}

export default LoginScreen;