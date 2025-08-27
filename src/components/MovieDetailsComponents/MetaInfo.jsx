import { Star, Calendar, Clock } from "lucide-react";

const MetaInfo = ({ item }) => {
  return (
    <div className="flex flex-wrap items-center gap-5 text-gray-400 text-sm">
      <div className="flex items-center">
        <Star className="h-5 w-5 mr-1 fill-yellow-400 text-yellow-400" />
        <span className="text-white font-semibold">
          {item.vote_average.toFixed(1)}{" "}
          <span className="text-gray-500 text-[11.5px]">/10</span>
        </span>
        <span className="ml-1">({item.vote_count} votes)</span>
      </div>
      <div className="flex items-center">
        <Calendar className="h-4 w-4 mr-1" />
        {item.release_date || item.first_air_date}
      </div>
      {"runtime" in item && (
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-1" />
          {item.runtime} min
        </div>
      )}
    </div>
  );
};

export default MetaInfo;
