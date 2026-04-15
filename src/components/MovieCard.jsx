import { getImageUrl } from '../services/api';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function MovieCard({ movie }) {
  const title = movie.title || movie.name;
  const year = (movie.release_date || movie.first_air_date || '').split('-')[0];

  return (
    <Link to={`/movie/${movie.id}`}>
      <motion.div 
        whileHover={{ y: -8 }}
        className="flex-shrink-0 w-44 group cursor-pointer"
      >
        <div className="relative aspect-[2/3] rounded-2xl overflow-hidden mb-3 shadow-lg shadow-black/50">
          <img 
            src={getImageUrl(movie.poster_path)} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
            <div className="flex items-center gap-1 text-brand font-bold text-xs">
              <span>★</span>
              <span>{movie.vote_average.toFixed(1)}</span>
            </div>
          </div>
          
          {/* Language Badge (Mock) */}
          <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded-lg text-[10px] font-bold border border-white/10">
            English
          </div>
        </div>
        
        <h3 className="text-sm font-medium line-clamp-1 group-hover:text-brand transition-colors">
          {title}
        </h3>
        <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
          <span>{year}</span>
          <span>•</span>
          <span>Movie</span>
        </div>
      </motion.div>
    </Link>
  );
}
