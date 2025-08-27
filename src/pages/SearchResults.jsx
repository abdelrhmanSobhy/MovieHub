import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies, searchTVShows } from "../services/API";
import Pagination from "../components/Pagination";
import Card from "../components/Card";
import { FaSearch } from "react-icons/fa";

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [totalPages, setTotalPages] = useState(null);
  const [loading, setLoading] = useState(false); 
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;
  const query = searchParams.get("query") || "";
  const [searchType, setSearchType] = useState(
    searchParams.get("type") || "movie"
  );

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      setLoading(true);
      const data =
        searchType === "movie"
          ? await searchMovies(query, page)
          : await searchTVShows(query, page);

      if (data.results && data.results.length > 0) {
        setResults(data.results);
        setTotalPages(Math.min(data.total_pages || 1, 500));
      } else if (page > 1) {
        const params = new URLSearchParams();
        params.set("query", query);
        params.set("page", "1");
        if (searchType !== "movie") params.set("type", searchType);
        setSearchParams(params);
      } else {
        setResults([]);
        setTotalPages(1);
      }
      setLoading(false);
    };
    fetchData();
  }, [page, query, searchType, setSearchParams]);

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams();
    params.set("query", query);
    params.set("page", newPage.toString());
    if (searchType !== "movie") params.set("type", searchType);
    setSearchParams(params);
  };

  const transformedResults = results.map((item) => ({
    ...item,
    title: item.title || item.name || item.original_name,
    release_date: item.release_date || item.first_air_date,
  }));

  return (
    <div className="bg-gradient-to-b from-[#0b0b10] via-[#0b0b10] to-black min-h-screen pb-9">
      <div className="pt-20">
        {/* Search Type Toggle */}
        <div className="flex justify-center mb-6">
          <div className="rounded-lg p-1 flex">
            <button
              onClick={() => {
                setSearchType("movie");
                const params = new URLSearchParams();
                params.set("query", query);
                params.set("page", "1");
                params.set("type", "movie");
                setSearchParams(params);
              }}
              className={`px-4 py-2 rounded-md transition cursor-pointer ${
                searchType === "movie"
                  ? "bg-yellow-400 text-black font-semibold"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Movies
            </button>
            <button
              onClick={() => {
                setSearchType("tv");
                const params = new URLSearchParams();
                params.set("query", query);
                params.set("page", "1");
                params.set("type", "tv");
                setSearchParams(params);
              }}
              className={`px-4 py-2 rounded-md transition cursor-pointer ${
                searchType === "tv"
                  ? "bg-yellow-400 text-black font-semibold"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              TV Shows
            </button>
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-8 flex items-center text-white m-7">
          <span className="border-l-4 rounded-sm border-yellow-400 pl-3">
            {query ? `Results for "${query}"` : "Search Results"}
          </span>
        </h1>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-gray-300">
            <FaSearch className="text-gray-500  animate-spin mb-4" size={120} />
            <p className="text-2xl animate-pulse">Searching...</p>
          </div>
        ) : transformedResults.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
            {transformedResults.map((item) => (
              <Card key={item.id} movie={item} type={searchType} />
            ))}
          </div>
        ) : query ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-300 mt-12">
            <FaSearch className="text-gray-500 mb-4 animate-pulse" size={120} />
            <p className="text-2xl font-semibold tracking-wide animate-pulse text-center">
              No results found for "{query}"
            </p>
            <p className="mt-2 text-center">
              Try searching with different keywords
            </p>
          </div>
        ) : null}

        {totalPages &&
          totalPages > 1 &&
          transformedResults.length > 0 &&
          !loading && (
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

export default SearchResults;
