import { Briefcase, BookOpen, GraduationCap } from 'lucide-react';
import escudo from 'figma:asset/ffa68e596f973ae6cb0c3023782797cbd6c48814.png';

interface RoleSelectionProps {
  onRoleSelect: (role: 'administrativo' | 'docente' | 'estudiante') => void;
}

export function RoleSelection({ onRoleSelect }: RoleSelectionProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#2d5f4d] text-white py-4 px-6 flex items-center gap-3">
        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center p-1">
          <img src={escudo} alt="Escudo" className="w-full h-full object-contain" />
        </div>
        <h1 className="text-xl">CRL. Juan Valer Sandoval</h1>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-gray-700 text-lg mb-8">
          Seleccione su rol para ingresar:
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
          {/* Administrativo Card */}
          <button
            onClick={() => onRoleSelect('administrativo')}
            className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 bg-[#6b9bae] rounded-xl flex items-center justify-center mb-4">
              <Briefcase className="w-8 h-8 text-white" strokeWidth={2} />
            </div>
            <h3 className="text-gray-800 mb-2">ADMINISTRATIVO</h3>
            <p className="text-gray-600 text-sm">Acceso para Administrativo</p>
          </button>

          {/* Docente Card */}
          <button
            onClick={() => onRoleSelect('docente')}
            className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 bg-[#6b9bae] rounded-xl flex items-center justify-center mb-4">
              <BookOpen className="w-8 h-8 text-white" strokeWidth={2} />
            </div>
            <h3 className="text-gray-800 mb-2">DOCENTE</h3>
            <p className="text-gray-600 text-sm">Acceso para Docentes</p>
          </button>

          {/* Estudiante Card */}
          <button
            onClick={() => onRoleSelect('estudiante')}
            className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 bg-[#6b9bae] rounded-xl flex items-center justify-center mb-4">
              <GraduationCap className="w-8 h-8 text-white" strokeWidth={2} />
            </div>
            <h3 className="text-gray-800 mb-2">Estudiante</h3>
            <p className="text-gray-600 text-sm">Acceso para Estudiantes</p>
          </button>
        </div>
      </div>
    </div>
  );
}
