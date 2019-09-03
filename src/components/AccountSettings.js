import React from 'react';
import '../App.css';

import NullProfileImage from '../images/nullprofile.png';

class AccountSettings extends React.Component {
    constructor(props){
        super(props);

        this.profileUpload = React.createRef();

        // Form fields
        this.profileimage_edit = React.createRef();
        this.newName = React.createRef();
        this.newMail = React.createRef();
        this.newUni = React.createRef();
        this.newMentor = React.createRef();
        this.newMentee = React.createRef();
        
        //  Autocomplete Fields
        this.newUniGuess = React.createRef();
        this.submitButton = React.createRef();

        this.on_imageerror = this.on_imageerror.bind(this);
    }

    on_imageerror(){
        this.profileimage_edit.current.src = NullProfileImage;
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

        let form_fields = [ this.newName, this.newMail, this.newUni,
                            this.newMentor, this.newMentee];

        let prep_text_fields = false;
        
        //  TODO:   if any field passes, all fields will be submitted.
        //          fine for now but this will have to change.
        form_fields.forEach(field => {
            if( field.current.value !== field.current.defaultValue){
                prep_text_fields = true;
            }
        });
        
        if(prep_text_fields){
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
            data.append('uni_name', this.newUni.current.value);
            data.append('mentor_subject', this.newMentor.current.value);
            data.append('mentee_subject', this.newMentee.current.value);
        }

        // run post and get response
        let response = await this.post_changes(data);
            
        // re-read accountinfo
        let info = this.get_account_info();

        // update info
        localStorage.setItem("accountInfo", JSON.stringify({
            name: i < 1 ? info.name : response.name,
            email: i < 1 ? info.mail : response.email,
            uni_name: i < 1 ? info.uni_name : response.uni_name,
            mentor_subject: i < 1 ? info.mentor_subject : response.mentor_subject,
            mentee_subject: i < 1 ? info.mentee_subject : response.mentee_subject,
            profile_image: i > 0 ? response.profile_image : info.profile_image,
        }));

        this.toggle_success_button();

    }

    toggle_success_button(){
        if(this.submitButton.current !== null){
            setTimeout(()=>{
                this.submitButton.current.className = "fas fa-check submit active"
            }, 500, setTimeout(()=>{
                this.submitButton.current.className = "fas fa-check submit"
            }, 1500));
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

    /**
     * Rerenders recently selected profile image.
     *
     * @memberof AccountSettings
     */
    render_new_profile_image(){
        let image = URL.createObjectURL(this.profileUpload.current.files[0]);
        this.profileimage_edit.current.src = image;
    }

    async get_uni_name(){
        let queried_name = this.newUni.current.value;

        if(queried_name.length < 1){
            this.newUniGuess.current.className = "hidden";
            return false;
        }

        let data = new FormData();
        data.append('uni_name', this.newUni.current.value);

        let resp = await fetch("http://127.0.0.1:8000/api/search/uni", {
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
        .then((response) => { 
            if(response.success == "false" || response.name == undefined || response.name == "undefined"){
                this.newUniGuess.current.className = "hidden";
                return false;
            }

            this.newUniGuess.current.className = "";
            this.newUniGuess.current.innerText = response.name;
        })
        .catch((error) => {
            console.log("Get Uni Name Error:" + error);
        });
    }

    change_uni_name(){
        this.newUni.current.value = this.newUniGuess.current.innerText;
        this.newUniGuess.current.innerText = "";
        this.newUniGuess.current.className = "hidden";
    }
        
    render(){
        return(
            <section className="AccountSettings screen">
                <section className="head">
                    <i className="fas fa-times" onClick={()=>{window.location.href="/"}}></i>
                    <p>Edit Profile</p>
                    <i className="fas fa-check submit" ref={this.submitButton} onClick={()=>{this.update_account()}}></i>
                </section>
                <section className="body">
                    <div className="settings-item">
                        <img src={"http://127.0.0.1:8000/" + this.get_account_info().profile_image} onError={this.on_imageerror} onLoad={this.on_imageload} ref={this.profileimage_edit} className="profile-image"/>
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

                    <div className="settings-item">
                        <label htmlFor="uni">University</label>
                        <input name="uni" type="text" ref={this.newUni} defaultValue={this.get_account_info().uni_name} onChange={()=>{this.get_uni_name()}}></input>
                        <p id="new-uni-guess" ref={this.newUniGuess} onClick={()=>{this.change_uni_name()}} className="hidden">Univeristy Name</p>
                    </div>

                    <div className="settings-item">
                        <label htmlFor="mentor">I want to mentor in...</label>
                        <input name="mentor" type="text" ref={this.newMentor} defaultValue={this.get_account_info().mentor_subject}></input>
                    </div>

                    <div className="settings-item">
                        <label htmlFor="mentee">I want to be mentored in...</label>
                        <input name="mentee" type="text" ref={this.newMentee} defaultValue={this.get_account_info().mentee_subject}></input>
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