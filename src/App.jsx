


import { useState, useContext } from 'react';
import { AuthProvider, AuthContext } from './context/AuthContext';
import LoginForm from './components/auth/LoginForm/LoginForm';
import RegisterForm from './components/auth/RegisterForm/RegisterForm';
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
  const [showRegister, setShowRegister] = useState(false);
  const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setShowRegister(false);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f5f5f5' }}>
      {isAuthenticated ? (
        <ProtectedScreen onLogout={handleLogout} user={user} />
      ) : showRegister ? (
        <RegisterForm onShowLogin={() => setShowRegister(false)} />
      ) : (
        <LoginForm onShowRegister={() => setShowRegister(true)} />
      )}
    </div>
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
