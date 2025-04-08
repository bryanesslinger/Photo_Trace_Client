import ImageUpload from './imageUpload.jsx';
import './App.css';
import './file.tsx';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex flex-col items-center justify-center px-4 py-10 font-sans relative overflow-hidden">
      
      {/* Subtle Gradient Background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-gray-800 via-gray-700 to-black opacity-60"></div>
      
      {/* Hero Section */}
      <header className="w-full max-w-4xl text-center mb-16 px-4 py-8 relative z-10">
        <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 drop-shadow-lg transition duration-300 ease-out">
          PhotoTrace
        </h1>
        <p className="text-lg text-gray-300 mt-4 opacity-80">
          Upload and analyze images with the power of AI.
        </p>
        <p className="text-sm text-gray-400 mt-2 mb-6 opacity-70">
          Smart, clean, and effortless—transform your photos with style.
        </p>
      </header>

      {/* Upload Section */}
      <div className="w-full max-w-4xl bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl shadow-lg p-10 relative z-10">
        <main>
          <ImageUpload />
        </main>

        <footer className="mt-10 text-center text-sm text-gray-400 border-t border-white/10 pt-6">
          &copy; 2025 PhotoTrace. All rights reserved.
        </footer>
      </div>
    </div>
  );
}

export default App;