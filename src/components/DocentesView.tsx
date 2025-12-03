import { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';

interface Docente {
  id: number;
  nombres: string;
  apellidos: string;
  dni: string;
  email: string;
  telefono: string;
  especialidad: string;
  usuario: string;
  contraseña: string;
}

export function DocentesView() {
  const [docentes, setDocentes] = useState<Docente[]>(() => {
    const saved = localStorage.getItem('docentes');
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
    especialidad: '',
    usuario: '',
    contraseña: '',
  });

  useEffect(() => {
    localStorage.setItem('docentes', JSON.stringify(docentes));
  }, [docentes]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newDocente: Docente = {
      id: Date.now(),
      ...formData,
    };
    setDocentes([...docentes, newDocente]);
    setFormData({
      nombres: '',
      apellidos: '',
      dni: '',
      email: '',
      telefono: '',
      especialidad: '',
      usuario: '',
      contraseña: '',
    });
    setShowForm(false);
  };

  const handleDelete = (id: number) => {
    if (confirm('¿Está seguro de eliminar este docente?')) {
      setDocentes(docentes.filter(d => d.id !== id));
    }
  };

  const filteredDocentes = docentes.filter(d =>
    d.nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.dni.includes(searchTerm)
  );

  return (
    <div className="max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-gray-800 text-3xl">Gestión de Docentes</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-[#2d5f4d] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#234a3a] transition-colors"
        >
          <Plus className="w-5 h-5" />
          Nuevo Docente
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-gray-800 text-xl mb-4">Crear Nuevo Docente</h2>
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
              <label className="block text-gray-700 text-sm mb-2">Especialidad</label>
              <input
                type="text"
                required
                value={formData.especialidad}
                onChange={(e) => setFormData({ ...formData, especialidad: e.target.value })}
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
                Guardar Docente
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
                <th className="text-left py-3 px-4 text-gray-700">Especialidad</th>
                <th className="text-left py-3 px-4 text-gray-700">Usuario</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocentes.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-500">
                    No hay docentes registrados
                  </td>
                </tr>
              ) : (
                filteredDocentes.map((docente) => (
                  <tr key={docente.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-800">{docente.nombres}</td>
                    <td className="py-3 px-4 text-gray-800">{docente.apellidos}</td>
                    <td className="py-3 px-4 text-gray-600">{docente.dni}</td>
                    <td className="py-3 px-4 text-gray-600">{docente.email}</td>
                    <td className="py-3 px-4 text-gray-600">{docente.especialidad}</td>
                    <td className="py-3 px-4 text-gray-600">{docente.usuario}</td>
                    <td className="py-3 px-4">
                      <div className="flex justify-center gap-2">
                        <button className="text-blue-600 hover:text-blue-800">
                          <Edit className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => handleDelete(docente.id)}
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
