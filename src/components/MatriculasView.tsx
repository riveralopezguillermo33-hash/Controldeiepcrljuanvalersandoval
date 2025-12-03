import { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, FileText } from 'lucide-react';

interface Matricula {
  id: number;
  codigoMatricula: string;
  estudiante: string;
  dniEstudiante: string;
  grado: string;
  seccion: string;
  fechaMatricula: string;
  anioEscolar: string;
  estado: 'Activa' | 'Inactiva' | 'Retirado';
  apoderado: string;
  telefonoApoderado: string;
}

export function MatriculasView() {
  const [matriculas, setMatriculas] = useState<Matricula[]>(() => {
    const saved = localStorage.getItem('matriculas');
    return saved ? JSON.parse(saved) : [];
  });
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    codigoMatricula: '',
    estudiante: '',
    dniEstudiante: '',
    grado: '',
    seccion: '',
    fechaMatricula: '',
    anioEscolar: '2025',
    estado: 'Activa' as 'Activa' | 'Inactiva' | 'Retirado',
    apoderado: '',
    telefonoApoderado: '',
  });

  useEffect(() => {
    localStorage.setItem('matriculas', JSON.stringify(matriculas));
  }, [matriculas]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newMatricula: Matricula = {
      id: Date.now(),
      ...formData,
    };
    setMatriculas([...matriculas, newMatricula]);
    setFormData({
      codigoMatricula: '',
      estudiante: '',
      dniEstudiante: '',
      grado: '',
      seccion: '',
      fechaMatricula: '',
      anioEscolar: '2025',
      estado: 'Activa',
      apoderado: '',
      telefonoApoderado: '',
    });
    setShowForm(false);
  };

  const handleDelete = (id: number) => {
    if (confirm('¿Está seguro de eliminar esta matrícula?')) {
      setMatriculas(matriculas.filter(m => m.id !== id));
    }
  };

  const filteredMatriculas = matriculas.filter(m =>
    m.estudiante.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.codigoMatricula.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.dniEstudiante.includes(searchTerm)
  );

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'Activa':
        return 'bg-green-100 text-green-800';
      case 'Inactiva':
        return 'bg-yellow-100 text-yellow-800';
      case 'Retirado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-gray-800 text-3xl">Gestión de Matrículas</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-[#2d5f4d] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#234a3a] transition-colors"
        >
          <Plus className="w-5 h-5" />
          Nueva Matrícula
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-gray-800 text-xl mb-4">Crear Nueva Matrícula</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm mb-2">Código de Matrícula</label>
              <input
                type="text"
                required
                value={formData.codigoMatricula}
                onChange={(e) => setFormData({ ...formData, codigoMatricula: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5f4d]"
                placeholder="Ej: MAT-2025-001"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-2">Nombre del Estudiante</label>
              <input
                type="text"
                required
                value={formData.estudiante}
                onChange={(e) => setFormData({ ...formData, estudiante: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5f4d]"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-2">DNI del Estudiante</label>
              <input
                type="text"
                required
                value={formData.dniEstudiante}
                onChange={(e) => setFormData({ ...formData, dniEstudiante: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5f4d]"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-2">Grado</label>
              <select
                required
                value={formData.grado}
                onChange={(e) => setFormData({ ...formData, grado: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5f4d]"
              >
                <option value="">Seleccionar grado</option>
                <option value="1ro">1ro</option>
                <option value="2do">2do</option>
                <option value="3ro">3ro</option>
                <option value="4to">4to</option>
                <option value="5to">5to</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-2">Sección</label>
              <input
                type="text"
                required
                value={formData.seccion}
                onChange={(e) => setFormData({ ...formData, seccion: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5f4d]"
                placeholder="Ej: A, B, C"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-2">Fecha de Matrícula</label>
              <input
                type="date"
                required
                value={formData.fechaMatricula}
                onChange={(e) => setFormData({ ...formData, fechaMatricula: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5f4d]"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-2">Año Escolar</label>
              <input
                type="text"
                required
                value={formData.anioEscolar}
                onChange={(e) => setFormData({ ...formData, anioEscolar: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5f4d]"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-2">Estado</label>
              <select
                required
                value={formData.estado}
                onChange={(e) => setFormData({ ...formData, estado: e.target.value as 'Activa' | 'Inactiva' | 'Retirado' })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5f4d]"
              >
                <option value="Activa">Activa</option>
                <option value="Inactiva">Inactiva</option>
                <option value="Retirado">Retirado</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-2">Nombre del Apoderado</label>
              <input
                type="text"
                required
                value={formData.apoderado}
                onChange={(e) => setFormData({ ...formData, apoderado: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5f4d]"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-2">Teléfono del Apoderado</label>
              <input
                type="tel"
                required
                value={formData.telefonoApoderado}
                onChange={(e) => setFormData({ ...formData, telefonoApoderado: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5f4d]"
              />
            </div>
            <div className="md:col-span-2 flex gap-4">
              <button
                type="submit"
                className="bg-[#2d5f4d] text-white px-6 py-2 rounded-lg hover:bg-[#234a3a] transition-colors"
              >
                Guardar Matrícula
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
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar por estudiante, código o DNI..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5f4d]"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-gray-700">Código</th>
                <th className="text-left py-3 px-4 text-gray-700">Estudiante</th>
                <th className="text-left py-3 px-4 text-gray-700">DNI</th>
                <th className="text-left py-3 px-4 text-gray-700">Grado/Sección</th>
                <th className="text-left py-3 px-4 text-gray-700">Año</th>
                <th className="text-left py-3 px-4 text-gray-700">Estado</th>
              </tr>
            </thead>
            <tbody>
              {filteredMatriculas.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-500">
                    No hay matrículas registradas
                  </td>
                </tr>
              ) : (
                filteredMatriculas.map((matricula) => (
                  <tr key={matricula.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-800">{matricula.codigoMatricula}</td>
                    <td className="py-3 px-4 text-gray-800">{matricula.estudiante}</td>
                    <td className="py-3 px-4 text-gray-600">{matricula.dniEstudiante}</td>
                    <td className="py-3 px-4 text-gray-600">{matricula.grado} - {matricula.seccion}</td>
                    <td className="py-3 px-4 text-gray-600">{matricula.anioEscolar}</td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs ${getEstadoColor(matricula.estado)}`}>
                        {matricula.estado}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex justify-center gap-2">
                        <button className="text-blue-600 hover:text-blue-800">
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(matricula.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-5 h-5" />
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
