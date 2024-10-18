// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client'; // Importation de createRoot
import App from './App'; // Importation de votre composant App
import './App.css'

const root = ReactDOM.createRoot(document.getElementById('root')); // Ciblez l'élément DOM où votre application sera rendue
root.render(
  <React.StrictMode>
    <App />  {/* Rendu de votre composant principal */}
  </React.StrictMode>
);
