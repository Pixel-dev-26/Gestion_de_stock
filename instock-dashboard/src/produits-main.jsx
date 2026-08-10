import React from 'react';
import ReactDOM from 'react-dom/client';
import Produits from './pages/Produits.jsx';
import './styles/global.css';

// Point d'entree dedie a la page Produits : reutilise le meme Navbar que
// la page d'accueil (import direct du composant), sans dupliquer sa logique.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Produits />
  </React.StrictMode>
);
