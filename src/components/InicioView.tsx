import { useState, useEffect } from 'react';
import { Users, GraduationCap, BookOpen, ClipboardList } from 'lucide-react';

export function InicioView() {
  const [stats, setStats] = useState({
    estudiantes: 0,
    docentes: 0,
    cursos: 0,
    matriculas: 0,
  });

  useEffect(() => {
    const estudiantes = JSON.parse(localStorage.getItem('estudiantes') || '[]');
    const docentes = JSON.parse(localStorage.getItem('docentes') || '[]');
    const cursos = JSON.parse(localStorage.getItem('cursos') || '[]');
    const matriculas = JSON.parse(localStorage.getItem('matriculas') || '[]');

    setStats({
      estudiantes: estudiantes.length,
      docentes: docentes.length,
      cursos: cursos.length,
      matriculas: matriculas.length,
    });
  }, []);

  const statsCards = [
    { label: 'Total Estudiantes', value: stats.estudiantes, icon: GraduationCap, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Total Docentes', value: stats.docentes, icon: Users, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Total Cursos', value: stats.cursos, icon: BookOpen, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Total Matrículas', value: stats.matriculas, icon: ClipboardList, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="text-gray-800 text-3xl mb-2">
          Bienvenido(a) — Administrativo
        </h1>
        <p className="text-gray-600">
          Sistema de Gestión del Colegio CRL. Juan Valer Sandoval
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-gray-800 mb-4">Resumen del Sistema</h3>
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
              <span className="text-gray-600">Estado del Sistema</span>
              <span className="text-green-600">Activo</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#2d5f4d] to-[#1a3a2d] rounded-lg shadow-sm p-6 text-white">
          <h3 className="mb-4">Acciones Rápidas</h3>
          <div className="space-y-2">
            <p className="text-green-100 text-sm">• Registrar nuevo estudiante</p>
            <p className="text-green-100 text-sm">• Crear nueva matrícula</p>
            <p className="text-green-100 text-sm">• Asignar docente a curso</p>
            <p className="text-green-100 text-sm">• Generar reportes</p>
          </div>
        </div>
      </div>
    </div>
  );
}
