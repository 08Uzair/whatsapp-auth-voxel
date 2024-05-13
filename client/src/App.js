import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Auth from './components/Auth';

const App = () => {
  const isAuthenticated = localStorage.getItem('user');

  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!isAuthenticated ? <Auth /> : <Navigate to="/" />}
          />

        </Routes>
      </Router>
    </div>
  );
};

export default App;
