import { useState, useEffect } from 'react';
import { Search, Download, Plus, Edit } from 'lucide-react';

interface Calificacion {
  id: number;
  estudiante: string;
  curso: string;
  trimestre: string;
  nota: number;
  fecha: string;
}

export function CalificacionesView() {
  const [calificaciones, setCalificaciones] = useState<Calificacion[]>(() => {
    const saved = localStorage.getItem('calificaciones');
    return saved ? JSON.parse(saved) : [];
  });
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    estudiante: '',
    curso: '',
    trimestre: '1er Trimestre',
    nota: 0,
    fecha: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    localStorage.setItem('calificaciones', JSON.stringify(calificaciones));
  }, [calificaciones]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCalificacion: Calificacion = {
      id: Date.now(),
      ...formData,
    };
    setCalificaciones([...calificaciones, newCalificacion]);
    setFormData({
      estudiante: '',
      curso: '',
      trimestre: '1er Trimestre',
      nota: 0,
      fecha: new Date().toISOString().split('T')[0],
    });
    setShowForm(false);
  };

  const filteredCalificaciones = calificaciones.filter(c =>
    c.estudiante.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.curso.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getNotaColor = (nota: number) => {
    if (nota >= 14) return 'text-green-600';
    if (nota >= 11) return 'text-blue-600';
    return 'text-red-600';
  };

  return (
    <div className="max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-gray-800 text-3xl mb-2">Calificaciones</h1>
          <p className="text-gray-600">Gestiona las notas de tus estudiantes</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-[#2d5f4d] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#234a3a] transition-colors"
        >
          <Plus className="w-5 h-5" />
          Nueva Calificación
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-gray-800 text-xl mb-4">Registrar Calificación</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm mb-2">Estudiante</label>
              <input
                type="text"
                required
                value={formData.estudiante}
                onChange={(e) => setFormData({ ...formData, estudiante: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5f4d]"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-2">Curso</label>
              <input
                type="text"
                required
                value={formData.curso}
                onChange={(e) => setFormData({ ...formData, curso: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5f4d]"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-2">Trimestre</label>
              <select
                required
                value={formData.trimestre}
                onChange={(e) => setFormData({ ...formData, trimestre: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5f4d]"
              >
                <option value="1er Trimestre">1er Trimestre</option>
                <option value="2do Trimestre">2do Trimestre</option>
                <option value="3er Trimestre">3er Trimestre</option>
                <option value="4to Trimestre">4to Trimestre</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-2">Nota (0-20)</label>
              <input
                type="number"
                required
                min="0"
                max="20"
                step="0.5"
                value={formData.nota}
                onChange={(e) => setFormData({ ...formData, nota: parseFloat(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5f4d]"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-2">Fecha</label>
              <input
                type="date"
                required
                value={formData.fecha}
                onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5f4d]"
              />
            </div>
            <div className="flex gap-4 items-end">
              <button
                type="submit"
                className="bg-[#2d5f4d] text-white px-6 py-2 rounded-lg hover:bg-[#234a3a] transition-colors"
              >
                Guardar
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar por estudiante o curso..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5f4d]"
            />
          </div>
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Exportar
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-gray-700">Estudiante</th>
                <th className="text-left py-3 px-4 text-gray-700">Curso</th>
                <th className="text-left py-3 px-4 text-gray-700">Trimestre</th>
                <th className="text-left py-3 px-4 text-gray-700">Nota</th>
                <th className="text-left py-3 px-4 text-gray-700">Fecha</th>
                <th className="text-center py-3 px-4 text-gray-700">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredCalificaciones.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-500">
                    No hay calificaciones registradas
                  </td>
                </tr>
              ) : (
                filteredCalificaciones.map((cal) => (
                  <tr key={cal.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-800">{cal.estudiante}</td>
                    <td className="py-3 px-4 text-gray-600">{cal.curso}</td>
                    <td className="py-3 px-4 text-gray-600">{cal.trimestre}</td>
                    <td className="py-3 px-4">
                      <span className={`${getNotaColor(cal.nota)}`}>
                        {cal.nota.toFixed(1)}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{cal.fecha}</td>
                    <td className="py-3 px-4">
                      <div className="flex justify-center gap-2">
                        <button className="text-blue-600 hover:text-blue-800">
                          <Edit className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
