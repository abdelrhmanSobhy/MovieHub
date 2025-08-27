import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { Star, Heart, ImageOff } from "lucide-react";
import { toast } from "react-toastify";

const Card = ({ movie, type = "movie" }) => {
  const { wishlist, toggleWishlist } = useWishlist();
  const isInWishlist = wishlist.find((m) => m.id === movie.id);

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    toggleWishlist({ ...movie, type });
    const isInWishlist = wishlist.find((m) => m.id === movie.id);
    if (isInWishlist)
      toast.success(`${movie.title || "Movie"} removed from Favourite!`);
    else toast.success(`${movie.title || "Movie"} added to Favourite!`);
  };

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w780${movie.poster_path}`
    : null;

  return (
    <div
      className="
        relative bg-black rounded-xl overflow-hidden shadow-lg flex flex-col
        transition-transform duration-300
        hover:scale-105
      "
    >
      {/* Poster */}
      {movie.poster_path ? (
        <img
          src={posterUrl}
          alt={movie.title}
          className="w-full h-auto object-cover"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
      ) : null}

      {/* Fallback for missing poster */}
      <div
        className={`${
          movie.poster_path ? "hidden" : "flex"
        } w-full h-[400px] md:h-[495px] bg-gray-800 text-gray-400 items-center justify-center flex-col`}
      >
        <ImageOff size={48} className="mb-2" />
        <span className="text-sm text-center px-4">No Image Available</span>
      </div>

      {/* Rating */}
      <div className="absolute top-3 left-3 flex items-center bg-yellow-400 text-black text-sm font-bold px-2 py-1 rounded-full shadow-md">
        <Star size={16} className="mr-1 fill-black" />
        {movie.vote_average.toFixed(1)}
      </div>

      {/* Wishlist Icon */}
      <button
        onClick={handleWishlistClick}
        className="absolute top-3 right-3 bg-black/70 rounded-full p-2 hover:bg-black/90 transition shadow-md z-10 cursor-pointer"
      >
        <Heart
          size={20}
          className={isInWishlist ? "text-red-500 fill-red-500" : "text-white"}
        />
      </button>

      {/* Info */}
      <div className="p-4 text-white flex flex-col flex-grow relative z-0">
        <h2
          className={` leading-tight ${
            movie.title.length > 40
              ? "font-medium text-sm"
              : "font-bold text-xl"
          }`}
        >
          {movie.title}
        </h2>
        <p className="text-sm text-gray-400">
          {movie.release_date?.slice(0, 4)}
        </p>
        <p className="text-sm text-gray-300 mt-2 line-clamp-3">
          {movie.overview || "No description available."}
        </p>

        {/* Desktop (card clickable) */}
        <Link
          to={type === "tv" ? `/tv/${movie.id}` : `/movie/${movie.id}`}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="absolute inset-0 hidden sm:block z-0"
        />

        {/* Mobile (button only) */}
        <Link
          to={type === "tv" ? `/tv/${movie.id}` : `/movie/${movie.id}`}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="mt-4 block lg:hidden text-center px-4 py-2 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition"
        >
          Details
        </Link>
      </div>
    </div>
  );
};

export default Card;
