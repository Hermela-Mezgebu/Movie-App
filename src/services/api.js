import axios from "axios";

// 🔥 PUT YOUR REAL API KEY HERE
const API_KEY = "ad5b6f6a865d6ceea211a7fe0d67e0d7";

const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

// Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

// 🔥 HELPER FUNCTION (safe request)
const fetchData = async (url, params = {}) => {
  try {
    const res = await api.get(url, { params });
    return res.data.results;
  } catch (error) {
    console.error("API ERROR:", error);
    return [];
  }
};

// MIXED TRENDING (movie + tv)
export const getTrendingAll = async () => {
  const res = await api.get("/trending/all/day");
  return res.data.results;
};

// GET MOVIE / TV TRAILER
export const getTrailer = async (id, type = "movie") => {
  const res = await api.get(`/${type}/${id}/videos`);
  return res.data.results;
};


// 🎬 MOVIES
export const getTrendingMovies = () =>
  fetchData("/trending/movie/day");

export const getPopularMovies = () =>
  fetchData("/movie/popular");

export const getTopRatedMovies = () =>
  fetchData("/movie/top_rated");

// 📺 TV
export const getPopularTV = () =>
  fetchData("/tv/popular");

export const getTrendingTV = () =>
  fetchData("/trending/tv/day");

// 🎯 GENRE FILTER
export const getMoviesByGenre = (genreId) =>
  fetchData("/discover/movie", {
    with_genres: genreId,
  });

// 🇰🇷 K-Drama
export const getKDrama = () =>
  fetchData("/discover/tv", {
    with_original_language: "ko",
  });

export const getUpcomingMovies = async () => {
  const response = await api.get('/movie/upcoming');
  return response.data.results;
};

export const searchMovies = async (query) => {
  const response = await api.get('/search/movie', {
    params: { query },
  });
  return response.data.results;
};

export const getMovieDetails = async (id) => {
  const response = await api.get(`/movie/${id}`);
  return response.data;
};

export const getMovieCredits = async (id) => {
  const response = await api.get(`/movie/${id}/credits`);
  return response.data;
};

export const getSimilarMovies = async (id) => {
  const response = await api.get(`/movie/${id}/similar`);
  return response.data.results;
};


// 🖼️ IMAGE FIX (important)
export const getImageUrl = (path) => {
  if (!path) return "https://via.placeholder.com/300x450?text=No+Image";
  return `https://image.tmdb.org/t/p/w500${path}`;
};

export default api;
