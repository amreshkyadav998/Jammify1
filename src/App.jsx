import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { SongsProvider } from './contexts/SongsContext'; // Import SongsProvider
import Header from './components/Header';
import Login from './components/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <SongsProvider> {/* Wrap with SongsProvider */}
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
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;