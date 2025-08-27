import {
  FaStar,
  FaHeart,
  FaRegClock,
  FaCalendarAlt,
  FaInfoCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const WishlistCard = ({ item, onRemove }) => {
  const navigate = useNavigate();

  const isLongDescription = item.overview && item.overview.length > 180;

  const handleRemove = () => {
    Swal.fire({
      theme: 'dark',
      title: "Are you sure?",
      text: "Do you want to remove this movie from your Favourite?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        onRemove(item);
        toast.success(`${item.title || "Movie"} removed from Favourite!`);
      }
    });
  };

  return (
    <div className="flex flex-col lg:flex-row bg-gradient-to-b from-[#0b0b10] via-[#0b0b10] to-black shadow-xl rounded-2xl overflow-hidden min-h-72 border border-gray-700 hover:shadow-2xl hover:scale-[1.02] transition duration-300">
      {/* Poster */}
      <img
        src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
        alt={item.title || item.name}
        className="w-full lg:w-40 object-cover"
      />

      {/* Details */}
      <div className="flex-1 p-4 relative flex flex-col text-gray-200">
        {/* Title + Buttons */}
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-bold text-white">
            {item.title || item.name}
          </h2>
          <div className="flex gap-3">
            <button
              onClick={() =>
                navigate(
                  item.type === "tv" ? `/tv/${item.id}` : `/movie/${item.id}`
                )
              }
              title="Details"
              className="text-blue-400 hover:text-blue-500 duration-300 cursor-pointer animate-pulse"
            >
              <FaInfoCircle size={20} />
            </button>
            <button onClick={handleRemove} title="Remove">
              <FaHeart
                className="text-red-500 hover:text-red-600 duration-300 cursor-pointer animate-pulse"
                size={20}
              />
            </button>
          </div>
        </div>

        {/* Release date + Duration */}
        <div className="flex items-center text-sm text-gray-400 mt-2 gap-4 flex-wrap">
          {item.release_date && (
            <span className="flex items-center">
              <FaCalendarAlt className="mr-1 text-gray-500" />{" "}
              {item.release_date}
            </span>
          )}
          {item.runtime && (
            <span className="flex items-center">
              <FaRegClock className="mr-1 text-gray-500" /> {item.runtime} min
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center mt-2">
          {Array.from({ length: 5 }, (_, i) => (
            <FaStar
              key={i}
              className={
                i < Math.round(item.vote_average / 2)
                  ? "text-yellow-400"
                  : "text-gray-600"
              }
            />
          ))}
          <span className="ml-2 text-gray-400 text-sm">
            {item.vote_average?.toFixed(1)}/10
          </span>
        </div>

        {/* Description */}
        <p
          className={`text-gray-300 mt-4 leading-relaxed line-clamp-4 ${
            isLongDescription ? "text-sm" : "text-base"
          }`}
        >
          {item.overview || "No description available."}
        </p>
      </div>
    </div>
  );
};

export default WishlistCard;
