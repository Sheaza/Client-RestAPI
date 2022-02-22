import React, {Component} from 'react';
import {GOOGLE_AUTH_URL} from '../constants/constants';
import {Redirect} from 'react-router-dom'
import './Login.css';
import lemin from "./lemin.gif"

class Login extends Component {

    render() {
        if (this.props.authenticated) {
            return <Redirect
                to={{
                    pathname: "/",
                    state: {from: this.props.location}
                }}/>;
        }

        return (
            <div className='main'>
                <div className='center'>
                    <img className='gif' src={lemin}></img>
                    <p className='p'>
                    <SocialLogin/>
                    </p>
                </div>
            </div>
        );
    }
}

class SocialLogin extends Component {
    render() {
        return (
            <div>
                <a className="a" href={GOOGLE_AUTH_URL}> Log in with Google </a>
            </div>
        );
    }
}

export default Login;