import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { SongsProvider } from './contexts/SongsContext'; 
import Header from './components/Header';
import Login from './components/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
        <SongsProvider>
          <Router>
            <Header />
            <Routes>
              <Route path="/" element={<Login />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Router>
        </SongsProvider>
    </AuthProvider>
  );
}

export default App;