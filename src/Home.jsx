import React from 'react';
import Header from './components/Header/Header';
import MainContent from './components/MainContent/MainContent';
import Programs from './components/Programs/Programs';
import AboutUs from './components/AboutUs/AboutUs';

const Home = () => {
    return (
        <main className="main">
            <div class="help" title="Помощь" id="helping">?</div>
            <Header />
            <MainContent />
            <Programs />
            <AboutUs />
        </main>
    );
}

export default Home;