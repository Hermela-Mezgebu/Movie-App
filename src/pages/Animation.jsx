import { useEffect, useState } from "react";
import axios from "axios";
import MovieList from "../components/MovieList";

const API_KEY = "ad5b6f6a865d6ceea211a7fe0d67e0d7";

export default function Animation() {
  const [anime, setAnime] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=16`)
      .then(res => setAnime(res.data.results));
  }, []);

  return (
    <main className="p-8">
      <MovieList title="Animation Movies" movies={anime} />
    </main>
  );
}