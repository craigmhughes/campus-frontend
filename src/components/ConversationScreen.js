import React from 'react';
import '../App.css';


class ConversationScreen extends React.Component {
    constructor(props){
        super(props);

        this.state = {
        }

        this.body = React.createRef();
    }

        
    render(){

        return(
            <section className="Conversation screen">
                <section className="head">
                    <div className="container">
                        <p>convo</p>
                    </div>
                </section>
                <section className="body" ref={this.body}>
                </section>
            </section>
        )
    }
}

export default ConversationScreen;