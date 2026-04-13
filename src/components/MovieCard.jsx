import { getImageUrl } from "../services/api";
import { useState } from "react";
import TrailerModal from "../pages/TrailerModal";

export default function MovieCard({ movie }) {
  const [hover, setHover] = useState(false);

  const title = movie.title || movie.name;
  const image = movie.poster_path;

  const [video, setVideo] = useState(null);

const handlePlay = async () => {
  const vids = await getTrailer(movie.id, movie.media_type || "movie");
  const trailer = vids.find(v => v.type === "Trailer");
  if (trailer) setVideo(trailer.key);
};

  return (
    <div
      className="relative w-44 flex-shrink-0 cursor-pointer group"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* IMAGE */}
      <img
        src={getImageUrl(image)}
        className={`rounded-xl transition-all duration-300 ${
          hover ? "scale-110 brightness-75" : ""
        }`}
      />

      {/* HOVER CONTENT */}
      {hover && (
        <div className="absolute inset-0 p-3 flex flex-col justify-end bg-black/60 rounded-xl">
          <h3 className="text-sm font-bold">{title}</h3>

          <div className="flex items-center gap-2 text-xs mt-1">
            <span className="text-brand">★ {movie.vote_average}</span>
            <span>{movie.media_type === "tv" ? "TV" : "Movie"}</span>
          </div>

       <button onClick={handlePlay}>▶ Play</button>

{video && (
  <TrailerModal videoKey={video} onClose={() => setVideo(null)} />
)}

        </div>
      )}
    </div>
  );
}
