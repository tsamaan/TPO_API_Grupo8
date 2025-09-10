
import { AuthProvider } from './features/user/context/AuthContext';
import LoginForm from './features/user/components/auth/LoginForm/LoginForm';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f5f5f5' }}>
        <LoginForm />
      </div>
    </AuthProvider>
  );
}

export default App;
