import React from 'react';
// import logo from '../images/logo.svg';
import '../App.css';

// icons
import HomeIcon from '../images/icons/light/home.svg';
import MessageIcon from '../images/icons/light/message-square.svg';
import SearchIcon from '../images/icons/light/search.svg';
import PlusIcon from '../images/icons/light/plus.svg';
import UserIcon from '../images/icons/light/user.svg';

class HomeScreen extends React.Component {
    constructor(props){
        super(props);

        this.p = React.createRef();
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

        this.p.current.innerText = "Welcome, " + response.name;

        }).catch((error) => {
            this.props.set_online_status(false);
            console.log("Offline Mode");
        });

    }

        
    render(){
        return(
            <div className="HomeScreen">
                
                <div id="navigation">
                    <div className="container">
                        <img src={HomeIcon} className="nav-icon"/>
                        <img src={SearchIcon} className="nav-icon"/>
                        <img src={PlusIcon} className="nav-icon" id="new-post"/>
                        <img src={MessageIcon} className="nav-icon"/>
                        <img src={UserIcon} className="nav-icon"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomeScreen;