import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getImageUrl, fetchTvSeasons } from "../services/API";
import { FaStar, FaInfoCircle, FaTv, FaCalendarAlt } from "react-icons/fa";

const TVSeasons = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tvShow, setTvShow] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSeasons = async () => {
      setLoading(true);
      try {
        const data = await fetchTvSeasons(id);
        setTvShow(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getSeasons();
  }, [id]);

  if (loading) return <p className="text-white p-4">Loading...</p>;
  if (!tvShow) return <p className="text-white p-4">No data found</p>;

  return (
    <div className="bg-gradient-to-b from-[#0b0b10] via-[#0b0b10] to-black text-white pt-15">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-xl md:text-3xl font-bold mb-8 flex items-center">
          <span className="border-l-4 rounded-sm border-yellow-400 pl-3">
            {tvShow.name}
            <span className="text-lg text-gray-400 font-medium ml-2">
              Seasons
            </span>
          </span>
        </h1>

        {tvShow?.seasons?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {tvShow.seasons.map((season) => {
              const isLongDescription =
                season.overview && season.overview.length > 180;

              return (
                <div
                  key={season.id}
                  className="flex flex-col lg:flex-row bg-gradient-to-b from-[#0b0b10] via-[#0b0b10] to-black shadow-xl rounded-2xl overflow-hidden min-h-72 border border-gray-700 hover:shadow-2xl hover:scale-[1.02] transition duration-300"
                >
                  {/* Poster */}
                  {season.poster_path ? (
                    <img
                      src={getImageUrl(season.poster_path, "w300")}
                      alt={season.name}
                      className="w-full lg:w-40 object-cover"
                    />
                  ) : (
                    <div className="w-full lg:w-40 h-full bg-gray-800 flex items-center justify-center">
                      <span className="text-gray-400">No Poster</span>
                    </div>
                  )}

                  {/* Details */}
                  <div className="flex-1 p-4 relative flex flex-col gap-0.5 text-gray-200">
                    {/* Title + Info Button */}
                    <div className="flex justify-between items-start">
                      <h2 className="text-xl font-bold text-white">
                        {season.name}
                      </h2>
                      <button
                        onClick={() =>
                          navigate(`/tv/${id}/season/${season.season_number}`)
                        }
                        title="Details"
                        className="text-blue-400 hover:text-blue-500 duration-300 cursor-pointer animate-pulse"
                      >
                        <FaInfoCircle size={20} />
                      </button>
                    </div>

                    {/* Air date + Episodes */}
                    <div className="flex items-center text-sm text-gray-400 mt-2 gap-4 flex-wrap">
                      {season.air_date && (
                        <span className="flex items-center">
                          <FaCalendarAlt className="mr-1 text-gray-500" />{" "}
                          {season.air_date}
                        </span>
                      )}
                      <span className="flex items-center">
                        <FaTv className="mr-1 mt-0.5 text-gray-500" /> Episodes:{" "}
                        {season.episode_count}
                      </span>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center mt-2">
                      {season.vote_average > 0 ? (
                        <>
                          {Array.from({ length: 5 }, (_, i) => (
                            <FaStar
                              key={i}
                              className={
                                i < Math.round(season.vote_average / 2)
                                  ? "text-yellow-400"
                                  : "text-gray-600"
                              }
                            />
                          ))}
                          <span className="ml-2 text-gray-400 text-sm">
                            {season.vote_average?.toFixed(1)}{" "}
                            <span className="text-gray-500 text-[11.5px]">
                              /10
                            </span>
                          </span>
                        </>
                      ) : (
                        <span className="text-gray-400 text-sm">
                          <span className="text-gray-500">There is no rate for</span> {tvShow.name} - {season.name}
                        </span>
                      )}
                    </div>

                    {/* Overview */}
                    <p
                      className={`text-gray-300 mt-4 leading-relaxed line-clamp-6 ${
                        isLongDescription ? "text-sm" : "text-base"
                      }`}
                    >
                      {season.overview || "No description available."}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-400">No seasons available.</p>
        )}
      </div>
    </div>
  );
};

export default TVSeasons;
