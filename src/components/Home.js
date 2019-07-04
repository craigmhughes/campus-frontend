import React from 'react';
// import logo from '../images/logo.svg';
import '../App.css';

// Custom Icons
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
            </main>
        )
    }
}

export default HomeScreen;