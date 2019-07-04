import React from 'react';
import '../../App.css';

// Custom Icons
import HomeIcon from '../../images/icons/light/home.svg';
import MessageIcon from '../../images/icons/light/message-square.svg';
import SearchIcon from '../../images/icons/light/search.svg';
import PlusIcon from '../../images/icons/light/plus.svg';
import UserIcon from '../../images/icons/light/user.svg';

class Navigation extends React.Component {
    constructor(props){
        super(props);
    }
        
    render(){
        return(
            <nav id="navigation">
                <div className="container">
                    <img src={HomeIcon} className="nav-icon"/>
                    <img src={SearchIcon} className="nav-icon"/>
                    <img src={PlusIcon} className="nav-icon" id="new-post"/>
                    <img src={MessageIcon} className="nav-icon"/>
                    <img src={UserIcon} className="nav-icon"/>
                </div>
            </nav>
        )
    }
}

export default Navigation;