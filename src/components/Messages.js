import React from 'react';
import '../App.css';
import { Link, NavLink } from 'react-router-dom';

import SearchResult from './elements/SearchResult.js';


class Notifications extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            conversations: [],
            users: [],
            messages: []
        }

        this.body = React.createRef();
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
            this.get_conversations();
        }
    }

    async get_conversations(){
        let resp = await fetch("http://127.0.0.1:8000/api/conversations", {
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
            console.log("GET Error:" + error);
        });

        // TODO: Convert conversation id's into the users they belong to. use the searchcontroller to do this.
        console.log(resp);



        if(resp == undefined){
            return false;
        } else {
            this.setState({
                conversations: resp.conversations,
                users: resp.users,
                messages: resp.messages
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

        let conversations = [];

        for(let i = 0; i < this.state.users.length; i++){
            conversations.push(
            <NavLink to="/conversation" key={i}>
                <SearchResult set_active_conversation={this.props.set_active_conversation} conversation_id={this.state.conversations[i].id} user={this.state.users[i]} message={this.state.messages[i]}/>
            </NavLink>);
        }

        return(
            <section className="Notifications screen">
                <section className="head">
                    <div className="container">
                        <p>Messages</p>
                    </div>
                </section>
                <section className="body" ref={this.body}>
                    {conversations}
                </section>
            </section>
        )
    }
}

export default Notifications;