import React from 'react';
import ReactDOM from 'react-dom/client';
import Stocks from './pages/Stocks.jsx';
import './styles/global.css';

// Point d'entree dedie a la page Stocks : reutilise le meme Navbar que
// les autres pages (import direct du composant).
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Stocks />
  </React.StrictMode>
);
