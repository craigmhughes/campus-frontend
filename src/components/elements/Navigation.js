import React from 'react';
import '../../App.css';

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

        this.navMenu = React.createRef();
        this.navOverlay = React.createRef();
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
                <div id="nav-overlay" className="nav-overlay" ref={this.navOverlay} onClick={this.toggleMenu.bind(this)}>
                    <nav className="nav-menu" ref={this.navMenu} onClick={()=>{}}>
                        <div className="container">
                            <section className="head">
                                <h1 id="nav-username">Account Settings</h1>
                                <img src={NullProfileImage} id="nav-profile-img"/>
                            </section>
                            <section className="body">
                                <p className="logout"><i className="fas fa-sign-out-alt"></i>Sign out</p>
                            </section>
                        </div>
                    </nav>
                </div>

                <nav id="navigation">
                    <div className="container">
                        <img src={HomeIcon} className="nav-icon"/>
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