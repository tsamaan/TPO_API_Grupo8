import { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import './App.css';

function ProtectedScreen({ onLogout, user }) {
  return (
    <div className="login-container">
      <h2>¡Bienvenido, {user?.nombre || user?.usuario || 'usuario'}!</h2>
      <p style={{margin: '1.5rem 0'}}>Ya estás autenticado en Haversack.</p>
      <button onClick={onLogout} style={{marginTop: '1rem'}}>Cerrar sesión</button>
    </div>
  );
}

function MainApp() {
  const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <ProtectedScreen onLogout={handleLogout} user={user} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

export default App;