import React from 'react';
import '../App.css';
import { Link, NavLink } from 'react-router-dom';
import NullProfileImage from '../images/nullprofile.png';

class ConversationScreen extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            recipient: [],
            messages: []
        }

        this.get_account_info = this.get_account_info.bind(this);
        this.on_imageerror = this.on_imageerror.bind(this);

        this.body = React.createRef();
        this.user_image = React.createRef();
        this.newMessage = React.createRef();
        this.messageArea = React.createRef();
    }

    componentDidMount(){
        this.get_conversation();
    }

    on_imageerror(){
        this.user_image.current.src = NullProfileImage;
    }

    async get_conversation(){
        let resp = await fetch("http://127.0.0.1:8000/api/conversations/" + this.props.active_conversation, {
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

        if(resp == undefined){
            return false;
        } else {
            this.setState({
                recipient: resp.recipient,
                messages: resp.messages
            });
        }
        
    }

    async send_message(){

        let newMessage = this.newMessage.current.value;

        if(newMessage.length < 1){
            return false;
        }

        let newMessages = this.state.messages;
        newMessages.push({
            "sender_id": this.get_account_info().id,
            "conversation_id": this.props.active_conversation,
            "message": newMessage
        });

        console.log(this.state.messages);
        console.log(newMessages);

        // this.messageArea.current.insertAdjacentHTML
        this.setState({
            messages: newMessages
        });

        let resp = await fetch("http://127.0.0.1:8000/api/messages", {
                method: 'POST',
                withCredentials: true,
                body: JSON.stringify({
                    "recipient": this.state.recipient.id,
                    "conversation_id": this.props.active_conversation,
                    "message": newMessage
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
            console.log("GET Error:" + error);
        });

        if(resp == undefined){
            return false;
        } else {

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

        let messages = [];

        

        this.state.messages.forEach(message => {
            messages.push(<div key={this.state.messages.indexOf(message)} className={message.sender_id == this.get_account_info().id ? "message sent" : "message received"}><p>{message.message}</p></div>);
        });

        return(
            <section className="Conversation screen">
                <section className="head">
                    <div className="container">
                        <NavLink to="/messages"><i className="fas fa-chevron-left"></i> Back</NavLink>
                        <img className="profileimg" src={"http://127.0.0.1:8000/" + this.state.recipient.profile_image} onError={this.on_imageerror} onLoad={this.on_imageload} ref={this.user_image}/>
                        <p>{this.state.recipient.name}</p>
                    </div>
                </section>
                <section className="body" ref={this.body}>
                    <div id="message-container" ref={this.messageArea}>
                        {messages}
                    </div>
                    <div id="input-container">
                        <form>
                            <input name="new-message" ref={this.newMessage} type="text"></input>
                            <i className="fas fa-paper-plane" onClick={()=>{this.send_message()}}></i>
                        </form>
                    </div>
                </section>
            </section>
        )
    }
}

export default ConversationScreen;