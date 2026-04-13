import {
  Home,
  Tv,
  Film,
  Ghost,
  BookOpen,
  Eye,
  Smartphone,
  Download,
  Gamepad2,
  History,
  Globe,
} from "lucide-react";

import { motion } from "framer-motion";

const menuItems = [
  { icon: Home, label: "Home", active: true },
  { icon: Tv, label: "TV show" },
  { icon: Film, label: "Movie" },
  { icon: Ghost, label: "Animation" },
  { icon: BookOpen, label: "Popular Movies", badge: "🔥" },
  { icon: Eye, label: "Most Watched" },
  { icon: Smartphone, label: "MovieBox App" },
 
];

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-[#0f172a] flex flex-col fixed left-0 top-0 z-50">
      <div className="p-6 flex items-center gap-3">
        <Film size={24} />
        <span className="text-xl font-bold">MovieBox</span>
      </div>

      <div className="px-4 mb-6">
        <button className="w-full flex justify-between px-4 py-2 bg-white/5 rounded-xl text-sm">
          <div className="flex gap-2">
            <Globe size={16} />
            ENGLISH
          </div>
          ▼
        </button>
      </div>

      <nav className="flex-1 px-2 space-y-1">
        {menuItems.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ x: 4 }}
            className="flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer hover:bg-white/10"
          >
            <item.icon size={20} />
            {item.label}
          </motion.div>
        ))}
      </nav>
    </aside>
  );
}