import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { searchMovies } from "../services/api";
import MovieList from "../components/MovieList";

export default function Search() {
  const [results, setResults] = useState([]);
  const query = new URLSearchParams(useLocation().search).get("q");

  useEffect(() => {
    if (query) {
      searchMovies(query).then(setResults);
    }
  }, [query]);

  return (
    <main className="p-8">
      <MovieList title={`Search Results for "${query}"`} movies={results} />
    </main>
  );
}