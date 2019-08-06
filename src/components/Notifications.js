import React from 'react';
import '../App.css';

import SearchResult from './elements/SearchResult.js';


class Notifications extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            search_results: [],
        }

        this.body = React.createRef();
        this.delete_request = this.delete_request.bind(this);
        this.add_connection = this.add_connection.bind(this);
    }

    componentDidMount(){
        if(!this.props.get_online_status){
            this.body.current.innerHTML = `
                <div class="offline-content">
                    <img src="" class="icon"/>
                    <h1>Oops!</h1>
                    <p>Looks like you're offline.</p>
                </div>
            `;
        } else {
            this.get_requests();
        }
    }

    async get_requests(){
        let resp = await fetch("http://127.0.0.1:8000/api/requests", {
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
        } else {
            this.setState({
                search_results: resp,
            });
        }
        
    }

    async add_connection(index){

        let resp = await fetch("http://127.0.0.1:8000/api/connections", {
                method: 'POST',
                withCredentials: true,
                body: JSON.stringify({
                    "connected_user": index
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
            console.log("Delete Error:" + error);
        });

        console.log(resp);

        if(resp == undefined){
            return false;
        } else {
            this.get_requests();
        }
        
    }

    async delete_request(index){

        let resp = await fetch("http://127.0.0.1:8000/api/requests", {
                method: 'DELETE',
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
            console.log("Delete Error:" + error);
        });

        console.log(resp);

        if(resp == undefined){
            return false;
        } else {
            this.get_requests();
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
            search_results.push(<SearchResult key={i} user={this.state.search_results[i]} mentor={this.state.search_results[i].mentor_subject == this.get_account_info().mentee_subject}
            mentee={this.state.search_results[i].mentee_subject == this.get_account_info().mentor_subject} 
            remove_request={this.delete_request} accept_request={this.add_connection}/>);
        }

        return(
            <section className="Notifications screen">
                <section className="head">
                    <div className="container">
                        <p>Notifications</p>
                    </div>
                </section>
                <section className="body" ref={this.body}>
                    {search_results}
                </section>
            </section>
        )
    }
}

export default Notifications;