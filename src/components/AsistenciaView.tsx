import { useState, useEffect } from 'react';
import { Calendar, Check, X, Clock } from 'lucide-react';

interface Asistencia {
  id: number;
  estudiante: string;
  curso: string;
  fecha: string;
  estado: 'Presente' | 'Ausente' | 'Tardanza';
}

export function AsistenciaView() {
  const [asistencias, setAsistencias] = useState<Asistencia[]>(() => {
    const saved = localStorage.getItem('asistencias');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedCurso, setSelectedCurso] = useState('');

  useEffect(() => {
    localStorage.setItem('asistencias', JSON.stringify(asistencias));
  }, [asistencias]);

  const estudiantes = JSON.parse(localStorage.getItem('estudiantes') || '[]');
  const cursos = JSON.parse(localStorage.getItem('cursos') || '[]');

  const marcarAsistencia = (estudiante: string, estado: 'Presente' | 'Ausente' | 'Tardanza') => {
    const nuevaAsistencia: Asistencia = {
      id: Date.now() + Math.random(),
      estudiante,
      curso: selectedCurso,
      fecha: selectedDate,
      estado,
    };
    setAsistencias([...asistencias, nuevaAsistencia]);
  };

  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case 'Presente':
        return <Check className="w-5 h-5 text-green-600" />;
      case 'Ausente':
        return <X className="w-5 h-5 text-red-600" />;
      case 'Tardanza':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      default:
        return null;
    }
  };

  const getEstadoBg = (estado: string) => {
    switch (estado) {
      case 'Presente':
        return 'bg-green-100';
      case 'Ausente':
        return 'bg-red-100';
      case 'Tardanza':
        return 'bg-yellow-100';
      default:
        return 'bg-gray-100';
    }
  };

  return (
    <div className="max-w-6xl">
      <div className="mb-6">
        <h1 className="text-gray-800 text-3xl mb-2">Control de Asistencia</h1>
        <p className="text-gray-600">Registra la asistencia de tus estudiantes</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-gray-700 text-sm mb-2">Fecha</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5f4d]"
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 text-sm mb-2">Curso</label>
            <select
              value={selectedCurso}
              onChange={(e) => setSelectedCurso(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5f4d]"
            >
              <option value="">Seleccionar curso</option>
              {cursos.map((curso: any) => (
                <option key={curso.id} value={curso.nombre}>
                  {curso.nombre} - {curso.grado}
                </option>
              ))}
            </select>
          </div>
        </div>

        {selectedCurso && (
          <div className="space-y-3">
            <h3 className="text-gray-800 mb-4">Lista de Estudiantes</h3>
            {estudiantes.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No hay estudiantes registrados</p>
            ) : (
              estudiantes.map((estudiante: any) => {
                const asistenciaHoy = asistencias.find(
                  a => a.estudiante === `${estudiante.nombres} ${estudiante.apellidos}` && 
                       a.fecha === selectedDate && 
                       a.curso === selectedCurso
                );

                return (
                  <div
                    key={estudiante.id}
                    className={`flex items-center justify-between p-4 rounded-lg border ${
                      asistenciaHoy ? getEstadoBg(asistenciaHoy.estado) : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {asistenciaHoy && getEstadoIcon(asistenciaHoy.estado)}
                      <span className="text-gray-800">
                        {estudiante.nombres} {estudiante.apellidos}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => marcarAsistencia(`${estudiante.nombres} ${estudiante.apellidos}`, 'Presente')}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm"
                      >
                        Presente
                      </button>
                      <button
                        onClick={() => marcarAsistencia(`${estudiante.nombres} ${estudiante.apellidos}`, 'Tardanza')}
                        className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors text-sm"
                      >
                        Tardanza
                      </button>
                      <button
                        onClick={() => marcarAsistencia(`${estudiante.nombres} ${estudiante.apellidos}`, 'Ausente')}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm"
                      >
                        Ausente
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}
