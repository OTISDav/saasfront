import React, { useState } from 'react';
import './VideoDownloader.css'
import { downloadVideo } from '../api'; 
import {FaSyncAlt } from 'react-icons/fa';

const VideoDownloader = () => {
  const [videoURL, setVideoURL] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [downloadLink, setDownloadLink] = useState(null);
  const [videoTitle, setVideoTitle] = useState('');
  const token = localStorage.getItem('token');

  // Fonction pour gérer la soumission de l'URL
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setDownloadLink(null);

    try {
      const response = await downloadVideo({ url: videoURL }, token); 
      setDownloadLink(response.downloadUrl); 
      setVideoTitle(response.title); 
      setVideoURL(''); 
    } catch (err) {
      setError('Erreur lors du téléchargement. Veuillez réessayer.'); 
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="video-downloader-container">
      {/* En-tête avec le logo, A propos et l'icône utilisateur */}
      <header className="header">
        <div className="header-left">
          <img src="/image/logo.png" alt="OtisSaas Logo" className="logo" />
          <h1>OtisSaas</h1>
        </div>
        <div className="header-right">
          <button className="about-btn">A propos</button>
        </div>
      </header>

      <div className="content">
        {/* Titre principal */}
        <h2 className="page-title">Télécharger des vidéos YouTube</h2>

        {/* Formulaire pour entrer l'URL */}
        <form onSubmit={handleSubmit} className="download-form">
          <div className="input-container">
            <input
              type="text"
              id="videoURL"
              className="form-input"
              placeholder="Url"
              value={videoURL}
              onChange={(e) => setVideoURL(e.target.value)}
              required
            />
            <button type="submit" className="download-button" disabled={isLoading}>
              <FaSyncAlt className="sync-icon" />
            </button>
          </div>
        </form>

        {error && <p className="error-message">{error}</p>}

        {downloadLink && (
          <div className="download-link-container">
            <p className="success-message">Vidéo prête à être téléchargée : {videoTitle}</p>
            <a href={downloadLink} download className="download-link">
              Cliquez ici pour télécharger
            </a>
          </div>
        )}

        {/* Ligne séparatrice */}
        <hr className="separator" />

        {/* Liste des vidéos téléchargées */}
        <p className="downloaded-list-title">Liste des vidéos téléchargées</p>
      </div>
    </div>
  );
};

export default VideoDownloader;
