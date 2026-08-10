import React from 'react';
import ReactDOM from 'react-dom/client';
import Connexion from './pages/Connexion.jsx';
import './styles/global.css';

// Point d'entree dedie a la page d'authentification : totalement
// independant de main.jsx / App.jsx (aucun navbar, aucune sidebar,
// aucun composant du tableau de bord n'est importe ici).
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Connexion />
  </React.StrictMode>
);
