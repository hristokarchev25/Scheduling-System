import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import logo from '../../utils/azzurroLogo.jpg';

const HomePage = function HomePage() {
    return (
        <div className="Home-page">
            <header className="Home-header">
                <img src={logo} className="App-logo" alt="logo" />
            </header>
            <div>
                <Link to="/scheduling">
                    <button className="quiz__btn">Start</button>
                </Link>
            </div>
        </div>
    )
}

export default HomePage;
