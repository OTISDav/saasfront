// src/components/VideoDownloader.js
import React, { useState } from 'react';
import { downloadVideo } from '../api';

const VideoDownloader = () => {
  const [url, setUrl] = useState('');

  const handleDownload = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await downloadVideo({ url }, token);
      alert('Vidéo téléchargée avec succès !');
    } catch (error) {
      console.error('Erreur lors du téléchargement de la vidéo:', error);
    }
  };

  return (
    <form onSubmit={handleDownload}>
      <h2>Téléchargeur de Vidéos</h2>
      <input
        type="text"
        placeholder="URL de la vidéo"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
      />
      <button type="submit">Télécharger</button>
    </form>
  );
};

export default VideoDownloader;
