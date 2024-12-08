import React from 'react';
import './Dashboard.css'; // Inclut les styles nécessaires
import youtubeLogo from '../assets/youtube-logo.png'; // Icône YouTube
// import socialMediaLogo from '../assets/social-media-logo.png'; // Icônes Twitter/LinkedIn
// import telegramLogo from '../assets/telegram-logo.png'; // Icône Telegram
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  // Redirection vers les pages de fonctionnalités
  const redirectToYouTube = () => {
    navigate('/video-downloader');
  };

  const redirectToSocialMedia = () => {
    navigate('/social-media-post');
  };

  const redirectTocannaux = () => {
    navigate('/liste-cannaux');
  };

  return (
    <div className="dashboard">
      {/* Header avec le logo et à propos */}
      <header className="header">
        <div className="logo-container">
          <img src="/image/logo.png" alt="OtisSaas Logo" className="logo" />
          <h1>OtisSaas</h1>
        </div>
        <button className="about-btn">À propos</button>
      </header>

      {/* Section principale avec titre et services */}
      <main className="main-content">
        <h2>Bienvenue Nos services</h2>
        <div className="services">


          {/* Carte pour Twitter et LinkedIn */}
          <div className="service-card" onClick={redirectToSocialMedia}>
            <p>Twitter et poster sur LinkedIn</p>
          </div>

          {/* Carte pour téléchargement YouTube */}
          <div className="service-card" onClick={redirectToYouTube}>
            <img src={youtubeLogo} alt="YouTube" className="service-icon" />
            <p>Télécharger vidéo YouTube</p>
          </div>


          {/* Carte pour la vente des canaux Telegram */}
          <div className="service-card" onClick={redirectTocannaux}>
            <p>Vente de canaux Telegram</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
