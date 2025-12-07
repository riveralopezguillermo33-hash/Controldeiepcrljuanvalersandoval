import { useState } from 'react';
import { Welcome } from './components/Welcome';
import { RoleSelection } from './components/RoleSelection';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { CrearCuenta } from './components/CrearCuenta';

type Screen = 'welcome' | 'role-selection' | 'login' | 'dashboard' | 'crear-cuenta';
type Role = 'administrativo' | 'docente' | 'estudiante' | null;

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [loggedInUser, setLoggedInUser] = useState<string>('');

  const handleEnterSystem = () => {
    setCurrentScreen('role-selection');
  };

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
    setCurrentScreen('login');
  };

  const handleBack = () => {
    setCurrentScreen('role-selection');
    setSelectedRole(null);
  };

  const handleLogin = (username: string) => {
    setLoggedInUser(username);
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setLoggedInUser('');
    setSelectedRole(null);
    setCurrentScreen('welcome');
  };

  const handleCrearCuenta = () => {
    setCurrentScreen('crear-cuenta');
  };

  const handleCuentaCreada = () => {
    // Regresar al login de administrativo
    setSelectedRole('administrativo');
    setCurrentScreen('login');
  };

  return (
    <div className="min-h-screen">
      {currentScreen === 'welcome' && (
        <Welcome onEnter={handleEnterSystem} />
      )}
      {currentScreen === 'role-selection' && (
        <RoleSelection onRoleSelect={handleRoleSelect} />
      )}
      {currentScreen === 'login' && (
        <Login role={selectedRole} onBack={handleBack} onLogin={handleLogin} onCrearCuenta={handleCrearCuenta} />
      )}
      {currentScreen === 'dashboard' && (
        <Dashboard role={selectedRole} username={loggedInUser} onLogout={handleLogout} />
      )}
      {currentScreen === 'crear-cuenta' && (
        <CrearCuenta onBack={handleBack} onSuccess={handleCuentaCreada} />
      )}
    </div>
  );
}