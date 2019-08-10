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
        this.add_request = this.add_request.bind(this);
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

        if(resp == undefined){
            return false;
        }

        if(resp.success !== undefined){
            this.setState({
                search_results: resp.success,
            });
        } else {
            this.setState({
                search_results: [],
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

    async add_request(index){

        let resp = await fetch("http://127.0.0.1:8000/api/requests", {
                method: 'POST',
                withCredentials: true,
                body: JSON.stringify({
                    "requested_user": index
                }),
                credentials: 'include',
                headers:{
                    'Content-Type':'application/json',
                    'Access-Control-Allow-Credentials': true,
                    'Authorization': 'Bearer ' + localStorage.getItem("AUTH"),
        }
        })
        .then(res => res.json())
        .then((response) => { return response})
        .catch((error) => {
            console.log("Add Request Error:" + error);
        });

        console.log(resp);

        if(resp == undefined){
            return false;
        }

        this.search();
        
    }

        
    render(){

        let search_results = [];

        for(let i = 0; i < this.state.search_results.length; i++){
            search_results.push(<SearchResult key={i} user={this.state.search_results[i]} mentor={this.state.search_results[i].mentor_subject == this.get_account_info().mentee_subject}
            mentee={this.state.search_results[i].mentee_subject == this.get_account_info().mentor_subject} 
            add_request={this.add_request} requested={false}/>);
        }

        return(
            <main className="SearchScreen screen">
                <div className="container">
                    <section className="body" ref={this.body}>
                        {search_results}
                    </section>
                </div>
            </main>
        )
    }
}

export default SearchScreen;