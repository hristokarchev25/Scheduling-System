import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import logo from '../../utils/azzurroLogo.png';
import videoBg from '../../utils/homeVideo.mp4';

const HomePage = function HomePage() {
    return (
        <div className='main'>
            <div className="overlay"></div>
            <video src={videoBg} autoPlay loop muted />
            <div className="content">
                <header className="Home-header">
                    <img src={logo} className="App-logo" alt="logo" />
                </header>
                <h1>Welcome</h1>
                <p className='welcome-text'>To the scheduling system of Azzurro Beach Bar.</p>
                <Link to="/scheduling">
                    <button className="button-89 ">Continue</button>
                </Link>
            </div>
        </div>
    )
}

export default HomePage;
