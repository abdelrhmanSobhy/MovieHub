import { useEffect, useState } from "react";
import {
  fetchNowPlaying,
  fetchPopularTV,
  fetchMovieDetails,
  fetchTvDetails,
  getImageUrl,
} from "../services/API";
import { Link } from "react-router-dom";
import { Play, Plus } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import { motion, AnimatePresence } from "framer-motion";

const MovieSlider = () => {
  const [content, setContent] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [details, setDetails] = useState({});
  const { wishlist, toggleWishlist } = useWishlist();

  useEffect(() => {
    const fetchMixedContent = async () => {
      const [moviesData, tvData] = await Promise.all([
        fetchNowPlaying(),
        fetchPopularTV(),
      ]);

      const movies = (moviesData.results || [])
        .slice(0, 10)
        .map((item) => ({ ...item, type: "movie" }));
      const tvShows = (tvData.results || [])
        .slice(0, 10)
        .map((item) => ({ ...item, type: "tv" }));

      const mixed = [...movies, ...tvShows].sort(() => Math.random() - 0.5);
      setContent(mixed);
    };

    fetchMixedContent();
  }, []);

  // auto slide كل 5 ثواني
  useEffect(() => {
    if (!content.length) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === content.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [content]);

  useEffect(() => {
    if (content[currentIndex]) {
      const item = content[currentIndex];
      const fetchDetails =
        item.type === "movie" ? fetchMovieDetails : fetchTvDetails;

      fetchDetails(item.id).then((data) => {
        setDetails((prev) => ({
          ...prev,
          [`${item.type}_${item.id}`]: data,
        }));
      });
    }
  }, [currentIndex, content]);

  if (!content.length) return null;

  const item = content[currentIndex];
  const itemDetails = details[`${item.type}_${item.id}`] || {};

  const title = item.type === "movie" ? item.title : item.name;
  const releaseDate =
    item.type === "movie" ? item.release_date : item.first_air_date;
  const duration =
    item.type === "movie"
      ? itemDetails.runtime
        ? `${Math.floor(itemDetails.runtime / 60)}h ${
            itemDetails.runtime % 60
          }m`
        : "N/A"
      : itemDetails.number_of_seasons
      ? `${itemDetails.number_of_seasons} Season${
          itemDetails.number_of_seasons !== 1 ? "s" : ""
        }`
      : "N/A";

  return (
    <div className="relative w-full h-[68vh] md:h-[80vh] text-white overflow-hidden rounded-xl">
      {/* Slide مع إمكانية السحب + اوتوماتيك */} 
      <AnimatePresence mode="wait">
        <motion.div
          key={item.id}
          className="absolute w-full h-full"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(e, { offset }) => {
            if (offset.x < -100) {
              setCurrentIndex((prev) =>
                prev === content.length - 1 ? 0 : prev + 1
              );
            } else if (offset.x > 100) {
              setCurrentIndex((prev) =>
                prev === 0 ? content.length - 1 : prev - 1
              );
            }
          }}
        >
          {item.backdrop_path ? (
            <img
              src={getImageUrl(item.backdrop_path, "original")}
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-gray-900 to-gray-700 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <div className="text-8xl mb-4">
                  {item.type === "movie" ? "🎬" : "📺"}
                </div>
                <span className="text-xl">No Background Image</span>
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* المحتوى */} 
      <div className="relative z-10 px-6 md:px-20 flex flex-col justify-center h-full max-w-3xl">
        <p className="text-xs md:text-sm text-gray-300 mb-2">
          {item.type === "movie" ? "Duration" : "Seasons"}: {duration}
        </p>

        <div className="flex items-center gap-3 mb-3 flex-wrap text-sm md:text-base">
          <div className="flex items-center gap-1">
            <span className="text-yellow-400">⭐</span>
            <span className="text-white font-medium">
              {item.vote_average.toFixed(1)}
            </span>
          </div>
          {itemDetails.genres?.length > 0 && (
            <span className="text-gray-300">
              {itemDetails.genres.map((g) => g.name).join(" • ")}
            </span>
          )}
        </div>

        <h1 className="text-2xl md:text-5xl font-bold mb-4 leading-tight">
          {title} ({releaseDate?.slice(0, 4)})
        </h1>

        <p className="text-gray-200 text-sm md:text-lg mb-6 md:mb-8 leading-relaxed max-w-xl">
          {item.overview?.slice(0, 150)}...
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to={item.type === "movie" ? `/movie/${item.id}` : `/tv/${item.id}`}
            className="flex justify-center items-center gap-3 text-black px-8 py-3 rounded-md font-semibold transition-all duration-300 bg-yellow-400 hover:bg-yellow-500"
          >
            <Play size={20} fill="black" /> WATCH
          </Link>
          <button
            onClick={() => toggleWishlist({ ...item, type: item.type })}
            className="flex items-center justify-center gap-2 bg-black/60 hover:bg-black/80 text-white px-6 py-2 md:px-8 md:py-3 rounded-md font-semibold transition-all duration-200 cursor-pointer"
          >
            <Plus size={20} />
            {wishlist.find((m) => m.id === item.id)
              ? "REMOVE"
              : "ADD FAVOURITE"}
          </button>
        </div>
      </div>

      {/* المؤشرات */} 
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 md:gap-3">
        {content.slice(0, 10).map((_, idx) => (
          <div
            key={idx}
            className={`h-1.5 rounded-full cursor-pointer transition-all duration-300 ${
              idx === currentIndex
                ? "bg-white w-6 md:w-8"
                : "bg-gray-500 w-3 md:w-4"
            }`}
            onClick={() => setCurrentIndex(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieSlider;
