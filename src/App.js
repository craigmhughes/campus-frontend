import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

// Components
import Navigation from './components/elements/Navigation';
import AuthScreen from './components/Auth/AuthScreen';
import HomeScreen from './components/Home';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      signed_in: false,
      online: true,
    }

    this.set_online_status = this.set_online_status.bind(this);
    this.get_online_status = this.get_online_status.bind(this);
  }

  componentDidMount(){
    this.check_signin();
  }


  /**
   * 
   * @param {Boolean} status = if app is online or not
   */
  set_online_status(status){
    this.setState({
      online: status
    });

    this.check_signin();

    console.log("Set online status to: " + this.state.online);
  }

  /**
   * @return {Boolean} this.state.online
   */
  get_online_status(){
    return this.state.online;
  }

  check_signin(){

    // Get subdomain url
    let subdomain = window.location.href.split(window.location.host)[1];

    if(localStorage.getItem("AUTH") !== null && this.state.online){
      this.setState({
        signed_in: true
      });
    } else {
      if(this.state.signed_in === false && subdomain !== "/signin"){
        window.location.href = "/signin";
      }
    }

    
  }

  

  render(){

    return(
      <div className="App">
        
        <Router>
          <Route path="/">
            <div>
              <Switch>
                
                <Route path="/" render={()=>(
                  <HomeScreen set_online_status={this.set_online_status} get_online_status={this.get_online_status} />
                )} />

              </Switch>

              <Navigation/>
            </div>
          </Route>

          <Route path="/signin" exact component={AuthScreen} />
        </Router>
      </div>
    );
  }
}

export default App;
