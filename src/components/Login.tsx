import { useState } from 'react';
import escudo from 'figma:asset/ffa68e596f973ae6cb0c3023782797cbd6c48814.png';
import { AlertCircle, UserPlus } from 'lucide-react';

interface LoginProps {
  role: 'administrativo' | 'docente' | 'estudiante' | null;
  onBack: () => void;
  onLogin: (username: string) => void;
  onCrearCuenta?: () => void;
}

// Credenciales de demostración
const validCredentials = {
  administrativo: { username: 'admin', password: 'admin123' },
  docente: { username: 'docente', password: 'docente123' },
  estudiante: { username: 'estudiante', password: 'estudiante123' },
};

export function Login({ role, onBack, onLogin, onCrearCuenta }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!role) return;
    
    // Para administrativo, primero buscar en localStorage
    if (role === 'administrativo') {
      const administradores = JSON.parse(localStorage.getItem('administradores') || '[]');
      
      const foundAdmin = administradores.find((admin: any) => 
        admin.usuario === username && admin.contraseña === password
      );
      
      if (foundAdmin) {
        onLogin(username);
        return;
      }
      
      // Si no se encuentra, intentar con credenciales fijas
      const validCreds = validCredentials[role];
      if (username === validCreds.username && password === validCreds.password) {
        onLogin(username);
      } else {
        setError('Usuario o contraseña incorrectos');
      }
      return;
    }
    
    // Para docentes y estudiantes, buscar en localStorage
    const storageKey = role === 'docente' ? 'docentes' : 'estudiantes';
    const users = JSON.parse(localStorage.getItem(storageKey) || '[]');
    
    const foundUser = users.find((user: any) => 
      user.usuario === username && user.contraseña === password
    );
    
    if (foundUser) {
      onLogin(username);
    } else {
      // Si no encuentra en localStorage, intentar con credenciales de demostración
      const validCreds = validCredentials[role];
      if (username === validCreds.username && password === validCreds.password) {
        onLogin(username);
      } else {
        setError('Usuario o contraseña incorrectos');
      }
    }
  };

  const getRoleTitle = () => {
    if (role === 'administrativo') return 'Administrativo';
    if (role === 'docente') return 'Docente';
    if (role === 'estudiante') return 'Estudiante';
    return '';
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-md p-4">
            <img src={escudo} alt="Escudo CRL Juan Valer Sandoval" className="w-full h-full object-contain" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-center text-gray-800 text-2xl mb-8">
          {getRoleTitle()}
        </h2>

        {/* Error Message */}
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5f4d] focus:border-transparent"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5f4d] focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#2d5f4d] text-white py-3 rounded-lg hover:bg-[#234a3a] transition-colors"
          >
            Ingresar
          </button>
        </form>

        {/* Back Link */}
        <div className="mt-6 text-center">
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            Volver
          </button>
        </div>

        {/* Crear Cuenta - Solo para Administrativo */}
        {role === 'administrativo' && onCrearCuenta && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <button
              onClick={onCrearCuenta}
              className="w-full flex items-center justify-center gap-2 text-[#2d5f4d] hover:text-[#234a3a] transition-colors py-2"
            >
              <UserPlus className="w-5 h-5" />
              Crear cuenta
            </button>
          </div>
        )}
      </div>
    </div>
  );
}