import React from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import Avatar from '@material-ui/core/Avatar';

import * as utils from "../utils/utils"
import { googleConfig } from "../constants/google"
import Contacts from "./contacts"
import './common.css';

const SCOPES="profile email https://www.googleapis.com/auth/contacts.readonly"

class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            isLogined: false,
            showContacts: false,
            profileObj: {}
        }

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.handleLoginFailure = this.handleLoginFailure.bind(this);
        this.handleLogoutFailure = this.handleLogoutFailure.bind(this)
    }
    componentWillMount(){
      const isLogined = utils.hasToken()
      if(isLogined){
       const profileObj = utils.getProfileObj()
        this.setState({ isLogined, showContacts: true, profileObj })
      }else
        this.setState({ isLogined })
    }

    login (response) {
        if(response.accessToken){
          utils.setProfile(response)  
          const profileObj = utils.getProfileObj()
          this.setState({ isLogined:true, showContacts: true, profileObj})
        }
    }

    handleLoginFailure (response) {
        alert('Failed to log in',response)
    }  

    logout(response){
      utils.clear()
      this.setState({ isLogined:false, showContacts: false})
    }

    handleLogoutFailure(response){
        alert('Failed to log out',response)
    }

    renderContacts(){
        return (
            <React.Fragment>
                 <Contacts/>
              </React.Fragment>
        )
    }

    renderLogin() {
        console.log(process.env.REACT_APP_CLIENT_ID)
        return (
            <React.Fragment>
              <div className="login">
                { this.state.isLogined ?
                        <div className="nav-bar">
                            <div className="nav-item">
                                <Avatar alt="No Image" src={this.state.profileObj.imageUrl}/>
                                    <div className="nav-text">
                                        <span>{this.state.profileObj.name}</span>
                                        <span className="small-text">{this.state.profileObj.email}</span> 
                                    </div> 
                            </div>
                            
                            <GoogleLogout
                                clientId={ googleConfig.web.client_id }
                                buttonText='Logout'
                                onLogoutSuccess={this.logout}
                                onFailure={this.handleLogoutFailure}
                            />
                        </div> 
                        :
                        <div className="nav-bar">
                            <div className="nav-item">
                                <div className="nav-text">
                                    <span> Welcome to google contacts app</span>
                                </div> 
                            </div>
                            <GoogleLogin
                                clientId={ googleConfig.web.client_id }
                                buttonText='Sign in with Google'
                                onSuccess={ this.login }
                                scope={SCOPES}
                                onFailure={ this.handleLoginFailure }
                                cookiePolicy={ 'single_host_origin' }
                                responseType='code,token'
                                />
                        </div>
                    }
                </div>        
                </React.Fragment>
        )
    }

    render(){
        return (
            <React.Fragment>
                {this.renderLogin()}
                { this.state.showContacts ? this.renderContacts() : null }
            </React.Fragment>
        )
    }
}

export default Login;
