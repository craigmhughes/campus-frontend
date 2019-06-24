import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// Components
import LoginScreen from './components/LoginScreen';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      signed_in: false,
    }

    this.check_signin();
  }

  check_signin(){

    let subdomain = window.location.href.split(window.location.host)[1];

    if(this.state.signed_in == false && subdomain !== "/signin"){
      window.location.href = "/signin";
    }
  }

  render(){

    return(
      <div className="App">
        <Router>

          <Route path="/signin" exact component={LoginScreen} />
        
        </Router>
      </div>
    );
  }
}

export default App;
