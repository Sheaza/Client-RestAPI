import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';
import './App.Header.css';

class AppHeader extends Component {
    render() {
        return (
            <header >
                <nav className='links'>
                    <NavLink to="/">Main Page</NavLink>
                    { this.props.authenticated ? (
                    <>
                    <NavLink to="/profile">Profile</NavLink>
                    <NavLink to="/home">Get data from backend</NavLink>
                    <a href="/" onClick={this.props.onLogout}>Logout</a></>):
                    (<NavLink to="/login">Login</NavLink>)}
                </nav>

            </header>
        )
    }
}

export default AppHeader;
