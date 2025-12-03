import { User } from 'lucide-react';

interface PerfilViewProps {
  username: string;
  role: string | null;
}

export function PerfilView({ username, role }: PerfilViewProps) {
  return (
    <div className="max-w-4xl">
      <h1 className="text-gray-800 text-3xl mb-8">Mi Perfil</h1>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
            <User className="w-12 h-12 text-gray-400" />
          </div>
          <div>
            <h2 className="text-gray-800 text-2xl mb-1">{username}</h2>
            <p className="text-gray-600">{role}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-gray-600 text-sm">Nombre de usuario</label>
            <p className="text-gray-800">{username}</p>
          </div>
          <div>
            <label className="text-gray-600 text-sm">Rol</label>
            <p className="text-gray-800 capitalize">{role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
