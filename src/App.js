// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import VideoDownloader from './components/VideoDownloader';
import CVGenerator from './components/CVGenerator';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/video-downloader" element={<VideoDownloader />} />
        <Route path="/cv-generator" element={<CVGenerator />} />
        <Route path="/" element={token ? <Dashboard /> : <Login setToken={setToken} />} />
      </Routes>
    </Router>
  );
};

export default App;
