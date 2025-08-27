import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchPopularTV, searchTVShows } from "../services/API";
import { useWishlist } from "../context/WishlistContext";
import Pagination from "../components/Pagination";
import Card from "../components/Card";

const TVShows = () => {
  const [tvShows, setTvShows] = useState([]);
  const [totalPages, setTotalPages] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;
  const query = searchParams.get("query") || "";

  useEffect(() => {
    const fetchData = async () => {
      const data = query
        ? await searchTVShows(query, page)
        : await fetchPopularTV(page);

      // Validate that we have results and limit total pages to reasonable bounds
      if (data.results && data.results.length > 0) {
        setTvShows(data.results);
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
        setTvShows([]);
        setTotalPages(1);
      }
    };
    fetchData();
  }, [page, query, setSearchParams]);

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams();
    if (query) params.set("query", query);
    params.set("page", newPage.toString());
    setSearchParams(params);
  };

  // Transform TV show data to match movie card format
  const transformedTvShows = tvShows.map(show => ({
    ...show,
    title: show.name || show.original_name, // TV shows use 'name' instead of 'title'
    release_date: show.first_air_date, // TV shows use 'first_air_date' instead of 'release_date'
  }));

  return (
    <div className="space-y-8 bg-gradient-to-b from-[#0b0b10] via-[#0b0b10] to-black min-h-screen">
      <div className="pt-20">
        <h1 className="text-3xl font-bold mb-8 flex items-center text-white m-7">
          <span className="border-l-4 rounded-sm border-yellow-400 pl-3">
            TV Shows
          </span>
        </h1>

        {/* Grid of TV Shows */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
          {transformedTvShows.map((show) => (
            <Card key={show.id} movie={show} type="tv" />
          ))}
        </div>

        {/* Pagination */}
        {totalPages && totalPages > 1 && (
          <Pagination
            page={page}
            setPage={handlePageChange}
            totalPages={totalPages}
          />
        )}
      </div>
    </div>
  );
};

export default TVShows;
