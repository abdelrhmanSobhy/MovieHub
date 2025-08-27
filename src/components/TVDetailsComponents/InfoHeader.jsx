import { Heart, ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const InfoHeader = ({ item, wishlist, toggleWishlist }) => {
  const navigate = useNavigate();
  const isInWishlist = wishlist.find((m) => m.id === item.id);

  const handleWishlist = () => {
    toggleWishlist({ ...item, type: "tv" });
    if (isInWishlist)
      toast.success(`${item.name || "TV Show"} removed from Favourite!`);
    else toast.success(`${item.name || "TV Show"} added to Favourite!`);
  };

  return (
    <div className="flex justify-between items-center sm:justify-end gap-2">
      {/* Desktop Favourite */}
      <div className="hidden sm:flex">
        <button
          onClick={handleWishlist}
          className="px-4 py-2 rounded-lg flex items-center gap-2 text-red-500 hover:text-red-700 duration-300 shadow-md cursor-pointer "
        >
          <Heart
            className={`h-6.5 w-6.5 ${
              isInWishlist ? "fill-red-500 text-red-500" : ""
            }`}
          />
          <span className="hidden ">
            {isInWishlist ? "Remove from Favourite" : "Add to Favourite"}
          </span>
        </button>
      </div>

      {/* Mobile Buttons above poster */}
      <div className="flex md:hidden justify-between items-center gap-2 absolute top-10 left-4 right-4 z-50">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-300 hover:text-white transition cursor-pointer animate-pulse"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back
        </button>
        <button
          onClick={handleWishlist}
          className="px-4 py-2 rounded-lg flex items-center gap-2 text-red-500 hover:text-red-500/70 duration-300 shadow-md cursor-pointer "
        >
          <Heart
            className={`h-6.5 w-6.5 ${
              isInWishlist ? "fill-red-500 text-red-500" : ""
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default InfoHeader;