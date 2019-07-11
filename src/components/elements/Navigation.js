import React from 'react';
import '../../App.css';
import Link from "react-router-dom";

// Custom Icons
import HomeIcon from '../../images/icons/light/home.svg';
import MessageIcon from '../../images/icons/light/message-square.svg';
import SearchIcon from '../../images/icons/light/search.svg';
import PlusIcon from '../../images/icons/light/plus.svg';
import UserIcon from '../../images/icons/light/user.svg';

import NullProfileImage from '../../images/nullprofile.png';

class Navigation extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            hasInfo: this.props.hasinfo
        };

        this.navMenu = React.createRef();
        this.navOverlay = React.createRef();
        this.username = React.createRef();
        this.userimage = React.createRef();
    }

    componentDidMount(){
        this.checkInformation();
    }

    shouldComponentUpdate(){
        this.checkInformation();
        return true;
    }

    checkInformation(){
        if(!localStorage.getItem("accountInfo")){
            return false;
        }

        let accountInfo = JSON.parse(localStorage.getItem("accountInfo"));

        this.username.current.innerText = accountInfo.name;

        this.userimage.current.src = "http://localhost:8000/" + accountInfo.profile_image;
    }

    toggleMenu(e){

        if(e.target.className.includes("nav-icon") || e.target.className.includes("nav-overlay")){
            this.navMenu.current.className = this.navMenu.current.className.includes("hidden") ? 
            "nav-menu" : "nav-menu hidden";

            this.navOverlay.current.className = this.navOverlay.current.className.includes("hidden") ? 
            "nav-overlay" : "nav-overlay hidden";
        } 
    }
        
    render(){
        return(
            <div>
                <div id="nav-overlay" className="nav-overlay hidden" ref={this.navOverlay} onClick={this.toggleMenu.bind(this)}>
                    <nav className="nav-menu hidden" ref={this.navMenu} onClick={()=>{}}>
                        <div className="container">
                            <section className="head">
                                <h1 ref={this.username}>Menu</h1>
                                <img src={NullProfileImage} id="nav-profile-img" ref={this.userimage}/>
                            </section>
                            <section className="body">
                                <ul className="option-list">
                                    <li onClick={()=>{window.location.href="/account-settings"}}><i className="fas fa-cog"></i> Account Settings</li>
                                </ul>
                                <p className="logout" onClick={this.props.logout}><i className="fas fa-sign-out-alt"></i>Sign out</p>
                            </section>
                        </div>
                    </nav>
                </div>

                <nav id="navigation">
                    <div className="container">
                        <img src={HomeIcon} className="nav-icon" onClick={()=>{window.location.href="/"}}/>
                        <img src={SearchIcon} className="nav-icon"/>
                        <img src={PlusIcon} className="nav-icon" id="new-post"/>
                        <img src={MessageIcon} className="nav-icon"/>
                        <img src={UserIcon} className="nav-icon" onClick={this.toggleMenu.bind(this)}/>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Navigation;