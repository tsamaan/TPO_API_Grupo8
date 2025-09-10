

import { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import LoginForm from './components/auth/LoginForm/LoginForm';
import RegisterForm from './components/auth/RegisterForm/RegisterForm';
import './App.css';

function App() {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <AuthProvider>
      <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f5f5f5' }}>
        {showRegister ? (
          <RegisterForm onShowLogin={() => setShowRegister(false)} />
        ) : (
          <LoginForm onShowRegister={() => setShowRegister(true)} />
        )}
      </div>
    </AuthProvider>
  );
}

export default App;
