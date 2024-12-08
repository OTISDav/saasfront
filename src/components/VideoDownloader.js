import React, { useEffect, useState } from 'react';
import './VideoDownloader.css';
import { downloadVideo, getUserVideos } from '../api'; 
import { FaSyncAlt } from 'react-icons/fa';

const VideoDownloader = () => {
  const [videoURL, setVideoURL] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [downloadLink, setDownloadLink] = useState(null);
  const [videoTitle, setVideoTitle] = useState('');
  const token = localStorage.getItem('token');
  const [userVideo, setUserVideo] = useState([]);

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

  const _getUserVideos = async () => {
    try {
      const response = await getUserVideos(token);
      setUserVideo(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  // Appeler _getUserVideos après chaque nouveau téléchargement
  useEffect(() => {
    if (downloadLink) {
      _getUserVideos();
    }
  }, [downloadLink]); // Exécute cet effet chaque fois que downloadLink change

  useEffect(() => {
    _getUserVideos();
  }, [token]);

  return (
    <div className="video-downloader-container">
      <header className="header">
        <div className="header-left">
          <img src="/image/logo.png" alt="OtisSaas Logo" className="logo" />
          <h1>OtisSaas</h1>
        </div>
        <div className="header-right">
          <button className="about-btn">A propos</button>
        </div>
      </header>

      <div className='mm'>
        <h2 className="page-title">Télécharger des vidéos YouTube</h2>

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
              {isLoading ? 'Chargement...' : <FaSyncAlt className="sync-icon" />}
            </button>
          </div>
        </form>

        {error && <p className="error-message">{error}</p>}

        {downloadLink && (
          <div className="download-link-container">
            <p className="success-message">Vidéo prête à être téléchargée : {videoTitle}</p>
            <p className="success-message">Votre video sera sauvegardee dans "Téléchargements\OtisSaasTelechargement"</p>
            <a 
              href={downloadLink} 
              download 
              target="_blank"
              className="download-link"
            >
              Cliquez ici pour télécharger
            </a>
          </div>
        )}

        <hr className="separator" />
      </div>

        <p className="downloaded-list-title">Liste de vos vidéos téléchargées</p><br/>

      <div className="container mt-3">       
        <table className="table">
          <thead>
            <tr>
              <th>Youtube chanelle</th>
              <th>Title</th>
              <th>Upload date</th>
            </tr>
          </thead>
          <tbody>
            {userVideo.map((video) => (
              <tr key={video.id} className="video-row">
                <td style={{ borderRight: '10px solid #ddd' }}>{video.uploader}</td>
                <td style={{ borderRight: '10px solid #ddd' }}>{video.title}</td>
                <td>{video.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


    </div>
  );
};

export default VideoDownloader;
