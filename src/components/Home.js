import React from 'react';
import logo from '../images/logo.svg';
import '../App.css';

class HomeScreen extends React.Component {
    constructor(props){
        super(props);
    }

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

        }).catch(error => console.error('Error:', error));

    }

        
    render(){
        return(
            <div className="HomeScreen">
            </div>
        )
    }
}

export default HomeScreen;