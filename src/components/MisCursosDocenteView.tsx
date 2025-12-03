import { useState, useEffect } from 'react';
import { BookOpen, Users, Upload, Eye } from 'lucide-react';

interface Curso {
  id: number;
  nombre: string;
  codigo: string;
  grado: string;
  horas: number;
  estudiantes?: number;
}

export function MisCursosDocenteView() {
  const [cursos, setCursos] = useState<Curso[]>(() => {
    const saved = localStorage.getItem('cursos');
    return saved ? JSON.parse(saved) : [];
  });

  return (
    <div className="max-w-6xl">
      <div className="mb-6">
        <h1 className="text-gray-800 text-3xl mb-2">Mis Cursos</h1>
        <p className="text-gray-600">Gestiona tus cursos y tareas asignadas</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cursos.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-white rounded-lg border border-gray-200">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No tienes cursos asignados</p>
          </div>
        ) : (
          cursos.map((curso) => (
            <div
              key={curso.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="bg-[#2d5f4d] bg-opacity-10 p-3 rounded-lg">
                  <BookOpen className="w-6 h-6 text-[#2d5f4d]" />
                </div>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded">{curso.grado}</span>
              </div>
              
              <h3 className="text-gray-800 mb-2">{curso.nombre}</h3>
              <p className="text-gray-600 text-sm mb-4">Código: {curso.codigo}</p>
              
              <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
                <Users className="w-4 h-4" />
                <span>{curso.estudiantes || 0} estudiantes</span>
              </div>

              <div className="pt-4 border-t border-gray-200 flex gap-2">
                <button className="flex-1 bg-[#2d5f4d] text-white px-4 py-2 rounded-lg hover:bg-[#234a3a] transition-colors text-sm flex items-center justify-center gap-2">
                  <Upload className="w-4 h-4" />
                  Subir Tarea
                </button>
                <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
