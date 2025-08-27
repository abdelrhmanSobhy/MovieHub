import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ onSearch = () => {}, small = false }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      // Navigate to search results page with query parameter
      navigate(
        `/search?query=${encodeURIComponent(query.trim())}&page=1&type=movie`
      );
      onSearch(query);
      setQuery("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full">
      <div className="relative w-full">
        <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 ${small ? "h-4 w-4" : "h-5 w-5"}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18.5a7.5 7.5 0 006.15-3.85z"
            />
          </svg>
        </span>

        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={`w-full ${
            small ? "h-8 pl-8 text-sm" : "md:w-80 h-10 pl-10"
          } pr-3 rounded-full border border-white/10 bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 duration-300`}
        />
      </div>

      <button
        type="submit"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`${
          small ? "h-8 px-3 text-xs" : "h-10 px-4"
        } rounded-full bg-yellow-400 text-black font-semibold hover:bg-yellow-500 transition duration-300 cursor-pointer`}
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
