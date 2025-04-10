import ImageUpload from './imageUpload';
import './App.css';
import './file.tsx';

function App() {
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
  console.log('Environment:', import.meta.env.MODE);
  console.log('API URL:', apiUrl);
  console.log('Full auth URL:', `${apiUrl}/auth/google`);

  const handleLogin = () => {
    window.location.assign(`${apiUrl}/auth/google`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex flex-col items-center justify-center px-4 py-10 font-sans relative overflow-hidden">
      
      {/* Subtle Gradient Background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-gray-800 via-gray-700 to-black opacity-60"></div>
      
      {/* Login Button */}
      <button 
        onClick={handleLogin}
        className="absolute top-4 right-4 flex items-center justify-center gap-2 bg-white text-gray-700 font-medium py-2 px-4 rounded border border-gray-300 hover:bg-gray-50 z-20"
      >
        <img 
          src="https://www.google.com/favicon.ico" 
          alt="Google" 
          className="w-5 h-5"
        />
        Sign in with Google
      </button>
      
      {/* Hero Section */}
      <header className="w-full max-w-4xl text-center mb-16 px-4 py-8 relative z-10">
        <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 drop-shadow-lg transition duration-300 ease-out">
          PhotoTrace
        </h1>
        <p className="text-lg text-gray-300 mt-4 opacity-80">
          Upload and analyze images with the power of AI.
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