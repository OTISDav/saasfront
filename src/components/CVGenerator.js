// src/components/CVGenerator.js
import React, { useState } from 'react';
import { generateCV } from '../api';

const CVGenerator = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleGenerateCV = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await generateCV({ name, email }, token);
      alert('CV généré avec succès !');
    } catch (error) {
      console.error('Erreur lors de la génération du CV:', error);
    }
  };

  return (
    <form onSubmit={handleGenerateCV}>
      <h2>Générateur de CV</h2>
      <input
        type="text"
        placeholder="Nom"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Générer le CV</button>
    </form>
  );
};

export default CVGenerator;
