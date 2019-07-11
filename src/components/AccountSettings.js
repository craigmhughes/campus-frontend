import React from 'react';
import '../App.css';


class AccountSettings extends React.Component {
    constructor(props){
        super(props);

    }

        
    render(){
        return(
            <section className="AccountSettings screen">
                <section className="head">
                    <i className="fas fa-chevron-left" onClick={()=>{window.location.href="/"}}></i>
                    <h1>Settings</h1>
                </section>
                <section className="body">
                    <div className="settings-item">
                        <p>Profile Picture:</p>
                        <input type="file"></input>
                    </div>
                </section>
                <section className="footer">
                    <button type="button" className="save">Save</button>
                </section>
            </section>
        )
    }
}

export default AccountSettings;