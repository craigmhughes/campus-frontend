import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// Components
import AuthScreen from './components/Auth/AuthScreen';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      signed_in: false,
    }

    this.check_signin();
  }

  check_signin(){

    // Get subdomain url
    let subdomain = window.location.href.split(window.location.host)[1];

    if(localStorage.getItem("AUTH") !== null){
      this.setState({
        signed_in: true
      });
    }

    if(this.state.signed_in == false && subdomain !== "/signin"){
      window.location.href = "/signin";
    }
  }

  

  render(){

    return(
      <div className="App">
        
        <Router>
          <Route path="/signin" exact component={AuthScreen} />
        </Router>
      </div>
    );
  }
}

export default App;
