import { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';

interface Estudiante {
  id: number;
  nombres: string;
  apellidos: string;
  dni: string;
  email: string;
  telefono: string;
  direccion: string;
  grado: string;
  seccion: string;
  nombrePadre: string;
  telefonoPadre: string;
  usuario: string;
  contraseña: string;
}

export function EstudiantesView() {
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>(() => {
    const saved = localStorage.getItem('estudiantes');
    return saved ? JSON.parse(saved) : [];
  });
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    dni: '',
    email: '',
    telefono: '',
    direccion: '',
    grado: '',
    seccion: '',
    nombrePadre: '',
    telefonoPadre: '',
    usuario: '',
    contraseña: '',
  });

  useEffect(() => {
    localStorage.setItem('estudiantes', JSON.stringify(estudiantes));
  }, [estudiantes]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEstudiante: Estudiante = {
      id: Date.now(),
      ...formData,
    };
    setEstudiantes([...estudiantes, newEstudiante]);
    setFormData({
      nombres: '',
      apellidos: '',
      dni: '',
      email: '',
      telefono: '',
      direccion: '',
      grado: '',
      seccion: '',
      nombrePadre: '',
      telefonoPadre: '',
      usuario: '',
      contraseña: '',
    });
    setShowForm(false);
  };

  const handleDelete = (id: number) => {
    if (confirm('¿Está seguro de eliminar este estudiante?')) {
      setEstudiantes(estudiantes.filter(e => e.id !== id));
    }
  };

  const filteredEstudiantes = estudiantes.filter(e =>
    e.nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.dni.includes(searchTerm)
  );

  return (
    <div className="max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-gray-800 text-3xl">Gestión de Estudiantes</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-[#2d5f4d] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#234a3a] transition-colors"
        >
          <Plus className="w-5 h-5" />
          Nuevo Estudiante
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-gray-800 text-xl mb-4">Crear Nuevo Estudiante</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm mb-2">Nombres</label>
              <input
                type="text"
                required
                value={formData.nombres}
                onChange={(e) => setFormData({ ...formData, nombres: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5f4d]"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-2">Apellidos</label>
              <input
                type="text"
                required
                value={formData.apellidos}
                onChange={(e) => setFormData({ ...formData, apellidos: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5f4d]"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-2">DNI</label>
              <input
                type="text"
                required
                value={formData.dni}
                onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5f4d]"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-2">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5f4d]"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-2">Teléfono</label>
              <input
                type="tel"
                required
                value={formData.telefono}
                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5f4d]"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-2">Dirección</label>
              <input
                type="text"
                required
                value={formData.direccion}
                onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
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
              <label className="block text-gray-700 text-sm mb-2">Nombre del Padre/Apoderado</label>
              <input
                type="text"
                required
                value={formData.nombrePadre}
                onChange={(e) => setFormData({ ...formData, nombrePadre: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5f4d]"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-2">Teléfono del Padre/Apoderado</label>
              <input
                type="tel"
                required
                value={formData.telefonoPadre}
                onChange={(e) => setFormData({ ...formData, telefonoPadre: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5f4d]"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-2">Usuario</label>
              <input
                type="text"
                required
                value={formData.usuario}
                onChange={(e) => setFormData({ ...formData, usuario: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5f4d]"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-2">Contraseña</label>
              <input
                type="password"
                required
                value={formData.contraseña}
                onChange={(e) => setFormData({ ...formData, contraseña: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5f4d]"
              />
            </div>
            <div className="md:col-span-2 flex gap-4">
              <button
                type="submit"
                className="bg-[#2d5f4d] text-white px-6 py-2 rounded-lg hover:bg-[#234a3a] transition-colors"
              >
                Guardar Estudiante
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
              placeholder="Buscar por nombre, apellido o DNI..."
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
                <th className="text-left py-3 px-4 text-gray-700">Nombres</th>
                <th className="text-left py-3 px-4 text-gray-700">Apellidos</th>
                <th className="text-left py-3 px-4 text-gray-700">DNI</th>
                <th className="text-left py-3 px-4 text-gray-700">Email</th>
                <th className="text-left py-3 px-4 text-gray-700">Grado</th>
                <th className="text-left py-3 px-4 text-gray-700">Sección</th>
                <th className="text-left py-3 px-4 text-gray-700">Usuario</th>
              </tr>
            </thead>
            <tbody>
              {filteredEstudiantes.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-gray-500">
                    No hay estudiantes registrados
                  </td>
                </tr>
              ) : (
                filteredEstudiantes.map((estudiante) => (
                  <tr key={estudiante.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-800">{estudiante.nombres}</td>
                    <td className="py-3 px-4 text-gray-800">{estudiante.apellidos}</td>
                    <td className="py-3 px-4 text-gray-600">{estudiante.dni}</td>
                    <td className="py-3 px-4 text-gray-600">{estudiante.email}</td>
                    <td className="py-3 px-4 text-gray-600">{estudiante.grado}</td>
                    <td className="py-3 px-4 text-gray-600">{estudiante.seccion}</td>
                    <td className="py-3 px-4 text-gray-600">{estudiante.usuario}</td>
                    <td className="py-3 px-4">
                      <div className="flex justify-center gap-2">
                        <button className="text-blue-600 hover:text-blue-800">
                          <Edit className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => handleDelete(estudiante.id)}
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
