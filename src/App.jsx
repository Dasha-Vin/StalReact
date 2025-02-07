import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Home from './Home';

const App = () => {
    return (
        <main className="main">
            <Router>
                <Routes>
                    <Route path="/" exact element={<Login />} />
                    <Route path="/Home" exact element={<Home />} />
                </Routes>
            </Router>
        </main>
    );
}

export default App;