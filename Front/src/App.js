import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Acceuil from './pages/Acceuil';
import Post from './pages/Post';
import Profil from './pages/Profil'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Post />} />
        <Route exact path="/login" element={<Acceuil />} />
        <Route exact path="/profil" element={<Profil />} />
      </Routes>
    </Router>
  );
}

export default App;