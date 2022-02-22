import React, { Component } from 'react'; 
import {BrowserRouter, Switch, Route} from "react-router-dom";
import AppHeader from "./AppHeader";
import Home from '../links/Home';
import Login from '../links/Login';
import OAuth2RedirectHandler from '../oauth2/OAuth2RedirectHandler';
import {ACCESS_TOKEN, API_BASE_URL} from '../constants/constants';
import PrivateRoute from '../common/PrivateRoute';
import './App.css';
import BackendRequest from "../links/BackendRequest";
import Profile from '../links/Profile';
import Main from '../links/Main'
import Get from '../links/Get'
import Post from '../links/Post'
import Put from '../links/Put'
import Delete from '../links/Delete'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            currentUser: null,
        }

        this.loadCurrentlyLoggedInUser = this.loadCurrentlyLoggedInUser.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    getCurrentUser = () => {
        if (!localStorage.getItem(ACCESS_TOKEN)) {
            return Promise.reject("No access token set.");
        }

        return this.request({
            url: API_BASE_URL + "/user/me",
            method: 'GET'
        });
    }

    request = (options) => {
        const headers = new Headers({
            'Content-Type': 'application/json',
        })

        if (localStorage.getItem(ACCESS_TOKEN)) {
            headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
        }

        const defaults = {headers: headers};
        options = Object.assign({}, defaults, options);

        return fetch(options.url, options)
            .then(response =>
                response.json().then(json => {
                    if (!response.ok) {
                        return Promise.reject(json);
                    }
                    return json;
                })
            );
    };


    loadCurrentlyLoggedInUser() {
        this.getCurrentUser()
            .then(response => {
                this.setState({
                    currentUser: response,
                    authenticated: true,
                });
            }).catch(error => {
            console.log(error)
        });
    }

    handleLogout() {
        localStorage.removeItem(ACCESS_TOKEN);
        this.setState({
            authenticated: false,
            currentUser: null
        });
    }

    componentDidMount() {
        this.loadCurrentlyLoggedInUser();
    }

    render() {
        return (
            <div className="app">
                <div className="app-top-box">
                    <AppHeader authenticated={this.state.authenticated} onLogout={this.handleLogout}/>
                </div>
                <div className="app-body">
                    <Switch>
                        <Route exact path="/" component={Main}></Route>
                        <PrivateRoute path="/profile" authenticated={this.state.authenticated}
                                      currentUser={this.state.currentUser}
                                      component={Profile}></PrivateRoute>
                        <Route path="/home" component={Home}/>
                        <Route path="/get" component={Get}></Route>
                        <Route path="/post" component={Post}></Route>
                        <Route path="/put" component={Put}></Route>
                        <Route path="/delete" component={Delete}></Route>
                        <Route path="/login"
                               render={(props) => <Login
                                   authenticated={this.state.authenticated} {...props} />}></Route>
                        <Route path="/oauth2/redirect" component={OAuth2RedirectHandler}></Route>
                    </Switch>
                </div>
            </div>
        );
}
}

export default App;