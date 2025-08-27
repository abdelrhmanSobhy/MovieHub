const TVStats = ({ tvShow, id, navigate }) => (
  <div className="space-y-6">
    <div className="grid lg:grid-cols-4 gap-6">
      <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800/90 flex flex-row lg:flex-col items-center justify-center gap-2">
        <h3 className="text-[25px] font-semibold text-white font-['Bebas_Neue'] tracking-widest">
          NUM. SEASONS
        </h3>
        <p className="text-gray-400 text-[18px]">
          {tvShow.number_of_seasons}
        </p>
      </div>
      <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800/90 flex flex-row lg:flex-col items-center justify-center gap-2">
        <h3 className="text-[25px] font-semibold text-white font-['Bebas_Neue'] tracking-widest">
          NUM. EPISODES
        </h3>
        <p className="text-gray-400 text-[18px]">
          {tvShow.number_of_episodes}
        </p>
      </div>
      <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800/90 flex flex-row lg:flex-col items-center justify-center gap-2">
        <h3 className="text-[25px] font-semibold text-white font-['Bebas_Neue'] tracking-widest">
          Status
        </h3>
        <span
          className={`text-[18px] ${
            tvShow.status === "Released"
              ? "text-green-600"
              : tvShow.status === "Returning Series" ||
                tvShow.status === "In Production" ||
                tvShow.status === "Post Production"
              ? "text-yellow-600"
              : tvShow.status === "Canceled" ||
                tvShow.status === "Ended"
              ? "text-red-600"
              : "text-gray-400"
          }`}
        >
          {tvShow.status}
        </span>
      </div>
      <div
        onClick={() => navigate(`/tv/${id}/seasons`)}
        className="bg-yellow-500 hover:bg-yellow-600 p-4 font-['Bebas_Neue'] tracking-widest text-black font-semibold text-xl rounded-lg border border-gray-700 flex items-center justify-center transition cursor-pointer animate-pulse"
      >
        <button className="cursor-pointer">Tap to SEE Seasons</button>
      </div>
    </div>
  </div>
);

export default TVStats;