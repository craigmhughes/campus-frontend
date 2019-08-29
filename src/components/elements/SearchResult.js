import React from 'react';
import '../../App.css';


import NullProfileImage from '../../images/nullprofile.png';

class SearchResult extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            profile: this.props.user.profile_image == "null",
            searchState: 0
        };

        this.user_image =  React.createRef();
        this.on_imageerror = this.on_imageerror.bind(this);
    }

    componentDidMount(){
        if(this.props.user.profile_image == "null"){
            this.on_imageerror();
        }
    }

    on_imageerror(){
        this.user_image.current.src = NullProfileImage;
    }

        
    render(){

        let relationship = null;

        if(this.props.mentor){
            relationship = "Mentoring in " + this.props.user.mentor_subject;
        } else {
            relationship = "Looking to be mentored in " + this.props.user.mentee_subject;
        }

        let user_options = null;
        let searchState = 0;

        if(this.props.remove_connect !== undefined){
            user_options = 
            <div className="container">
                <a onClick={()=>{this.props.remove_connect(this.props.user.id)}}>Remove</a>
            </div>
        } else if (this.props.accept_request !== undefined && this.props.remove_request !== undefined) {
            user_options = 
            <div className="container">
                <a onClick={()=>{this.props.accept_request(this.props.user.id)}}>Accept Request</a>
                <a onClick={()=>{this.props.remove_request(this.props.user.id)}} className="secondary">Delete Request</a>
            </div>

            searchState = 1;
        } else if (this.props.message !== undefined){
            user_options = 
            <div className="container">
                <p>{this.props.message.created_at.split(" ")[1]}</p>
            </div>
        } else {
            user_options = 
            <div className="container">
                {this.props.requested ? <a className="pending">Pending</a> : <a onClick={()=>{this.props.add_request(this.props.user.id)}}>Add</a>}
            </div>
        }

        return(
            <article className={"search-result " + "search-state-" + searchState} onClick={()=>{this.props.set_active_conversation(this.props.conversation_id)}}>
                <section className="user-info">
                    <div className="container">
                        <div>
                            <img className="profileimg" src={"http://127.0.0.1:8000/" + this.props.user.profile_image} onError={this.on_imageerror} onLoad={this.on_imageload} ref={this.user_image}/>
                        </div>
                        <div>
                            <h1>{this.props.user.name}<br/><span>{this.props.user.uni_name}</span></h1>
                            <p>{this.props.message !== undefined ? this.props.message.message : relationship}</p>
                        </div>
                    </div>
                </section>
                <div className="user-options">
                    {user_options}
                </div>
            </article>
        )
    }
}

export default SearchResult;