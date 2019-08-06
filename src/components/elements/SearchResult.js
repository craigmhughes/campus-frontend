import React from 'react';
import '../../App.css';

import NullProfileImage from '../../images/nullprofile.png';

class SearchResult extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            profile: this.props.user.profile_image == "null"
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

        if(this.props.remove_connect !== undefined){
            user_options = 
            <div className="container">
                <i className="fas fa-user-minus" onClick={()=>{this.props.remove_connect(this.props.user.id)}}></i>
            </div>
        } else if (this.props.accept_request !== undefined && this.props.remove_request !== undefined) {
            user_options = 
            <div className="container">
                <p onClick={()=>{this.props.accept_request(this.props.user.id)}}>Accept Request</p>
                <p onClick={()=>{this.props.remove_request(this.props.user.id)}}>Delete Request</p>
            </div>
        } else {
            user_options = 
            <div className="container">
                <i className="fas fa-user-plus" onClick={()=>{this.props.add_request(this.props.user.id)}}></i>
            </div>
        }

        return(
            <article className="search-result">
                <section className="user-info">
                    <div className="container">
                        <div>
                            <img className="profileimg" src={"http://127.0.0.1:8000/" + this.props.user.profile_image} onError={this.on_imageerror} onLoad={this.on_imageload} ref={this.user_image}/>
                        </div>
                        <div>
                            <h1>{this.props.user.name} <span>{this.props.user.uni_name}</span></h1>
                            <p>{relationship}</p>
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