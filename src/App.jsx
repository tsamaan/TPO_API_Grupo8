import { useContext, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, AuthContext } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import AdminDashboard from './pages/AdminDashboard'
import Navbar from './components/Navbar/Navbar'
import CartWidget from './components/CartWidget'
import FilterWidget from './components/FilterWidget'
import CartSidebar from './components/CartSidebar'
import ProductList from './components/ProductList'
import ProductDetail from './components/ProductDetail'
import ContactPage from './pages/ContactPage'
import Footer from './components/Footer/Footer'
import './App.css'

function ProtectedScreen({ onLogout, user }) {
  return (
    <div className="login-container">
      <h2>Bienvenido, {user?.nombre || user?.usuario || 'usuario'}!</h2>
      <p style={{ margin: '1.5rem 0' }}>Ya estas autenticado en Haversack.</p>
      <button onClick={onLogout} style={{ marginTop: '1rem' }}>Cerrar sesion</button>
    </div>
  )
}

function MainApp() {
  const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(AuthContext)
  const [cartOpen, setCartOpen] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)
  const [productCount, setProductCount] = useState(0)

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUser(null)
  }

  const handleCartClick = () => setCartOpen(true)
  const handleCartClose = () => setCartOpen(false)
  const handleFilterClick = () => setFilterOpen(true)
  const handleFilterClose = () => setFilterOpen(false)
  const handleProductCountChange = (count) => setProductCount(count)

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegisterPage />} />
        <Route
          path="*"
          element={
            <>
              <Navbar />
              <CartWidget onMenuClick={handleCartClick} />
              <FilterWidget onFilterClick={handleFilterClick} productCount={productCount} />
              <CartSidebar isOpen={cartOpen} onClose={handleCartClose} />
              <div className="main-with-navbar">
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
                  <Route path="/productos" element={<ProductList filterOpen={filterOpen} onFilterClose={handleFilterClose} onProductCountChange={handleProductCountChange} />} />
                  <Route path="/productos/categoria/:categoria" element={<ProductList filterOpen={filterOpen} onFilterClose={handleFilterClose} onProductCountChange={handleProductCountChange} />} />
                  <Route path="/productos/:id" element={<ProductDetail />} />
                  <Route path="/contacto" element={<ContactPage />} />
                  <Route path="/mochilas" element={<ProductList category="mochilas" />} />
                  <Route path="/materos" element={<ProductList category="materos" />} />
                  <Route path="/bolsos" element={<ProductList category="bolsos" />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
                <Footer />
              </div>
            </>
          }
        />
      </Routes>
    </Router>
  )
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <MainApp />
      </CartProvider>
    </AuthProvider>
  )
}

export default App