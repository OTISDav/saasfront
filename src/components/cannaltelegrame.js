import React, { useState, useEffect } from 'react';
import { getCanal } from '../api'; // Importer la fonction getcanal de api.js

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
    <div>
      <h1>Liste des canaux</h1>
      {canaux.length === 0 ? (
        <p>Aucun canal trouvé.</p>
      ) : (
        <ul>
          {canaux.map((canal) => (
            <li key={canal.id}>
              <strong>{canal.nom}</strong>
              <p>{canal.description}</p>
              <p>Prix: {canal.prix}€</p>
              <p>Date de création: {new Date(canal.date_creation).toLocaleString()}</p>
              <p>Est vendu: {canal.est_vendu ? "Oui" : "Non"}</p>
              <p>Propriétaire: {canal.proprietaire_nom}</p> {/* Affichage du nom du propriétaire */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CanalTelegrame;
