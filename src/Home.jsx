import React from 'react';
import Header from './components/Header/Header';
import MainContent from './components/MainContent/MainContent';
import Programs from './components/Programs/Programs';
import AboutUs from './components/AboutUs/AboutUs';

const Home = ({ onLoginClick }) => {
    return (
        <main className="main">
            <div className="help" title="Помощь" id="helping">?</div>
            <Header />
            <MainContent />
            <Programs />
            <AboutUs />
        </main>
    );
}

export default Home;