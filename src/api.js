import axios from 'axios';

// Créez une instance Axios avec les paramètres de base
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fonction de connexion
export const login = async (username, password) => {
  try {
    const response = await api.post('/accounts/login/', { username, password });

    if (response.status === 200) {
      const data = response.data;
      
      // Stockez le token et les autres infos dans localStorage si nécessaire
      const tokenData = {
        token: data.token,
        user: data.user,
      };
      
      localStorage.setItem('token', JSON.stringify(tokenData)); // Stockez en JSON

      return data;
    }
  } catch (error) {
    console.error('Erreur de connexion:', error.response ? error.response.data : error.message);
    throw new Error('Erreur de connexion');
  }
};

// Fonction d'inscription
export const register = async (username, email, phoneNumber, password) => {
  try {
    const response = await api.post('/accounts/register/', {
      username,
      email,
      phone_number: phoneNumber,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// Fonction pour télécharger une vidéo
export const downloadVideo = async (videoData, token) => {
  try {
    const response = await api.post('/videos/download/', videoData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Retourner les données (lien de téléchargement + titre)
  } catch (error) {
    console.error("Erreur lors du téléchargement de la vidéo :", error);
    throw error;
  }
};

// Fonction pour récupérer les vidéos de l'utilisateur
export const getUserVideos = async (token) => {
  // const tokenData = localStorage.getItem('token');
  // const token = tokenData ? tokenData : null;

  // if (!token) {
  //   throw new Error("Utilisateur non authentifié");
  // }

  try {
    const response = await api.get('/videos/my_videos/', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des vidéos :", error.response ? error.response.data : error);
    throw error;
  }
};
