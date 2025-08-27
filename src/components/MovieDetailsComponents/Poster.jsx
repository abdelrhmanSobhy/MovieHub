import { getImageUrl } from "../../services/API";

const Poster = ({ item }) => {
  return (
    <div className="rounded-xl overflow-hidden shadow-2xl border border-gray-800">
      {item.poster_path ? (
        <img
          src={getImageUrl(item.poster_path)}
          alt={item.title || item.name}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="flex w-full h-[420px] bg-gray-800 text-gray-400 items-center justify-center flex-col">
          <div className="text-6xl mb-4">🎬</div>
          <span className="text-sm text-center px-4">No Poster Available</span>
        </div>
      )}
    </div>
  );
};

export default Poster;
