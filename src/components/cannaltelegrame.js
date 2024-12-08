import React, { useState, useEffect } from 'react';
import { getCanal } from '../api'; // Importer la fonction getcanal de api.js
import './CanalTelegrame.css';

const CanalTelegrame = () => {
  const [canaux, setCanaux] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Récupérer le token depuis localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      setError("Utilisateur non authentifié");
      setLoading(false);
      return;
    }

    // Appeler la fonction getcanal pour récupérer la liste des canaux
    getCanal(token) // Passer directement le token
      .then((data) => {
        setCanaux(data); // Mettre à jour les canaux dans l'état
        setLoading(false);
      })
      .catch((err) => {
        setError("Erreur lors de la récupération des canaux");
        setLoading(false);
      });
  }, []);

  // Affichage conditionnel de l'état de chargement ou des erreurs
  if (loading) return <div>Chargement des canaux...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="canaux-container">
      <header className="header">
        <div className="header-left">
          <img src="/image/logo.png" alt="OtisSaas Logo" className="logo" />
          <h1>OtisSaas</h1>
        </div>
        <div className="header-right">
          <button className="about-btn">A propos</button>
        </div>
      </header> <br/>

      <br/><h1>Liste des canaux</h1>
      {canaux.length === 0 ? (
        <p>Aucun canal trouvé.</p>
      ) : (
        <div className="cards-container">
          {canaux.map((canal) => (
            <div className="card" key={canal.id}>
              <div className="card-content">
                <h2>{canal.nom}</h2>
                <p><strong>Propriétaire:</strong> {canal.proprietaire_nom}</p>
                <p><strong>Description:</strong> {canal.description}</p>
                <p><strong>Prix:</strong> {canal.prix}€</p>
                {/* <p><strong>Date de création:</strong> {new Date(canal.date_creation).toLocaleString()}</p> */}
                <p><strong>Vendu:</strong> {canal.est_vendu ? "Oui" : "Non"}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CanalTelegrame;
