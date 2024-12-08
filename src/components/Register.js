// src/components/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api';
import './register.css'



const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Pour la navigation


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Appel à l'API pour l'inscription
      await register(username, email, phoneNumber, password);
      alert('Inscription réussie ! Vous pouvez maintenant vous connecter.');
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      alert('Erreur lors de l\'inscription. Veuillez vérifier vos informations.');
    }
  };

  return (
    <div className='Body'>
      <div className='Dasboard'>
      <form onSubmit={handleSubmit}>
        <h2>Inscription</h2>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Numéro de téléphone"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">S'inscrire</button>
      </form>
      <p>
        Retournez a la page de connexion <button onClick={() => navigate('/')}>Se connecter</button>
      </p>
      </div>
    </div>
  );
};

export default Register;
