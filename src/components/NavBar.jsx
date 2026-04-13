import { useState } from "react";
import { searchMovies } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const navigate = useNavigate();

  const handleSearch = async (e) => {
    const q = e.target.value;
    setQuery(q);

    if (q.length > 2) {
      try {
        const res = await searchMovies(q);
        setResults(res);
      } catch (err) {
        console.error(err);
      }
    } else {
      setResults([]);
    }
  };

  return (
    <header className="ml-64 p-6 relative">
      {/* INPUT */}
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search movies..."
        className="w-full p-3 rounded-xl bg-black text-white outline-none"
      />

      {/* RESULTS */}
      {results.length > 0 && (
        <div className="absolute bg-black w-full mt-2 rounded-xl p-2 z-50 shadow-lg">
          {results.slice(0, 6).map((item) => (
            <div
              key={item.id}
              className="p-2 hover:bg-white/10 cursor-pointer rounded"
              onClick={() => navigate(`/movie/${item.id}`)}
            >
              {item.title || item.name}
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
