import { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, BookOpen } from 'lucide-react';

interface Curso {
  id: number;
  nombre: string;
  codigo: string;
  descripcion: string;
  grado: string;
  horas: number;
  docente: string;
}

export function CursosView() {
  const [cursos, setCursos] = useState<Curso[]>(() => {
    const saved = localStorage.getItem('cursos');
    return saved ? JSON.parse(saved) : [];
  });
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    nombre: '',
    codigo: '',
    descripcion: '',
    grado: '',
    horas: 0,
    docente: '',
  });

  useEffect(() => {
    localStorage.setItem('cursos', JSON.stringify(cursos));
  }, [cursos]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCurso: Curso = {
      id: Date.now(),
      ...formData,
    };
    setCursos([...cursos, newCurso]);
    setFormData({
      nombre: '',
      codigo: '',
      descripcion: '',
      grado: '',
      horas: 0,
      docente: '',
    });
    setShowForm(false);
  };

  const handleDelete = (id: number) => {
    if (confirm('¿Está seguro de eliminar este curso?')) {
      setCursos(cursos.filter(c => c.id !== id));
    }
  };

  const filteredCursos = cursos.filter(c =>
    c.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.grado.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-gray-800 text-3xl">Gestión de Cursos</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-[#2d5f4d] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#234a3a] transition-colors"
        >
          <Plus className="w-5 h-5" />
          Nuevo Curso
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-gray-800 text-xl mb-4">Crear Nuevo Curso</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm mb-2">Nombre del Curso</label>
              <input
                type="text"
                required
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5f4d]"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-2">Código</label>
              <input
                type="text"
                required
                value={formData.codigo}
                onChange={(e) => setFormData({ ...formData, codigo: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5f4d]"
                placeholder="Ej: MAT-101"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-700 text-sm mb-2">Descripción</label>
              <textarea
                required
                value={formData.descripcion}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5f4d]"
                rows={3}
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
              <label className="block text-gray-700 text-sm mb-2">Horas Semanales</label>
              <input
                type="number"
                required
                min="1"
                max="40"
                value={formData.horas}
                onChange={(e) => setFormData({ ...formData, horas: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5f4d]"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-2">Docente Asignado</label>
              <input
                type="text"
                required
                value={formData.docente}
                onChange={(e) => setFormData({ ...formData, docente: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5f4d]"
              />
            </div>
            <div className="md:col-span-2 flex gap-4">
              <button
                type="submit"
                className="bg-[#2d5f4d] text-white px-6 py-2 rounded-lg hover:bg-[#234a3a] transition-colors"
              >
                Guardar Curso
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
              placeholder="Buscar cursos..."
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
                <th className="text-left py-3 px-4 text-gray-700">Nombre</th>
                <th className="text-left py-3 px-4 text-gray-700">Grado</th>
                <th className="text-left py-3 px-4 text-gray-700">Horas</th>
                <th className="text-left py-3 px-4 text-gray-700">Docente</th>
              </tr>
            </thead>
            <tbody>
              {filteredCursos.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-500">
                    No hay cursos registrados
                  </td>
                </tr>
              ) : (
                filteredCursos.map((curso) => (
                  <tr key={curso.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-800">{curso.codigo}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-[#2d5f4d]" />
                        <span className="text-gray-800">{curso.nombre}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{curso.grado}</td>
                    <td className="py-3 px-4 text-gray-600">{curso.horas}h</td>
                    <td className="py-3 px-4 text-gray-600">{curso.docente}</td>
                    <td className="py-3 px-4">
                      <div className="flex justify-center gap-2">
                        <button className="text-blue-600 hover:text-blue-800">
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(curso.id)}
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
