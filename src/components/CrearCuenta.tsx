import { useState } from 'react';
import { ArrowLeft, UserPlus, AlertCircle } from 'lucide-react';
import escudo from 'figma:asset/ffa68e596f973ae6cb0c3023782797cbd6c48814.png';

interface CrearCuentaProps {
  onBack: () => void;
  onSuccess: () => void;
}

export function CrearCuenta({ onBack, onSuccess }: CrearCuentaProps) {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    dni: '',
    email: '',
    telefono: '',
    usuario: '',
    contraseña: '',
    confirmarContraseña: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validaciones
    if (formData.contraseña !== formData.confirmarContraseña) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (formData.contraseña.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    // Verificar si el usuario ya existe
    const administradores = JSON.parse(localStorage.getItem('administradores') || '[]');
    
    const usuarioExiste = administradores.some((u: any) => 
      u.usuario === formData.usuario || u.dni === formData.dni || u.email === formData.email
    );

    if (usuarioExiste) {
      setError('El usuario, DNI o email ya está registrado');
      return;
    }

    // Crear nuevo administrador
    const nuevoAdmin = {
      id: Date.now(),
      nombres: formData.nombres,
      apellidos: formData.apellidos,
      dni: formData.dni,
      email: formData.email,
      telefono: formData.telefono,
      usuario: formData.usuario,
      contraseña: formData.contraseña,
    };

    // Guardar en localStorage
    administradores.push(nuevoAdmin);
    localStorage.setItem('administradores', JSON.stringify(administradores));

    setSuccess('¡Cuenta administrativa creada exitosamente! Redirigiendo al login...');
    
    // Limpiar formulario
    setFormData({
      nombres: '',
      apellidos: '',
      dni: '',
      email: '',
      telefono: '',
      usuario: '',
      contraseña: '',
      confirmarContraseña: '',
    });

    // Redirigir después de 2 segundos
    setTimeout(() => {
      onSuccess();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={onBack}
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-3 flex-1">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md p-2">
                <img src={escudo} alt="Escudo CRL Juan Valer Sandoval" className="w-full h-full object-contain" />
              </div>
              <h1 className="text-gray-800 text-2xl">Crear Nueva Cuenta</h1>
            </div>
          </div>

          {/* Mensajes */}
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2">
              <UserPlus className="w-5 h-5 flex-shrink-0" />
              <span>{success}</span>
            </div>
          )}

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Datos Personales */}
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-gray-800 mb-4">Datos Personales</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm mb-2">Nombres *</label>
                  <input
                    type="text"
                    required
                    value={formData.nombres}
                    onChange={(e) => setFormData({ ...formData, nombres: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5f4d]"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-2">Apellidos *</label>
                  <input
                    type="text"
                    required
                    value={formData.apellidos}
                    onChange={(e) => setFormData({ ...formData, apellidos: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5f4d]"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-2">DNI *</label>
                  <input
                    type="text"
                    required
                    maxLength={8}
                    value={formData.dni}
                    onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5f4d]"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5f4d]"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-2">Teléfono *</label>
                  <input
                    type="tel"
                    required
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5f4d]"
                  />
                </div>
              </div>
            </div>

            {/* Credenciales de acceso */}
            <div>
              <h3 className="text-gray-800 mb-4">Credenciales de Acceso</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-gray-700 text-sm mb-2">Usuario *</label>
                  <input
                    type="text"
                    required
                    value={formData.usuario}
                    onChange={(e) => setFormData({ ...formData, usuario: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5f4d]"
                    placeholder="Nombre de usuario para iniciar sesión"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-2">Contraseña *</label>
                  <input
                    type="password"
                    required
                    value={formData.contraseña}
                    onChange={(e) => setFormData({ ...formData, contraseña: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5f4d]"
                    placeholder="Mínimo 6 caracteres"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-2">Confirmar Contraseña *</label>
                  <input
                    type="password"
                    required
                    value={formData.confirmarContraseña}
                    onChange={(e) => setFormData({ ...formData, confirmarContraseña: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5f4d]"
                  />
                </div>
              </div>
            </div>

            {/* Botones */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 bg-[#2d5f4d] text-white py-3 rounded-lg hover:bg-[#234a3a] transition-colors flex items-center justify-center gap-2"
              >
                <UserPlus className="w-5 h-5" />
                Crear Cuenta
              </button>
              <button
                type="button"
                onClick={onBack}
                className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}