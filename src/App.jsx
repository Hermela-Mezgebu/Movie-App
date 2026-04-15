import { Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/NavBar";

import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";

export default function App() {
  return (
    <div className="min-h-screen bg-bg-dark flex">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1 pl-64 overflow-x-hidden">
        <Navbar />

        {/* ROUTES */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>

        {/* Footer */}
        <footer className="p-8 border-t border-white/5 text-gray-500 text-sm flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span>© 2026 MovieBox</span>
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms</a>
          </div>
          <span className="px-3 py-1 bg-white/5 rounded-lg">v2.4.0</span>
        </footer>
      </div>

    </div>
  );
}