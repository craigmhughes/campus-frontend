import React from 'react';
import '../App.css';


class AccountSettings extends React.Component {
    constructor(props){
        super(props);

        this.profileUpload = React.createRef();
        this.profileimage_edit = React.createRef();
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

    get_account_info(){
        return JSON.parse(localStorage.getItem("accountInfo"));
    }

    render_new_profile_image(){
        let image = URL.createObjectURL(this.profileUpload.current.files[0]);
        this.profileimage_edit.current.src = image;
    }
        
    render(){
        return(
            <section className="AccountSettings screen">
                <section className="head">
                    <i className="fas fa-times" onClick={()=>{window.location.href="/"}}></i>
                    <p>Edit Profile</p>
                    <i className="fas fa-check submit" onClick={()=>{this.post_changes()}}></i>
                </section>
                <section className="body">
                    <div className="settings-item">
                        <img src={"http://127.0.0.1:8000/" + this.get_account_info().profile_image} ref={this.profileimage_edit} className="profile-image"/>
                        <br/>
                        <label htmlFor="profileimage">Change Profile Image</label>
                        <input type="file" id="profileimage" ref={this.profileUpload} onChange={()=>{this.render_new_profile_image()}}></input>
                    </div>
                    
                    <div className="settings-item">
                        <label htmlFor="username">Name</label>
                        <input name="username" type="text" defaultValue={this.get_account_info().name}></input>
                    </div>
                    
                    <div className="settings-item">
                        <label htmlFor="mail">E-Mail Address</label>
                        <input name="mail" type="email" defaultValue={this.get_account_info().email}></input>
                    </div>
                </section>
                <section className="footer">
                    {/* <button type="button" className="save" onClick={()=>{this.post_changes()}}>Save</button> */}
                </section>
            </section>
        )
    }
}

export default AccountSettings;