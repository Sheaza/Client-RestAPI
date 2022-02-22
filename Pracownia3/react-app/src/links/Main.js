import React, { Component } from 'react';
import "./Main.css"
import image from "./database.png"

class Main extends Component {
    render() {
        return (
            <div className='main'>
                    
                    <img className="image" src={image}></img>
                    
            </div>
        )
    }
}

export default Main;