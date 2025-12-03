import { Download, FileText, Users, GraduationCap, BookOpen, ClipboardList } from 'lucide-react';

export function ReportesView() {
  const downloadCSV = (data: any[], filename: string, headers: string[]) => {
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(header => {
        const key = header.toLowerCase().replace(/ /g, '');
        return `"${row[key] || ''}"`;
      }).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadJSON = (data: any[], filename: string) => {
    const jsonContent = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.json`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadEstudiantes = (format: 'csv' | 'json') => {
    const estudiantes = JSON.parse(localStorage.getItem('estudiantes') || '[]');
    if (format === 'csv') {
      downloadCSV(
        estudiantes,
        'estudiantes',
        ['Nombres', 'Apellidos', 'DNI', 'Email', 'Grado', 'Sección', 'Usuario']
      );
    } else {
      downloadJSON(estudiantes, 'estudiantes');
    }
  };

  const handleDownloadDocentes = (format: 'csv' | 'json') => {
    const docentes = JSON.parse(localStorage.getItem('docentes') || '[]');
    if (format === 'csv') {
      downloadCSV(
        docentes,
        'docentes',
        ['Nombres', 'Apellidos', 'DNI', 'Email', 'Especialidad', 'Usuario']
      );
    } else {
      downloadJSON(docentes, 'docentes');
    }
  };

  const handleDownloadCursos = (format: 'csv' | 'json') => {
    const cursos = JSON.parse(localStorage.getItem('cursos') || '[]');
    if (format === 'csv') {
      downloadCSV(
        cursos,
        'cursos',
        ['Código', 'Nombre', 'Grado', 'Horas', 'Docente']
      );
    } else {
      downloadJSON(cursos, 'cursos');
    }
  };

  const handleDownloadMatriculas = (format: 'csv' | 'json') => {
    const matriculas = JSON.parse(localStorage.getItem('matriculas') || '[]');
    if (format === 'csv') {
      downloadCSV(
        matriculas,
        'matriculas',
        ['Código Matrícula', 'Estudiante', 'DNI Estudiante', 'Grado', 'Sección', 'Año Escolar', 'Estado']
      );
    } else {
      downloadJSON(matriculas, 'matriculas');
    }
  };

  const handleDownloadRoles = (format: 'csv' | 'json') => {
    const roles = JSON.parse(localStorage.getItem('roles') || '[]');
    if (format === 'csv') {
      downloadCSV(
        roles,
        'roles',
        ['Nombre', 'Descripción']
      );
    } else {
      downloadJSON(roles, 'roles');
    }
  };

  const handleDownloadTodo = (format: 'csv' | 'json') => {
    const allData = {
      estudiantes: JSON.parse(localStorage.getItem('estudiantes') || '[]'),
      docentes: JSON.parse(localStorage.getItem('docentes') || '[]'),
      cursos: JSON.parse(localStorage.getItem('cursos') || '[]'),
      matriculas: JSON.parse(localStorage.getItem('matriculas') || '[]'),
      roles: JSON.parse(localStorage.getItem('roles') || '[]'),
    };
    
    if (format === 'json') {
      downloadJSON(allData, 'datos_completos');
    } else {
      // Para CSV, descargar cada categoría por separado
      alert('Se descargarán varios archivos CSV, uno por cada categoría');
      handleDownloadEstudiantes('csv');
      setTimeout(() => handleDownloadDocentes('csv'), 500);
      setTimeout(() => handleDownloadCursos('csv'), 1000);
      setTimeout(() => handleDownloadMatriculas('csv'), 1500);
      setTimeout(() => handleDownloadRoles('csv'), 2000);
    }
  };

  const reportCards = [
    {
      title: 'Reporte de Estudiantes',
      description: 'Descarga la lista completa de estudiantes registrados',
      icon: GraduationCap,
      color: 'bg-blue-500',
      onDownload: handleDownloadEstudiantes,
    },
    {
      title: 'Reporte de Docentes',
      description: 'Descarga la lista completa de docentes registrados',
      icon: Users,
      color: 'bg-green-500',
      onDownload: handleDownloadDocentes,
    },
    {
      title: 'Reporte de Cursos',
      description: 'Descarga la lista completa de cursos académicos',
      icon: BookOpen,
      color: 'bg-purple-500',
      onDownload: handleDownloadCursos,
    },
    {
      title: 'Reporte de Matrículas',
      description: 'Descarga la lista completa de matrículas',
      icon: ClipboardList,
      color: 'bg-orange-500',
      onDownload: handleDownloadMatriculas,
    },
    {
      title: 'Reporte de Roles',
      description: 'Descarga la lista completa de roles y permisos',
      icon: FileText,
      color: 'bg-indigo-500',
      onDownload: handleDownloadRoles,
    },
  ];

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="text-gray-800 text-3xl mb-2">Reportes y Exportación</h1>
        <p className="text-gray-600">
          Descarga reportes completos de todos los datos del sistema
        </p>
      </div>

      {/* Descarga completa */}
      <div className="bg-gradient-to-r from-[#2d5f4d] to-[#1a3a2d] rounded-lg shadow-lg p-6 mb-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl mb-2">Descarga Completa del Sistema</h2>
            <p className="text-green-100">
              Descarga todos los datos del sistema en un solo archivo
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => handleDownloadTodo('csv')}
              className="bg-white text-[#2d5f4d] px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Descargar CSV
            </button>
            <button
              onClick={() => handleDownloadTodo('json')}
              className="bg-white text-[#2d5f4d] px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Descargar JSON
            </button>
          </div>
        </div>
      </div>

      {/* Individual Reports */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reportCards.map((report, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start gap-4">
              <div className={`${report.color} w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0`}>
                <report.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-gray-800 mb-2">{report.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{report.description}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => report.onDownload('csv')}
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    CSV
                  </button>
                  <button
                    onClick={() => report.onDownload('json')}
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    JSON
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Info */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex gap-3">
          <FileText className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-blue-900 mb-1">Información sobre los reportes</h4>
            <p className="text-blue-700 text-sm">
              Los reportes incluyen todos los datos registrados en el sistema. Los archivos CSV son compatibles con Excel y hojas de cálculo. Los archivos JSON son útiles para backup completo y restauración de datos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
