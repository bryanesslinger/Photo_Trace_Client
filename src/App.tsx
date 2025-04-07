import { useState } from 'react'
import ImageUpload from './imageUpload.jsx';
import './App.css'
import './file.tsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
  <div className="App">
      <header className="App-header">
      <h1>PhotoTrace App</h1>
      </header>
      <main className="App-main">
      <ImageUpload />
      </main>
      <footer className="App-footer">
      <p>&copy; 2025 Photo Trace. All rights reserved.</p>
      </footer>
    </div>
    </>
  )
}

export default App
