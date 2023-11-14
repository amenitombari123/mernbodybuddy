// src/index.js
import React from "react";
import ReactDOM from "react-dom";
import './index.css';
import App from './App';
import Logo from './assets/images/Logo.png'; // Updated path

document.title = 'BodyBuddy';

const root = document.getElementById('root');

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    root
);

// Optionally, set the favicon dynamically
const favicon = document.querySelector("link[rel*='icon']") || document.createElement('link');
favicon.type = 'image/png';
favicon.href = Logo; // Use the imported logo path
document.head.appendChild(favicon);
