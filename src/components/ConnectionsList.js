import React from 'react';
import '../App.css';

import SearchResult from './elements/SearchResult.js';


class ConnectionsList extends React.Component {
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
                    <img src="" class="icon"/>
                    <h1>Oops!</h1>
                    <p>Looks like you're offline.</p>
                </div>
            `;
        } else {
            this.get_connections();
        }
    }

    async get_connections(){
        let resp = await fetch("http://127.0.0.1:8000/api/connections", {
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
            console.log(1);
            search_results.push(<SearchResult key={i} user={this.state.search_results[i]} mentor={this.state.search_results[i].mentor_subject == this.get_account_info().mentee_subject}
            mentee={this.state.search_results[i].mentee_subject == this.get_account_info().mentor_subject}/>);
        }

        return(
            <section className="ConnectionsList screen">
                <section className="head">
                    <div className="container">
                        <p>My Study Group</p>
                    </div>
                </section>
                <section className="body" ref={this.body}>
                    {search_results}
                </section>
            </section>
        )
    }
}

export default ConnectionsList;