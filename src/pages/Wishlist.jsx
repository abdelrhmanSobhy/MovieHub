import { useWishlist } from "../context/WishlistContext";
import WishlistCard from "../components/WishlistCard";
import { FaHeartBroken } from "react-icons/fa";

const Wishlist = () => {
  const { wishlist, toggleWishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#0b0b10] via-[#0b0b10] to-black text-gray-300">
        <FaHeartBroken
          className="text-gray-500 mb-4 animate-pulse"
          size={150}
        />
        <p className="text-2xl font-semibold tracking-wide animate-pulse">
          Favourite is Empty..
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0b10] via-[#0b0b10] to-black text-white pt-15">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-8 flex items-center">
          <span className="border-l-4 rounded-sm border-yellow-400 pl-3">
            My Favourite{" "}
            <span className="text-lg text-gray-400 font-medium ml-1">
              [ {wishlist.length} ]
            </span>
          </span>
        </h1>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {wishlist.map((item) => (
            <WishlistCard key={item.id} item={item} onRemove={toggleWishlist} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
