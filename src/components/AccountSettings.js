import React from 'react';
import '../App.css';
import { resolve } from 'url';
import { reject } from 'q';


class AccountSettings extends React.Component {
    constructor(props){
        super(props);

        this.profileUpload = React.createRef();
        this.profileimage_edit = React.createRef();
        this.newName = React.createRef();
        this.newMail = React.createRef();
    }

    /**
     *  Posts form data to api which will update account information.
     *
     * @param {*} data Form Data to be posted
     * @returns JSON data of user's account information
     * @memberof AccountSettings
     */
    async post_changes(data){
        let resp = await fetch("http://127.0.0.1:8000/api/auth/update", {
                method: 'POST',
                withCredentials: true,
                credentials: 'include',
                body: data,
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

        return resp;
    }
    /**
     *  Decides which account information needs to be posted.
     *
     * @memberof AccountSettings
     */
    update_account(){

        if(this.profileUpload.current.files[0] !== undefined){
            this.prep_changes(0);
        }
        
        if( this.newName.current.value !== this.newName.current.defaultValue || 
            this.newMail.current.value !== this.newMail.current.defaultValue ){
            this.prep_changes(1);
        }        
        
    }

    /**
     * Selects which data to post based on index number.
     *
     * @param {*} i 
     * @memberof AccountSettings
     */
    async prep_changes(i){
        
        // init vars to be used in if statements
        let data = new FormData();

        if(i < 1){
            data.append('profile_image', this.profileUpload.current.files[0]);
        } else {
            data.append('name', this.newName.current.value);
            data.append('email', this.newMail.current.value);
        }

        // run post and get response
        let response = await this.post_changes(data);
            
        // re-read accountinfo
        let info = this.get_account_info();

        // update info
        localStorage.setItem("accountInfo", JSON.stringify({
            name: i < 1 ? info.name : response.name,
            email: i < 1 ? info.mail : response.email,
            profile_image: i > 0 ? response.profile_image : info.profile_image,
        }));

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

    /**
     * Rerenders recently selected profile image.
     *
     * @memberof AccountSettings
     */
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
                    <i className="fas fa-check submit" onClick={()=>{this.update_account()}}></i>
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
                        <input name="username" type="text" defaultValue={this.get_account_info().name} ref={this.newName}></input>
                    </div>
                    
                    <div className="settings-item">
                        <label htmlFor="mail">E-Mail Address</label>
                        <input name="mail" type="email" defaultValue={this.get_account_info().email} ref={this.newMail}></input>
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