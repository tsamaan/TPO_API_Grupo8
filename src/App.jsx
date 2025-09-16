import { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
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

  /*
  DISEÑO ORIGINAL CENTRALIZADO (ahora reemplazado por React Router):

  Este era el layout original que mostraba login/register centrados en pantalla.
  Ya no se usa porque ahora tenemos navegación con rutas separadas:

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

  RAZÓN DEL CAMBIO:
  - Antes: Una sola "página" que cambiaba contenido centrado
  - Ahora: Múltiples rutas (/login, /registro, /, /dashboard) con navegación
  - Beneficio: URLs específicas, navegación del browser, mejor UX
  */

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<LoginPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
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
      <CartProvider>
        <MainApp />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;