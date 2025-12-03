import { useState, useEffect } from 'react';
import { BookOpen, Users, FileText, Calendar } from 'lucide-react';

export function DocenteInicioView() {
  const [stats, setStats] = useState({
    cursos: 0,
    estudiantes: 0,
    tareasPendientes: 0,
  });

  useEffect(() => {
    const cursos = JSON.parse(localStorage.getItem('cursos') || '[]');
    const estudiantes = JSON.parse(localStorage.getItem('estudiantes') || '[]');

    setStats({
      cursos: cursos.length,
      estudiantes: estudiantes.length,
      tareasPendientes: 0,
    });
  }, []);

  const statsCards = [
    { label: 'Mis Cursos', value: stats.cursos, icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Total Estudiantes', value: stats.estudiantes, icon: Users, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Tareas Pendientes', value: stats.tareasPendientes, icon: FileText, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="text-gray-800 text-3xl mb-2">
          Bienvenido(a) — Docente
        </h1>
        <p className="text-gray-600">
          Sistema de Gestión del Colegio CRL. Juan Valer Sandoval
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {statsCards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${card.bg} p-3 rounded-lg`}>
                <card.icon className={`w-6 h-6 ${card.color}`} />
              </div>
            </div>
            <h3 className="text-gray-600 text-sm mb-2">{card.label}</h3>
            <p className="text-gray-900 text-4xl">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-[#2d5f4d]" />
            <h3 className="text-gray-800">Calendario Académico</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Año Escolar</span>
              <span className="text-gray-900">2025</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Trimestre Actual</span>
              <span className="text-gray-900">4to</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Próximo periodo</span>
              <span className="text-gray-900">Vacaciones</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#2d5f4d] to-[#1a3a2d] rounded-lg shadow-sm p-6 text-white">
          <h3 className="mb-4">Acciones Rápidas</h3>
          <div className="space-y-2">
            <p className="text-green-100 text-sm">• Subir calificaciones</p>
            <p className="text-green-100 text-sm">• Registrar asistencia</p>
            <p className="text-green-100 text-sm">• Crear tarea nueva</p>
            <p className="text-green-100 text-sm">• Ver horario de clases</p>
          </div>
        </div>
      </div>
    </div>
  );
}
