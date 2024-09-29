// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fonction d'authentification
export const login = async (email, password) => {
  const response = await api.post('/auth/login/', { email, password });
  return response.data;
};

export const register = async (email, password) => {
  const response = await api.post('/auth/register/', { email, password });
  return response.data;
};

// Fonction pour télécharger des vidéos
export const downloadVideo = async (videoData, token) => {
  const response = await api.post('/videos/download/', videoData, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.data;
};

// Fonction pour générer un CV
export const generateCV = async (cvData, token) => {
  const response = await api.post('/cv/generate/', cvData, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.data;
};

// Récupérer les vidéos de l'utilisateur
export const getUserVideos = async (token) => {
  const response = await api.get('/videos/my_videos/', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.data;
};

// Récupérer les CV de l'utilisateur
export const getUserCVs = async (token) => {
  const response = await api.get('/cv/my_cvs/', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.data;
};
