import React from 'react';
// import logo from '../images/logo.svg';
import '../App.css';

// Custom Icons
import OfflineIcon from '../images/icons/wifi-off.svg';

class SearchScreen extends React.Component {
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

    async search(){
        let resp = await fetch("http://127.0.0.1:8000/api/search/users", {
                method: 'GET',
                withCredentials: true,
                credentials: 'include',
                headers:{
                    'Access-Control-Allow-Credentials': true,
                    'Authorization': 'Bearer ' + localStorage.getItem("AUTH"),
        }
        })
        .then(res => res.json())
        .then((response) => { return response})
        .catch((error) => {
            console.log("Update Error:" + error);
        });

        console.log(resp);
    }

        
    render(){
        return(
            <main className="SearchScreen screen">
                <section className="body" ref={this.body}>
                    <button onClick={()=>{this.search()}}>Search</button>
                </section>
            </main>
        )
    }
}

export default SearchScreen;