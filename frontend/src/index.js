/*
 * Index.js
*/

import './index.css';
import App from './App';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

// StrictMode causes Squordle fetch request to run x2
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
