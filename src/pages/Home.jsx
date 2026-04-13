import { useEffect, useState } from "react";
import {
  getTrendingAll,
  getPopularMovies,
  getTopRatedMovies,
  getPopularTV,
  getMoviesByGenre,
  getImageUrl,
} from "../services/api";

import MovieList from "../components/MovieList";

export default function Home() {
  const [hero, setHero] = useState([]);
  const [index, setIndex] = useState(0);

  const [popularMovies, setPopularMovies] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const trending = await getTrendingAll();
      const popular = await getPopularMovies();
      const top = await getTopRatedMovies();
      const tv = await getPopularTV();
      const action = await getMoviesByGenre(28);

      // FILTER ONLY WITH IMAGES
      const valid = trending.filter(
        (m) => m.backdrop_path && m.poster_path
      );

      setHero(valid.slice(0, 5));
      setPopularMovies(popular);
      setTopRated(top);
      setTvShows(tv);
      setActionMovies(action);
    };

    fetchData();
  }, []);

  // AUTO SLIDE
  useEffect(() => {
    if (!hero.length) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % hero.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [hero]);

  const next = () => {
    setIndex((prev) => (prev + 1) % hero.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + hero.length) % hero.length);
  };

  const current = hero[index];

  return (
    <main className="ml-64 p-8 pt-0">

      {/* HERO */}
      {current && (
        <div className="relative h-[500px] rounded-3xl overflow-hidden mb-10 group">

          <img
            src={getImageUrl(current.backdrop_path)}
            className="w-full h-full object-cover transition-all duration-700"
          />

          {/* overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />

          {/* TEXT */}
          <div className="absolute left-10 top-1/2 -translate-y-1/2 max-w-xl">
            <h1 className="text-5xl font-bold mb-4">
              {current.title || current.name}
            </h1>

            <p className="text-gray-300 mb-6 line-clamp-3">
              {current.overview}
            </p>

            <button className="bg-brand px-6 py-3 rounded-xl font-bold hover:scale-105">
              ▶ Watch Now
            </button>
          </div>

          {/* LEFT ARROW */}
          <button
            onClick={prev}
            className="absolute left-5 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full opacity-0 group-hover:opacity-100"
          >
            ◀
          </button>

          {/* RIGHT ARROW */}
          <button
            onClick={next}
            className="absolute right-5 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full opacity-0 group-hover:opacity-100"
          >
            ▶
          </button>

          {/* DOTS */}
          <div className="absolute bottom-6 right-10 flex gap-2">
            {hero.map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full ${
                  i === index ? "w-6 bg-brand" : "w-2 bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* ROWS */}
      <MovieList title="🔥 Trending Now" movies={hero} />
      <MovieList title="Popular Movies" movies={popularMovies} />
      <MovieList title="Top Rated" movies={topRated} />
      <MovieList title="TV Shows" movies={tvShows} />
      <MovieList title="Action Movies" movies={actionMovies} />

    </main>
  );
}
