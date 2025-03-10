import React from 'react';
import ReactDOM from 'react-dom/client';
import './reset.css'
import './index.css'
import App from './App'
import { DevTools } from 'react-devtools';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

DevTools.register();