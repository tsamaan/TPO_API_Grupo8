import { useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/Navbar/Navbar';
import CartWidget from './components/Carrito/CartWidget';

import CartSidebar from './components/CartSidebar';
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
  const [cartOpen, setCartOpen] = useState(false);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  const handleCartClick = () => setCartOpen(true);
  const handleCartClose = () => setCartOpen(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<LoginPage />}
        />
        <Route
          path="/registro"
          element={<RegisterPage />}
        />
        <Route
          path="*"
          element={
            <>
              <Navbar />
              <CartWidget onMenuClick={handleCartClick} />
              <CartSidebar isOpen={cartOpen} onClose={handleCartClose} />
              <Routes>
                <Route path="/" element={<HomePage />} />
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
            </>
          }
        />
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