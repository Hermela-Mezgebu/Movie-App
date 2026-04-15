import { useEffect, useState } from "react";
import { getImageUrl } from "../services/api";
import MovieList from "../components/MovieList";
import axios from "axios";

const API_KEY = "ad5b6f6a865d6ceea211a7fe0d67e0d7";

export default function Tv() {
  const [tvShows, setTvShows] = useState([]);

  useEffect(() => {
    const fetchTV = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/trending/tv/day?api_key=${API_KEY}`
      );
      setTvShows(res.data.results);
    };

    fetchTV();
  }, []);

  return (
    <main className="p-8">
      <MovieList title="Trending TV Shows" movies={tvShows} />
    </main>
  );
}