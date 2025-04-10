import ImageUpload from './imageUpload';
import './App.css';

interface AppProps {
  className?: string;
}

function App({ className }: AppProps) {
  return (
    <div className={`text-white flex flex-col items-center justify-center px-4 py-10 font-sans relative overflow-hidden ${className}`}>      
      
      {/* Hero Section */}
      <header className="w-full max-w-4xl text-center mb-4 px-4 py-8 relative z-10">
        <img 
          src="/photo-trace.png" 
          alt="PhotoTrace Logo" 
          className="w-48 h-auto mx-auto mb-4"
        />
        <p className="text-lg text-gray-300 mt-4 opacity-80">
          Upload and analyze images with the power of AI.
        </p>
      </header>

      {/* Upload Section */}
      <div className="w-full max-w-4xl bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl shadow-lg p-10 relative z-10">
        <main className="h-full">
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