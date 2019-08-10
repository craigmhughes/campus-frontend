import React from 'react';
import '../../App.css';
import { Link, NavLink } from 'react-router-dom';

// Custom Icons
import HomeIcon from '../../images/icons/light/home.svg';
import MessageIcon from '../../images/icons/light/message-square.svg';
import SearchIcon from '../../images/icons/light/search.svg';
import PlusIcon from '../../images/icons/light/plus.svg';
import UserIcon from '../../images/icons/light/user.svg';
import BellIcon from '../../images/icons/light/bell.svg';


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
        this.navbar = React.createRef();

        this.toggleMenu = this.toggleMenu.bind(this);
    }

    componentDidMount(){
        this.checkInformation();
        // this.updateNavigation();
    }

    shouldComponentUpdate(){
        this.checkInformation();
        // this.updateNavigation();
        return true;
    }

    updateNavigation(){
        
        let navicons = this.navbar.current.getElementsByClassName("nav-icon");
        let subdomain = window.location.href.split(window.location.host)[1];
        // Have in order of appearance in navbar. User icon is left out as that brings out overlay.
        let navUrls = ["/search", "/", "/notifications"];
        let hasActiveItem = false;

        navUrls.forEach(url => {
            
            if(url == subdomain){
                hasActiveItem = navUrls.indexOf(url);
            } else {
                navicons[navUrls.indexOf(url)].className = "nav-icon";
            }
        });

        // Exit if none matched
        if(hasActiveItem == false){
            return false;
        }

        navicons[hasActiveItem].className += " active";
        this.navbar.current.className = "has-active";

        

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

        let toggle = false;

        // e is used to force menu toggle. when using the overlay, however, 
        // the target class must be checked as another element could be the target.
        if(e === true){
            toggle = true;

        } else if (e.target.className !== undefined){
            if(e.target.className.includes("nav-icon") || e.target.className.includes("nav-overlay")){
                toggle = true;
            }
        }

        if(toggle){
            // if e, then give a small delay for content load.
            if(e === true){
                setTimeout(()=>{this.runToggle()}, 250);
            } else {
                this.runToggle();
            }
        }
    }

    runToggle(){
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

    testPusher(){
        fetch("http://127.0.0.1:8000/api/sender", {
            method: 'POST',
            withCredentials: true,
            credentials: 'include',
            body: JSON.stringify({
                "message": "hi from frontend"
            }),
            headers:{
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Authorization': 'Bearer ' + localStorage.getItem("AUTH"),
            }
        }).then(res => res.json())
        .then((response) => {

          console.log(response);

        }).catch((error) => {
        });
    }
        
    render(){
        return(
            <div>
                <div id="nav-overlay" className="nav-overlay hidden" ref={this.navOverlay} onClick={this.toggleMenu}>
                    <nav className="nav-menu hidden" ref={this.navMenu} onClick={()=>{}}>
                        <div className="container">
                            <section className="head">
                                <h1 ref={this.username}>Menu</h1>
                                <img src={NullProfileImage} id="nav-profile-img" ref={this.userimage}/>
                            </section>
                            <section className="body">
                                <ul className="option-list">
                                    <li onClick={()=>{this.toggleMenu(true)}}><NavLink to="/connections-list"><i className="fas fa-user"></i> My Study Group</NavLink></li>
                                    <li onClick={()=>{this.toggleMenu(true)}}><NavLink onClick={this.toggleMenu} to="/account-settings"><i className="fas fa-cog"></i> Account Settings</NavLink></li>
                                </ul>
                                <p className="logout" onClick={this.props.logout}><i className="fas fa-sign-out-alt"></i>Sign out</p>
                            </section>
                        </div>
                    </nav>
                </div>

                <nav id="navigation" ref={this.navbar}>
                    <div className="container">
                        <NavLink to="/search"><img src={SearchIcon} className="nav-icon"/><p>Search</p></NavLink>
                        {/* <img src={PlusIcon} onClick={()=>{this.testPusher()}} className="nav-icon" id="new-post"/> */}
                        <NavLink to="/messages"><img src={MessageIcon} className="nav-icon"/><p>Messages</p></NavLink>
                        <NavLink to="/notifications"><img src={BellIcon} className="nav-icon"/><p>Notifications</p></NavLink>
                        <a onClick={this.toggleMenu}><img src={UserIcon} className="nav-icon"/></a>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Navigation;