import React from 'react';
import './HomePage.css';
import logo from '../../utils/azzurroLogo.jpg';

const HomePage = function HomePage() {
    return (
        <div className="Home-page">
            <header className="Home-header">
                <p>loreamfmf</p>
                <img src={logo} className="App-logo" alt="logo" />
            </header>
        </div>
    )
}

export default HomePage;
