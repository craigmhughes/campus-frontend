import React from 'react';
// import logo from '../images/logo.svg';
import '../App.css';

// Custom Icons
import HomeIcon from '../images/icons/light/home.svg';
import MessageIcon from '../images/icons/light/message-square.svg';
import SearchIcon from '../images/icons/light/search.svg';
import PlusIcon from '../images/icons/light/plus.svg';
import UserIcon from '../images/icons/light/user.svg';
import OfflineIcon from '../images/icons/wifi-off.svg';

class HomeScreen extends React.Component {
    constructor(props){
        super(props);

        this.body = React.createRef();
    }

    /**
     * TODO: 
     *  -   Implement logout
     *  -   Create navbar
     *  -   Fix single page transition between Login & home
     */

    componentDidMount(){

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
        
        console.log('Success:', JSON.stringify(response));

        }).catch((error) => {
            this.props.set_online_status(false);
            console.log("Offline Mode");

            this.body.current.innerHTML = `
                <div class="offline-content">
                    <img src="${OfflineIcon}" class="icon"/>
                    <h1>Oops!</h1>
                    <p>Looks like you're offline.</p>
                </div>
            `;
        });

    }

        
    render(){
        return(
            <main className="HomeScreen">
                <section className="body" ref={this.body}>

                </section>
                <nav id="navigation">
                    <div className="container">
                        <img src={HomeIcon} className="nav-icon"/>
                        <img src={SearchIcon} className="nav-icon"/>
                        <img src={PlusIcon} className="nav-icon" id="new-post"/>
                        <img src={MessageIcon} className="nav-icon"/>
                        <img src={UserIcon} className="nav-icon"/>
                    </div>
                </nav>
            </main>
        )
    }
}

export default HomeScreen;