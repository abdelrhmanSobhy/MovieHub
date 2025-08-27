import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchNowPlaying, searchMovies } from "../services/API";
import Pagination from "../components/Pagination";
import MovieSlider from "../components/MovieSlider";
import Card from "../components/Card"; 

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;
  const query = searchParams.get("query") || "";

  useEffect(() => {
    const fetchData = async () => {
      const data = query
        ? await searchMovies(query, page)
        : await fetchNowPlaying(page);

      // Validate that we have results and limit total pages to reasonable bounds
      if (data.results && data.results.length > 0) {
        setMovies(data.results);
        // Limit total pages to 500 to prevent navigation to empty pages
        setTotalPages(Math.min(data.total_pages || 1, 500));
      } else if (page > 1) {
        // If no results and we're not on page 1, redirect to page 1
        const params = new URLSearchParams();
        if (query) params.set("query", query);
        params.set("page", "1");
        setSearchParams(params);
      } else {
        // No results on page 1
        setMovies([]);
        setTotalPages(1);
      }
    };
    fetchData();
  }, [page, query, setSearchParams]);

  const handlePageChange = (newPage) => {
    setSearchParams(query ? { query, page: newPage } : { page: newPage });
  };

  return (
    <div className="space-y-8 bg-gradient-to-b from-[#0b0b10] via-[#0b0b10] to-black min-h-screen">
      {/* Slider */}
      <MovieSlider />

      <h1 className="text-3xl font-bold mb-8 flex items-center text-white m-7">
        <span className="border-l-4 rounded-sm border-yellow-400 pl-3">
          Movies
        </span>
      </h1>

      {/* Grid of Movies */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        {movies.map((movie) => (
          <Card key={movie.id} movie={movie} type="movie" />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        page={page}
        setPage={handlePageChange}
        totalPages={totalPages}
      />
    </div>
  );
};

export default Home;
