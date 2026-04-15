import {
  Home,
  Tv,
  Film,
  Ghost,
  BookOpen,
  Eye,
  Smartphone,
  Download,
  Globe,
} from "lucide-react";

import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom"; // ✅ FIX ADDED

const menuItems = [
  { icon: Home, label: "Home", path: "/", active: true },
  { icon: Tv, label: "TV show", path: "/tv" },
  { icon: Film, label: "Movie", path: "/movie" },
  { icon: Ghost, label: "Animation", path: "/animation" },
  { icon: BookOpen, label: "Popular Movies", path: "/popular", badge: "🔥" },
  { icon: Eye, label: "Most Watched", path: "/watched" },
  { icon: Smartphone, label: "MovieBox App", path: "/app" },
];

export default function Sidebar() {
  const location = useLocation(); // ✅ NOW WORKS

  return (
    <aside className="w-64 h-screen bg-sidebar border-r border-white/5 flex flex-col fixed left-0 top-0 z-50">
      
      <Link to="/" className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center shadow-lg shadow-brand/20">
          <Film className="text-bg-dark" size={24} />
        </div>
        <span className="text-xl font-bold tracking-tight">MovieBox</span>
      </Link>

     <div className="px-4 mb-6 relative group">
  <button className="w-full flex items-center justify-between px-4 py-2 bg-white/5 rounded-xl text-sm text-gray-400 hover:text-white transition-colors">
    <div className="flex items-center gap-2">
      <Globe size={16} />
      <span>ENGLISH</span>
    </div>
    <span className="text-[10px]">▼</span>
  </button>

  {/* DROPDOWN */}
  <div className="absolute left-0 mt-2 w-full bg-bg-card rounded-xl shadow-lg border border-white/5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
    {["English", "Amharic", "French", "Spanish", "Arabic"].map((lang) => (
      <div
        key={lang}
        className="px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 cursor-pointer rounded-xl"
      >
        {lang}
      </div>
    ))}
  </div>
</div>
      <nav className="flex-1 px-2 space-y-1 overflow-y-auto hide-scrollbar">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;

          return (
            <Link key={index} to={item.path}>
              <motion.div
                whileHover={{ x: 4 }}
                className={`sidebar-item ${isActive ? "active" : ""}`}
              >
                <item.icon size={20} />
                <span className="text-sm">{item.label}</span>
                {item.badge && (
                  <span className="ml-auto text-xs">{item.badge}</span>
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>
    <Link to = "/app">
      <div className="p-4">
        <button className="w-full flex items-center justify-center gap-2 bg-brand hover:bg-brand-dark text-bg-dark font-bold py-3 rounded-xl transition-all shadow-lg shadow-brand/20">
          <Download size={18} />
          <span className="text-sm">Download App</span>
          <div className="ml-1 p-1 bg-bg-dark/10 rounded">
            <Smartphone size={12} />
          </div>
        </button>
      </div>
      </Link>
    </aside>
  );
}