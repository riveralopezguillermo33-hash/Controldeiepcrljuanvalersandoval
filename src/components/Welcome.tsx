import escudo from 'figma:asset/ffa68e596f973ae6cb0c3023782797cbd6c48814.png';

interface WelcomeProps {
  onEnter: () => void;
}

export function Welcome({ onEnter }: WelcomeProps) {
  return (
    <div className="min-h-screen bg-[#2d5f4d] flex flex-col items-center justify-center px-4">
      <div className="text-center">
        {/* Logo Container */}
        <div className="mb-8 flex justify-center">
          <div className="w-40 h-40 bg-white rounded-2xl flex items-center justify-center shadow-lg p-4">
            <img src={escudo} alt="Escudo CRL Juan Valer Sandoval" className="w-full h-full object-contain" />
          </div>
        </div>

        {/* Welcome Text */}
        <h1 className="text-white text-3xl md:text-4xl mb-4">
          Bienvenidos al Sistema del Colegio
        </h1>
        <h2 className="text-white text-xl md:text-2xl mb-12">
          CRL. Juan Valer Sandoval
        </h2>

        {/* Button */}
        <button
          onClick={onEnter}
          className="bg-white text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Ingresar al Sistema
        </button>
      </div>
    </div>
  );
}
