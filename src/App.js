import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";

// Components
import Navigation from './components/elements/Navigation';
import AuthScreen from './components/Auth/AuthScreen';
import HomeScreen from './components/Home';
import SearchScreen from './components/SearchScreen';
import AccountSettings from './components/AccountSettings';
import ConnectionsList from './components/ConnectionsList';
import Notifications from './components/Notifications';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      signed_in: false,
      online: true,
      hasAccountInfo: false,
    }

    this.set_online_status = this.set_online_status.bind(this);
    this.get_online_status = this.get_online_status.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentWillMount(){
    this.check_signin();
  }


  /**
   * 
   * 
   * @param {Boolean} status = if app is online or not
   */
  set_online_status(status){
    this.setState({
      online: status
    });

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

    if(localStorage.getItem("AUTH") !== null){

      this.setState({
        signed_in: true
      });

      this.getAccountInfo();

    } else {
      if(this.state.signed_in === false && subdomain !== "/signin"){
        window.location.href = "/signin";
      }
    }

    
  }

  getAccountInfo(){

    if(localStorage.getItem("accountInfo") !== null){
      this.setState({
        hasAccountInfo: true
      });
      // return false;
    }

    fetch("http://127.0.0.1:8000/api/auth/me", {
        method: 'POST',
        withCredentials: true,
        credentials: 'include',
        headers:{
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true,
            'Authorization': 'Bearer ' + localStorage.getItem("AUTH"),
        }
        }).then(res => res.json())
        .then((response) => {

          console.log(response);

            localStorage.setItem("accountInfo", JSON.stringify({
                name:response.name,
                email:response.email,
                uni_name:response.uni_name,
                mentor_subject:response.mentor_subject,
                mentee_subject:response.mentee_subject,
                profile_image:response.profile_image
            }));

            this.setState({
              hasAccountInfo: true
            });

        }).catch((error) => {
            // Run functions to remove user data & refresh page
            this.set_online_status(false);
            this.logout();
            window.location.reload();
        });
  }

  logout(checkRegister){

    fetch("http://127.0.0.1:8000/api/auth/logout", {
      method: 'POST',
      withCredentials: true,
      credentials: 'include',
      headers:{
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true,
          'Authorization': 'Bearer ' + localStorage.getItem("AUTH"),
      }
    }).catch((error) => {
          console.log("Logout Error:" + error);
    });

      this.setState({
        signed_in: false
      },()=>{

        localStorage.removeItem("AUTH");
        localStorage.removeItem("accountInfo");

        if(checkRegister){
          this.check_signin();
        }
      });
    
  }

  

  render(){

    return(
      <div className="App">
        
        <Router>
          <Route path="/">
            <div>
              <Switch>

                <Route path="/" exact render={()=>(
                  <HomeScreen set_online_status={this.set_online_status} get_online_status={this.get_online_status} />
                )} />

              </Switch>

              <Route path="/account-settings" render={()=>(
                  <AccountSettings />
              )} />

              <Route path="/connections-list" render={()=>(
                  <ConnectionsList get_online_status={this.get_online_status} />
              )} />

              <Route path="/notifications" render={()=>(
                  <Notifications get_online_status={this.get_online_status} />
              )} />

              <Route path="/search" render={()=>(
                  <SearchScreen set_online_status={this.set_online_status} get_online_status={this.get_online_status} />
              )} />
              
              <Navigation logout={this.logout} hasinfo={this.state.hasAccountInfo} history={this.props.history}/>
            </div>
          </Route>

          <Route path="/signin" render={()=>(
            <AuthScreen logout={this.logout} />
          )} />

        </Router>
      </div>
    );
  }
}

export default App;
