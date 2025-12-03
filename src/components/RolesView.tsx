import { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Shield } from 'lucide-react';

interface Rol {
  id: number;
  nombre: string;
  descripcion: string;
  permisos: string[];
}

const PERMISOS_DISPONIBLES = [
  'Gestión de Usuarios',
  'Gestión de Estudiantes',
  'Gestión de Docentes',
  'Gestión de Cursos',
  'Gestión de Matrículas',
  'Ver Reportes',
  'Exportar Datos',
  'Configuración del Sistema',
];

export function RolesView() {
  const [roles, setRoles] = useState<Rol[]>(() => {
    const saved = localStorage.getItem('roles');
    return saved ? JSON.parse(saved) : [];
  });
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    permisos: [] as string[],
  });

  useEffect(() => {
    localStorage.setItem('roles', JSON.stringify(roles));
  }, [roles]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRol: Rol = {
      id: Date.now(),
      ...formData,
    };
    setRoles([...roles, newRol]);
    setFormData({
      nombre: '',
      descripcion: '',
      permisos: [],
    });
    setShowForm(false);
  };

  const handleDelete = (id: number) => {
    if (confirm('¿Está seguro de eliminar este rol?')) {
      setRoles(roles.filter(r => r.id !== id));
    }
  };

  const togglePermiso = (permiso: string) => {
    if (formData.permisos.includes(permiso)) {
      setFormData({
        ...formData,
        permisos: formData.permisos.filter(p => p !== permiso),
      });
    } else {
      setFormData({
        ...formData,
        permisos: [...formData.permisos, permiso],
      });
    }
  };

  const filteredRoles = roles.filter(r =>
    r.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-gray-800 text-3xl">Gestión de Roles</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-[#2d5f4d] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#234a3a] transition-colors"
        >
          <Plus className="w-5 h-5" />
          Nuevo Rol
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-gray-800 text-xl mb-4">Crear Nuevo Rol</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm mb-2">Nombre del Rol</label>
              <input
                type="text"
                required
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5f4d]"
              />
            </div>
            <div>
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
              <label className="block text-gray-700 text-sm mb-2">Permisos</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {PERMISOS_DISPONIBLES.map((permiso) => (
                  <label key={permiso} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.permisos.includes(permiso)}
                      onChange={() => togglePermiso(permiso)}
                      className="w-4 h-4 text-[#2d5f4d] focus:ring-[#2d5f4d] rounded"
                    />
                    <span className="text-gray-700 text-sm">{permiso}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-[#2d5f4d] text-white px-6 py-2 rounded-lg hover:bg-[#234a3a] transition-colors"
              >
                Guardar Rol
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
              placeholder="Buscar roles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5f4d]"
            />
          </div>
        </div>

        <div className="space-y-4">
          {filteredRoles.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No hay roles registrados
            </div>
          ) : (
            filteredRoles.map((rol) => (
              <div key={rol.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="w-5 h-5 text-[#2d5f4d]" />
                      <h3 className="text-gray-800">{rol.nombre}</h3>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{rol.descripcion}</p>
                    <div className="flex flex-wrap gap-2">
                      {rol.permisos.map((permiso) => (
                        <span
                          key={permiso}
                          className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full"
                        >
                          {permiso}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-blue-600 hover:text-blue-800">
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(rol.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
