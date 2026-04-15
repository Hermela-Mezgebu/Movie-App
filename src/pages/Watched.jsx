import { useEffect, useState } from "react";
import axios from "axios";
import MovieList from "../components/MovieList";

const API_KEY = "ad5b6f6a865d6ceea211a7fe0d67e0d7";

export default function Watched() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`)
      .then(res => setMovies(res.data.results));
  }, []);

  return (
    <main className="p-8">
      <MovieList title="Top Rated Movies" movies={movies} />
    </main>
  );
}