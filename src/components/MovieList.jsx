import MovieCard from "./MovieCard";
import { ChevronRight } from "lucide-react";

export default function MovieList({ title, movies }) {
  return (
    <section className="py-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold tracking-tight">{title}</h2>

        <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-white">
          <span>More</span>
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}