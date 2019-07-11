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

    
    componentDidMount(){
        if(!this.props.get_online_status){
            this.body.current.innerHTML = `
                <div class="offline-content">
                    <img src="${OfflineIcon}" class="icon"/>
                    <h1>Oops!</h1>
                    <p>Looks like you're offline.</p>
                </div>
            `;
        }
    }

        
    render(){
        return(
            <main className="HomeScreen screen">
                <section className="body" ref={this.body}>

                </section>
            </main>
        )
    }
}

export default HomeScreen;