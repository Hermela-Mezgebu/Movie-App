import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  getMovieDetails, 
  getMovieCredits, 
  getSimilarMovies, 
  getImageUrl 
} from '../services/api';

import { 
  Star, 
  Play, 
  Smartphone, 
  Share2, 
  Send, 
  Volume2,
  ChevronRight,
  Tv
} from 'lucide-react';

import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

import { motion } from 'framer-motion';

export default function MovieDetail() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [activeTab, setActiveTab] = useState('Episodes');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [detailData, creditsData, similarData] = await Promise.all([
          getMovieDetails(id),
          getMovieCredits(id),
          getSimilarMovies(id),
        ]);

        setMovie(detailData);
        setCast(creditsData.cast.slice(0, 12));
        setSimilar(similarData.slice(0, 6));
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    if (id) fetchData();
    window.scrollTo(0, 0);
  }, [id]);

  if (!movie) return <div className="ml-64 p-8">Loading...</div>;
return (
   <main className="p-8 pt-4">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight size={14} />
        <span className="text-gray-300">Details</span>
      </nav>

      {/* Hero Player Area */}
      <section className="relative w-full aspect-[21/9] bg-black rounded-3xl overflow-hidden mb-8 group">
        <img 
          src={getImageUrl(movie.backdrop_path)} 
          alt={movie.title}
          className="w-full h-full object-cover opacity-60"
          referrerPolicy="no-referrer"
        />
        
        {/* Mute Icon */}
        <button className="absolute top-6 right-6 w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-all">
          <Volume2 size={20} />
        </button>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-end p-10">
          <div className="flex gap-8 items-end w-full">
            {/* Poster */}
            <div className="hidden lg:block w-48 aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl shadow-black/80 flex-shrink-0">
              <img 
                src={getImageUrl(movie.poster_path)} 
                alt={movie.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="text-4xl font-black mb-4">{movie.title || movie.name}</h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300 mb-4">
                <div className="flex items-center gap-2">
                  <Tv size={16} className="text-gray-500" />
                  <span>{movie.release_date?.split('-')[0] || '2019'}</span>
                </div>
                <span className="px-2 py-0.5 border border-gray-600 rounded text-xs">R</span>
                <span>{movie.production_countries?.[0]?.name || 'United States'}</span>
                <div className="flex gap-2">
                  {movie.genres?.map((g) => (
                    <span key={g.name}>{g.name}</span>
                  ))}
                </div>
              </div>

              <p className="text-gray-300 text-sm max-w-2xl line-clamp-2 mb-6">
                {movie.overview} <span className="text-brand cursor-pointer hover:underline ml-1">More &gt;</span>
              </p>

              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 bg-brand text-bg-dark px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform">
                  <Play fill="currentColor" size={18} />
                  Watch Online
                </button>
                <button className="flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-8 py-3 rounded-xl font-bold hover:bg-white/20 transition-all">
                  <Smartphone size={18} />
                  Watch in App
                </button>
              </div>
            </div>

            {/* Rating */}
            <div className="text-right flex flex-col items-end">
              <div className="flex items-center gap-2 text-brand mb-1">
                <Star size={32} fill="currentColor" />
                <span className="text-4xl font-black">{movie.vote_average?.toFixed(1) || '8.6'}</span>
                <span className="text-gray-500 text-xl font-medium">/10</span>
              </div>
              <span className="text-xs text-gray-500">{movie.vote_count?.toLocaleString() || '847,461'} people rated</span>
            </div>
          </div>
        </div>

        {/* Social Share Bar */}
        <div className="absolute bottom-6 right-10 flex items-center gap-3">
          <button className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-all"><Share2 size={16} /></button>
          <button className="w-8 h-8 bg-[#1877F2] rounded-lg flex items-center justify-center hover:opacity-80 transition-all"><FaFacebook size={16} /></button>
          <button className="w-8 h-8 bg-[#1DA1F2] rounded-lg flex items-center justify-center hover:opacity-80 transition-all"><FaTwitter size={16} /></button>
          <button className="w-8 h-8 bg-[#0A66C2] rounded-lg flex items-center justify-center hover:opacity-80 transition-all"><FaLinkedin size={16} /></button>
          <button className="w-8 h-8 bg-[#0088CC] rounded-lg flex items-center justify-center hover:opacity-80 transition-all"><Send size={16} /></button>
          <button className="w-8 h-8 bg-[#FF4500] rounded-lg flex items-center justify-center hover:opacity-80 transition-all">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.056 1.597.012.145.021.29.021.437 0 2.345-2.543 4.252-5.665 4.252-3.122 0-5.665-1.907-5.665-4.252 0-.15.007-.29.02-.431a1.75 1.75 0 0 1-1.054-1.603c0-.968.786-1.754 1.754-1.754.463 0 .89.18 1.204.476 1.187-.854 2.835-1.422 4.652-1.501l.886-4.153 3.3.695c.09-.326.382-.57.737-.57zm-7.874 9.264c-.61 0-1.1.49-1.1 1.1 0 .61.49 1.1 1.1 1.1.61 0 1.1-.49 1.1-1.1 0-.61-.49-1.1-1.1-1.1zm4.34 0c-.61 0-1.1.49-1.1 1.1 0 .61.49 1.1 1.1 1.1.61 0 1.1-.49 1.1-1.1 0-.61-.49-1.1-1.1-1.1zm-1.764 3.991c-1.03 0-1.94-.487-2.512-1.256-.089-.126-.061-.3.065-.389.125-.089.3-.061.389.065.436.583 1.12.95 1.908.95.788 0 1.472-.367 1.908-.95.089-.126.264-.154.389-.065.126.089.154.263.065.389-.572.769-1.482 1.256-2.512 1.256z"/></svg>
          </button>
        </div>
      </section>

  {/* Tabs and Content */}
<div className="flex gap-12">
  <div className="flex-1">
    {/* Tabs */}
    <div className="flex gap-8 border-b border-white/5 mb-8">
      {['Episodes', 'Top Cast', 'User Review'].map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`pb-4 text-sm font-bold transition-all relative ${activeTab === tab ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
        >
          {tab}
          {activeTab === tab && (
            <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand" />
          )}
        </button>
      ))}
    </div>

    {/* Episodes */}
    <div className="mb-12">
      <h2 className="text-xl font-bold mb-6">Episodes</h2>
      <div className="flex gap-3 mb-8">
        {['film', 'lklk', 'Netflix', 'Plex'].map(tag => (
          <span key={tag} className="px-4 py-1.5 bg-white/5 rounded-full text-xs text-gray-400 hover:bg-white/10">
            {tag}
          </span>
        ))}
      </div>
    </div>

    {/* Cast */}
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Top Cast({cast.length})</h2>
        <button className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10">
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="flex gap-6 overflow-x-auto whitespace-nowrap hide-scrollbar pb-4">
        {cast.map((person) => (
          <div key={person.id} className="flex-shrink-0 w-32">
            <div className="aspect-square rounded-2xl overflow-hidden mb-3 bg-white/5">
              <img
                src={getImageUrl(person.profile_path)}
                alt={person.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h4 className="text-sm font-bold line-clamp-1">{person.name}</h4>
            <p className="text-xs text-gray-500 line-clamp-1">{person.character}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Review */}
    <div>
      <h2 className="text-xl font-bold mb-6">User Review</h2>
      <div className="bg-white/5 rounded-3xl p-6 flex gap-4">
        <div className="w-12 h-12 rounded-full bg-brand/20 flex items-center justify-center text-brand font-bold">P</div>
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="font-bold">Philipino</span>
            <span className="text-xs text-gray-500">14/04/2026 05:35</span>
          </div>
          <p className="text-sm text-gray-400">
            Hello team, this episode is in Russian not English kindly look into it
          </p>
        </div>
      </div>
    </div>
  </div>

  {/* Sidebar (ONLY ONCE) */}
  <div className="w-64 flex-shrink-0">
    <h2 className="text-xl font-bold mb-6">More like this</h2>
    <div className="space-y-6">
      {similar.map((m) => (
        <Link key={m.id} to={`/movie/${m.id}`} className="block group">
          <div className="aspect-[2/3] rounded-2xl overflow-hidden mb-2 shadow-lg">
            <img
              src={getImageUrl(m.poster_path)}
              alt={m.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <h4 className="text-sm font-bold group-hover:text-brand line-clamp-1">
            {m.title || m.name}
          </h4>
        </Link>
      ))}
    </div>
  </div>
</div>
    </main>
  );
}