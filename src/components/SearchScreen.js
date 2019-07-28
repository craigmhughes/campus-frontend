import React from 'react';
import '../App.css';

import SearchResult from './elements/SearchResult.js';

// Custom Icons
import OfflineIcon from '../images/icons/wifi-off.svg';

class SearchScreen extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            search_results: [],
        }

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
        } else {
            this.search();
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
        if(resp.success !== undefined){
            this.setState({
                search_results: resp.success,
            });
        }
        
    }

    /**
     *  Shorthand for JSON.parse()
     *
     * @returns JSON of stored account information.
     * @memberof AccountSettings
     */
    get_account_info(){
        return JSON.parse(localStorage.getItem("accountInfo"));
    }

        
    render(){

        let search_results = [];

        for(let i = 0; i < this.state.search_results.length; i++){
            search_results.push(<SearchResult user={this.state.search_results[i]} mentor={this.state.search_results[i].mentor_subject == this.get_account_info().mentee_subject}
            mentee={this.state.search_results[i].mentee_subject == this.get_account_info().mentor_subject}/>);
        }

        return(
            <main className="SearchScreen screen">
                <div className="container">
                    <section className="body" ref={this.body}>
                        {/* <button onClick={()=>{this.search()}}>Search</button> */}
                        {search_results}
                    </section>
                </div>
            </main>
        )
    }
}

export default SearchScreen;