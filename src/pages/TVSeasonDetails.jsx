import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchTvSeasonDetails } from "../services/API";
import { FaStar, FaRegClock, FaCalendarAlt } from "react-icons/fa";

const TVSeasonDetails = () => {
  const { id, seasonNumber } = useParams();
  const [season, setSeason] = useState(null);

  useEffect(() => {
    const loadSeason = async () => {
      const data = await fetchTvSeasonDetails(id, seasonNumber);
      setSeason(data);
    };
    loadSeason();
  }, [id, seasonNumber]);

  if (!season) return <p className="text-white p-4">Loading...</p>;

  return (
    <div className="bg-gradient-to-b from-[#0b0b10] via-[#0b0b10] to-black text-white pt-15">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-8 flex items-center">
          <span className="border-l-4 rounded-sm border-yellow-400 pl-3">
            {season.name}
            <span className="text-lg text-gray-400 font-medium ml-2">
              Episodes
            </span>
          </span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {season.episodes?.map((ep) => {
            const isLongDescription = ep.overview && ep.overview.length > 180;

            return (
              <div
                key={ep.id}
                className="flex flex-col lg:flex-row bg-gradient-to-b from-[#0b0b10] via-[#0b0b10] to-black shadow-xl rounded-2xl overflow-hidden  border border-gray-700 hover:shadow-2xl hover:scale-[1.02] transition duration-300 p-2"
              >
                {/* Details */}
                <div className="flex-1 p-4 flex flex-col space-y-3 text-gray-200">
                  {/* Title + Info */}
                  <div className="flex justify-between items-start">
                    <h2 className="text-xl font-bold text-white">
                      {ep.name &&
                      ep.name.toLowerCase().startsWith("episode") ? (
                        ep.name
                      ) : (
                        <>
                          <span className="text-[15px] text-gray-400/80 font-medium mr-2">
                            Episode {ep.episode_number}
                          </span>
                          {ep.name}
                        </>
                      )}
                    </h2>
                  </div>

                  {/* Air Date + Episodes Icon */}
                  <div className="flex items-center text-sm text-gray-400 gap-4 flex-wrap">
                    <span className="flex items-center">
                      <FaCalendarAlt className="mr-1 text-gray-500" />
                      {ep.air_date || "Unknown"}
                    </span>
                    <span className="flex items-center">
                      <FaRegClock className="mr-1 text-gray-500" />
                      Duration: {ep.runtime || "---"} min
                    </span>
                  </div>

                  {/* Rating (if exists) */}
                  {ep.vote_average && ep.vote_average > 0 ? (
                    <div className="flex items-center mt-1">
                      {Array.from({ length: 5 }, (_, i) => (
                        <FaStar
                          key={i}
                          className={
                            i < Math.round(ep.vote_average / 2)
                              ? "text-yellow-400"
                              : "text-gray-600"
                          }
                        />
                      ))}
                      <span className="ml-2 text-gray-400 text-sm">
                        {ep.vote_average.toFixed(1)}/10
                      </span>
                    </div>
                  ) : (
                    <span className="text-gray-400 text-sm">
                      <span className="text-gray-500">
                        There is no rate for
                      </span>{" "}
                      {season.name} - Episode {ep.episode_number}
                    </span>
                  )}

                  {/* Overview */}
                  {ep.overview && ep.overview.trim().length > 0 ? (
                    <p
                      className={`text-gray-300 leading-relaxed line-clamp-4 ${
                        isLongDescription ? "text-sm" : "text-base"
                      }`}
                    >
                      {ep.overview}
                    </p>
                  ) : (
                    <span className="text-gray-500/80 text-sm">
                      There is no overview for this Episode
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TVSeasonDetails;
