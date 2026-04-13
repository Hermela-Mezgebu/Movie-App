import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api, { getImageUrl } from "../services/api";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const res = await api.get(`/movie/${id}`);
      setMovie(res.data);
    };
    fetch();
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="p-10 text-white">
      <img
        src={getImageUrl(movie.backdrop_path)}
        className="w-full h-[400px] object-cover rounded-xl"
      />

      <h1 className="text-4xl mt-4">{movie.title}</h1>
      <p className="text-gray-400 mt-2">{movie.overview}</p>
    </div>
  );
}
