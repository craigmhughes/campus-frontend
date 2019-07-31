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
        
        this.userimage.current.src = accountInfo.profile_image == null ? NullProfileImage : "http://localhost:8000/" + accountInfo.profile_image;
    }

    toggleMenu(e){

        if(e.target.className.includes("nav-icon") || e.target.className.includes("nav-overlay")){
            if(this.navMenu.current.className.includes("hidden")){
                this.navMenu.current.className = "nav-menu";
                this.navOverlay.current.className = "nav-overlay";

                document.getElementById("root").className = "active";
            } else {
                this.navMenu.current.className = "nav-menu hidden";
                this.navOverlay.current.className = "nav-overlay hidden";

                document.getElementById("root").className = "";
            }

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
                                    <li onClick={()=>{window.location.href="/connections-list"}}><i className="fas fa-user"></i> My Study Group</li>
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
                        <img src={SearchIcon} className="nav-icon" onClick={()=>{window.location.href="/search"}}/>
                        {/* <img src={PlusIcon} className="nav-icon" id="new-post"/> */}
                        <img src={MessageIcon} className="nav-icon"/>
                        <img src={UserIcon} className="nav-icon" onClick={this.toggleMenu.bind(this)}/>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Navigation;