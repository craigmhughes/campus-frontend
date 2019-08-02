import React from 'react';
import '../../App.css';

import NullProfileImage from '../../images/nullprofile.png';

class SearchResult extends React.Component {
    constructor(props){
        super(props);

        this.user_image =  React.createRef();
    }

    componentDidMount(){
        try{
            this.user_image.current.src = "http://localhost:8000/" + this.props.user.profile_image;
        } catch(e){
            this.user_image.current.src = NullProfileImage;
        }
    }

        
    render(){

        let relationship = null;

        if(this.props.mentor){
            relationship = "Mentoring in " + this.props.user.mentor_subject;
        } else {
            relationship = "Looking to be mentored in " + this.props.user.mentee_subject;
        }

        let connection_icon = null;

        if(this.props.remove_connect !== undefined){
            connection_icon = <i className="fas fa-user-minus" onClick={()=>{this.props.remove_connect(this.props.user.id)}}></i>
        } else {
            connection_icon = <i className="fas fa-user-plus" onClick={()=>{this.props.add_connect(this.props.user.id)}}></i>
        }

        return(
            <article className="search-result">
                <section className="user-info">
                    <div className="container">
                        <div>
                            <img className="profileimg" ref={this.user_image}/>
                        </div>
                        <div>
                            <h1>{this.props.user.name} <span>{this.props.user.uni_name}</span></h1>
                            <p>{relationship}</p>
                        </div>
                    </div>
                </section>
                <div className="user-options">
                    <div className="container">
                      {connection_icon}
                    </div>
                </div>
            </article>
        )
    }
}

export default SearchResult;