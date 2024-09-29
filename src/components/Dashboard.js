// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { getUserVideos, getUserCVs } from '../api';

const Dashboard = () => {
  const [videos, setVideos] = useState([]);
  const [cvs, setCVs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const userVideos = await getUserVideos(token);
      setVideos(userVideos);
      const userCVs = await getUserCVs(token);
      setCVs(userCVs);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>

      <h3>Vidéos Téléchargées</h3>
      {videos.length > 0 ? (
        <ul>
          {videos.map((video) => (
            <li key={video.id}>{video.title}</li>
          ))}
        </ul>
      ) : (
        <p>Aucune vidéo téléchargée</p>
      )}

      <h3>CV Générés</h3>
      {cvs.length > 0 ? (
        <ul>
          {cvs.map((cv) => (
            <li key={cv.id}>{cv.name} - {cv.email}</li>
          ))}
        </ul>
      ) : (
        <p>Aucun CV généré</p>
      )}
    </div>
  );
};

export default Dashboard;
