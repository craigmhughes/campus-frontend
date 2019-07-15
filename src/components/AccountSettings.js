import React from 'react';
import '../App.css';


class AccountSettings extends React.Component {
    constructor(props){
        super(props);

        this.profileUpload = React.createRef();
    }

    post_changes(){
        var data = new FormData();
        data.append('profile_image', this.profileUpload.current.files[0]);

        fetch("http://127.0.0.1:8000/api/auth/update", {
        method: 'POST',
        withCredentials: true,
        credentials: 'include',
        body: data,
        headers:{
            'Access-Control-Allow-Credentials': true,
            'Authorization': 'Bearer ' + localStorage.getItem("AUTH"),
        }
        }).then(res => res.json())
        .then((response) => {
            
            console.log(response);
            
            localStorage.setItem("accountInfo", JSON.stringify({
                name: response.name,
                email: response.email,
                profile_image: response.profile_image,
            }));

            console.log("done");

        }).catch((error) => {
            console.log("Update Error:" + error);
        });   
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
                        <input type="file" ref={this.profileUpload}></input>
                    </div>
                </section>
                <section className="footer">
                    <button type="button" className="save" onClick={()=>{this.post_changes()}}>Save</button>
                </section>
            </section>
        )
    }
}

export default AccountSettings;