// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api'; // Importez la fonction de connexion
import './login.css'

const Login = ({ setToken }) => {
  const [username, setUsername] = useState(''); // Utilisation de nom d'utilisateur
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Pour la navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(username, password); // Utilisez la fonction de connexion
      setToken( response.token);
      console.log(response.tokens.access);
      
      // Assurez-vous que cela correspond à la structure de votre réponse
      localStorage.setItem('token', response.tokens.access);
      navigate('/dashboard'); // Redirigez vers le Dashboard après une connexion réussie
    } catch (error) {
      console.error('Erreur de connexion:', error);
      setError('Erreur de connexion. Vérifiez vos identifiants.'); // Message d'erreur
    }
  };

  return (
    <div className='rrt'>
    <div className="dashboard">
      <h2>Connexion</h2>
      <div className='form'>
      <form onSubmit={handleSubmit}>
        <input
          type="text" // Utilisation de type text pour le nom d'utilisateur
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Se connecter</button>
      </form>
      </div>
      {error && <p>{error}</p>} {/* Affiche le message d'erreur */}
      <p>
        Pas de compte ? <button onClick={() => navigate('/register')}>Créer un compte</button>
      </p>
    </div>
    </div>
  );
};

export default Login;
