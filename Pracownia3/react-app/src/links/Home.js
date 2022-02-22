import React, { Component } from 'react'; //different
import { useHistory } from 'react-router-dom';

function Home() { 
    const history = useHistory();

    return (
     <div className='appMain'>
        <p className="text1">Database</p>
        <div className="buttonDiv">
        <button className="buttonGET" onClick={()=> history.push("/get")}>GET  <br/> <span style={{opacity: 0.5}}>_</span><span style={{opacity: 0.7}}>__</span>_______<span style={{opacity: 0.7}}>__</span><span style={{opacity: 0.5}}>_</span></button>
        <button className="buttonPOST" onClick={()=> history.push("/post")}>POST  <br/> <span style={{opacity: 0.5}}>_</span><span style={{opacity: 0.7}}>__</span>_______<span style={{opacity: 0.7}}>__</span><span style={{opacity: 0.5}}>_</span></button>
        <button className="buttonPUT" onClick={()=> history.push("/put")}>PUT  <br/> <span style={{opacity: 0.5}}>_</span><span style={{opacity: 0.7}}>__</span>_______<span style={{opacity: 0.7}}>__</span><span style={{opacity: 0.5}}>_</span></button>
        <button className="buttonDELETE" onClick={()=> history.push("/delete")}>DELETE  <br/> <span style={{opacity: 0.5}}>_</span><span style={{opacity: 0.7}}>__</span>_______<span style={{opacity: 0.7}}>__</span><span style={{opacity: 0.5}}>_</span></button>
        </div>
        </div>
    );
}

export default Home;
