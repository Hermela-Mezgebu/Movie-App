
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Home from './pages/Home';

export default function App() {
  return (
    <div className="min-h-screen bg-bg-dark">
      <Sidebar />
      <div className="flex flex-col">
        <Navbar />
        <Home />
      </div>
      
      {/* Footer Mock */}
      <footer className="ml-64 p-8 border-t border-white/5 text-gray-500 text-sm flex justify-between items-center">
        <div className="flex items-center gap-6">
          <span>© 2026 MovieBox</span>
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
        <div className="flex items-center gap-4">
          <span className="px-3 py-1 bg-white/5 rounded-lg">v2.4.0</span>
        </div>
      </footer>
    </div>
  );
}
