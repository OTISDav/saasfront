// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import VideoDownloader from './components/VideoDownloader';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/video-downloader" element={<VideoDownloader token={token} />} />
        <Route path="/dashboard" element={<Dashboard token={token} />} /> {/* Modifiez ici */}
      </Routes>
    </Router>
  );
};

export default App;
