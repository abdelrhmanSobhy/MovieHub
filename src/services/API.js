const API_KEY = "599bf98d65e380d6c9dc1391cf1081e8";
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchNowPlaying = async (page = 1) => {
  try {
    const res = await fetch(
      `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&page=${page}`
    );
    if (!res.ok) throw new Error("Failed to fetch movies");
    return await res.json();
  } catch (error) {
    console.error("Error fetching movies:", error);
    return { results: [] };
  }
};

export const fetchMovieDetails = async (id) => {
  const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  return res.json();
};

export const fetchMovieRecommendations = async (id) => {
  const res = await fetch(
    `${BASE_URL}/movie/${id}/recommendations?api_key=${API_KEY}`
  );
  return res.json();
};

export const searchMovies = async (query, page = 1) => {
  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`
  );
  return res.json();
};

export const fetchPopularTV = async (page = 1) => {
  try {
    const res = await fetch(
      `${BASE_URL}/tv/popular?api_key=${API_KEY}&page=${page}`
    );
    if (!res.ok) throw new Error("Failed to fetch TV shows");
    return await res.json();
  } catch (error) {
    console.error("Error fetching TV shows:", error);
    return { results: [] };
  }
};

export const fetchTvDetails = async (id) => {
  const res = await fetch(`${BASE_URL}/tv/${id}?api_key=${API_KEY}`);
  return res.json();
};

export const fetchTvRecommendations = async (id) => {
  const res = await fetch(
    `${BASE_URL}/tv/${id}/recommendations?api_key=${API_KEY}`
  );
  return res.json();
};

export const searchTVShows = async (query, page = 1) => {
  const res = await fetch(
    `${BASE_URL}/search/tv?api_key=${API_KEY}&query=${query}&page=${page}`
  );
  return res.json();
};

export const getImageUrl = (path, size = "w500") => {
  if (!path) return null;
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

export const fetchMovieCredits = async (id) => {
  const res = await fetch(
    `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
  );
  return res.json();
};

export const fetchTvCredits = async (id) => {
  try {
    const res = await fetch(
      `${BASE_URL}/tv/${id}/credits?api_key=${API_KEY}&language=en-US`
    );
    const data = await res.json();

    return {
      cast: data.cast || [],
      crew: data.crew || [],
    };
  } catch (error) {
    console.error("Error fetching TV credits:", error);
    return { cast: [], crew: [] };
  }
};

export const fetchTvSeasons = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/tv/${id}?api_key=${API_KEY}`);
    if (!res.ok) throw new Error("Failed to fetch TV seasons");
    return await res.json();
  } catch (error) {
    console.error("Error fetching TV seasons:", error);
    return null;
  }
};

export const fetchTvSeasonDetails = async (tvId, seasonNumber) => {
  try {
    const res = await fetch(
      `${BASE_URL}/tv/${tvId}/season/${seasonNumber}?api_key=${API_KEY}`
    );
    if (!res.ok) throw new Error("Failed to fetch season details");
    return await res.json();
  } catch (error) {
    console.error("Error fetching season details:", error);
    return { episodes: [] };
  }
};
