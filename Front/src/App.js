import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from './pages/Login';
import Home from './pages/Home';
import Profil from './pages/Profil';
import Signup from './pages/Signup';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path='/home' element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/Signup" element={<Signup />} />
        <Route exact path="/profil" element={<Profil />} />
        <Route exact path='*' element={<h1>Page not found, error 404 !</h1>} />
      </Routes>
    </Router>
  );
}

export default App;