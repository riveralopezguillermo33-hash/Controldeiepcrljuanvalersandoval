import { useState } from 'react';
import { Home, User, Sliders, Users, GraduationCap, BookOpen, ClipboardList, FileText } from 'lucide-react';
import escudo from 'figma:asset/ffa68e596f973ae6cb0c3023782797cbd6c48814.png';
import { InicioView } from './InicioView';
import { PerfilView } from './PerfilView';
import { DocentesView } from './DocentesView';
import { EstudiantesView } from './EstudiantesView';
import { RolesView } from './RolesView';
import { CursosView } from './CursosView';
import { MatriculasView } from './MatriculasView';
import { ReportesView } from './ReportesView';
import { DocenteInicioView } from './DocenteInicioView';
import { MisCursosDocenteView } from './MisCursosDocenteView';
import { CalificacionesView } from './CalificacionesView';
import { AsistenciaView } from './AsistenciaView';

interface DashboardProps {
  role: 'administrativo' | 'docente' | 'estudiante' | null;
  username: string;
  onLogout: () => void;
}

export function Dashboard({ role, username, onLogout }: DashboardProps) {
  const [activeMenu, setActiveMenu] = useState('Inicio');

  const getRoleTitle = () => {
    if (role === 'administrativo') return 'Administrativo';
    if (role === 'docente') return 'Docente';
    if (role === 'estudiante') return 'Estudiante';
    return '';
  };

  const getMenuItems = () => {
    if (role === 'administrativo') {
      return [
        { icon: Home, label: 'Inicio' },
        { icon: User, label: 'Perfil' },
        { icon: Sliders, label: 'Opciones' },
        { icon: Users, label: 'Roles' },
        { icon: GraduationCap, label: 'Estudiantes' },
        { icon: Users, label: 'Docentes' },
        { icon: BookOpen, label: 'Cursos' },
        { icon: ClipboardList, label: 'Matrículas' },
        { icon: FileText, label: 'Reportes' },
      ];
    } else if (role === 'docente') {
      return [
        { icon: Home, label: 'Inicio' },
        { icon: User, label: 'Perfil' },
        { icon: GraduationCap, label: 'Mis Estudiantes' },
        { icon: BookOpen, label: 'Mis Cursos' },
        { icon: FileText, label: 'Calificaciones' },
        { icon: ClipboardList, label: 'Asistencia' },
      ];
    } else {
      return [
        { icon: Home, label: 'Inicio' },
        { icon: User, label: 'Mi Perfil' },
        { icon: BookOpen, label: 'Mis Cursos' },
        { icon: FileText, label: 'Mis Notas' },
        { icon: ClipboardList, label: 'Horario' },
        { icon: GraduationCap, label: 'Tareas' },
      ];
    }
  };

  const renderContent = () => {
    // Para Administrativo
    if (role === 'administrativo') {
      switch (activeMenu) {
        case 'Inicio':
          return <InicioView />;
        case 'Perfil':
          return <PerfilView username={username} role={getRoleTitle()} />;
        case 'Docentes':
          return <DocentesView />;
        case 'Estudiantes':
          return <EstudiantesView />;
        case 'Roles':
          return <RolesView />;
        case 'Cursos':
          return <CursosView />;
        case 'Matrículas':
          return <MatriculasView />;
        case 'Reportes':
          return <ReportesView />;
        case 'Opciones':
          return (
            <div className="max-w-6xl">
              <h1 className="text-gray-800 text-3xl mb-4">Opciones</h1>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <p className="text-gray-600">Configuraciones del sistema</p>
              </div>
            </div>
          );
        default:
          return <InicioView />;
      }
    }
    
    // Para Docente
    if (role === 'docente') {
      switch (activeMenu) {
        case 'Inicio':
          return <DocenteInicioView />;
        case 'Perfil':
          return <PerfilView username={username} role={getRoleTitle()} />;
        case 'Mis Cursos':
          return <MisCursosDocenteView />;
        case 'Calificaciones':
          return <CalificacionesView />;
        case 'Asistencia':
          return <AsistenciaView />;
        case 'Mis Estudiantes':
          return <EstudiantesView />;
        default:
          return <DocenteInicioView />;
      }
    }
    
    // Para Estudiante (temporal)
    return (
      <div className="max-w-6xl">
        <h1 className="text-gray-800 text-3xl mb-4">{activeMenu}</h1>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <p className="text-gray-600">Contenido de {activeMenu}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#2d5f4d] rounded flex items-center justify-center p-1.5">
              <img src={escudo} alt="Escudo" className="w-full h-full object-contain" />
            </div>
            <span className="text-gray-800">{getRoleTitle()}</span>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 py-4">
          {getMenuItems().map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveMenu(item.label)}
              className={`w-full px-6 py-3 flex items-center gap-3 transition-colors ${
                activeMenu === item.label
                  ? 'bg-gray-100 text-gray-900 border-l-4 border-[#2d5f4d]'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex justify-end">
            <button
              onClick={onLogout}
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cerrar sesión
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}