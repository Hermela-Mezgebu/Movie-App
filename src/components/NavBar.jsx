import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { searchMovies, getImageUrl } from "../services/api";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [suggestion, setSuggestion] = useState("");
  const navigate = useNavigate();

  // 🔥 Simple typo fixer (AI-like)
  const normalize = (text) =>
    text.toLowerCase().replace(/\s+/g, "").trim();

  // 🔥 Smart ranking
  const rankResults = (movies, q) => {
    const nq = normalize(q);

    return movies
      .map((m) => {
        const title = normalize(m.title || m.name || "");

        let score = 0;

        if (title.includes(nq)) score += 3; // strong match
        if (title.startsWith(nq)) score += 5; // best match
        if (title.slice(0, 3) === nq.slice(0, 3)) score += 2; // typo tolerance

        score += m.vote_average || 0; // boost popular movies

        return { ...m, score };
      })
      .sort((a, b) => b.score - a.score);
  };

  // 🔥 Auto search
  useEffect(() => {
    const delay = setTimeout(() => {
      if (query.trim()) {
        searchMovies(query).then((res) => {
          const ranked = rankResults(res, query);
          setResults(ranked);

          // suggestion (top result)
          if (ranked.length > 0) {
            setSuggestion(ranked[0].title || ranked[0].name);
          }
        });
      } else {
        setResults([]);
        setSuggestion("");
      }
    }, 400);

    return () => clearTimeout(delay);
  }, [query]);

  // 🔥 Enter → go to search
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const finalQuery = suggestion || query;
      navigate(`/search?q=${finalQuery}`);
      setResults([]);
    }
  };

  return (
    <div className="w-full px-8 pt-4 mb-6">
  <div className="relative w-full">
      
      {/* INPUT */}
     <input
  type="text"
  placeholder="Search movies..."
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  onKeyDown={handleKeyDown}
  className="w-full px-6 py-3 rounded-2xl bg-white/5 text-white outline-none text-sm"
/>


      {/* 🔥 DID YOU MEAN */}
      {suggestion && suggestion.toLowerCase() !== query.toLowerCase() && (
        <div className="absolute top-11 left-2 text-xs text-gray-400">
          Did you mean:{" "}
          <span
            className="text-brand cursor-pointer"
            onClick={() => {
              setQuery(suggestion);
              navigate(`/search?q=${suggestion}`);
              setResults([]);
            }}
          >
            {suggestion}
          </span>
        </div>
      )}

      {/* 🔥 DROPDOWN */}
      {results.length > 0 && (
        <div className="absolute top-16 left-0 w-full bg-[#111] rounded-xl shadow-lg max-h-80 overflow-y-auto z-50">
          
          {results.slice(0, 6).map((movie) => (
            <div
              key={movie.id}
              onClick={() => {
                navigate(`/movie/${movie.id}`);
                setQuery("");
                setResults([]);
              }}
              className="flex items-center gap-3 p-3 hover:bg-white/10 cursor-pointer transition"
            >
              <img
                src={getImageUrl(movie.poster_path)}
                className="w-10 h-14 object-cover rounded"
              />

              <div>
                <h4 className="text-sm font-semibold">
                  {movie.title || movie.name}
                </h4>
                <p className="text-xs text-gray-400">
                  ⭐ {movie.vote_average}
                </p>
              </div>
            </div>
          ))}

        </div>
      )}
    </div>
    </div>
  );
}