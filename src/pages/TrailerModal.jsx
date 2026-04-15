import { motion } from "framer-motion";

export default function TrailerModal({ videoKey, onClose }) {
  if (!videoKey) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="relative w-[800px] h-[450px] bg-black rounded-xl overflow-hidden">
        
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-white text-black px-3 py-1 rounded"
        >
          ✕
        </button>

        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoKey}`}
          title="Trailer"
          allowFullScreen
        />
      </div>
    </div>
  );
}