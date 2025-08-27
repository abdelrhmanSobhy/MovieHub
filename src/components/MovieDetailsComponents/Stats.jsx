const Stats = ({ movie }) => (
  <div className="grid lg:grid-cols-3 gap-6">
    <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800/90 flex lg:flex-col items-center justify-center gap-2">
      <h3 className="text-[28px] font-semibold text-white font-['Bebas_Neue'] tracking-widest">
        Budget
      </h3>
      <p className="text-gray-400 text-[18px]">
        {movie.budget > 0
          ? `$${movie.budget.toLocaleString()}`
          : "Not disclosed"}
      </p>
    </div>

    <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800/90 flex lg:flex-col items-center justify-center gap-2">
      <h3 className="text-[28px] font-semibold text-white font-['Bebas_Neue'] tracking-widest">
        Revenue
      </h3>
      <p className="text-gray-400 text-[18px]">
        {movie.revenue > 0
          ? `$${movie.revenue.toLocaleString()}`
          : "Not disclosed"}
      </p>
    </div>

    <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800/90 flex lg:flex-col items-center justify-center gap-2">
      <h3 className="text-[28px] font-semibold text-white font-['Bebas_Neue'] tracking-widest">
        Status
      </h3>
      <span
        className={` text-[18px] ${
          movie.status === "Released"
            ? "text-green-600"
            : movie.status === "Post Production" ||
              movie.status === "In Production"
            ? "text-yellow-600"
            : "text-red-600"
        }`}
      >
        {movie.status}
      </span>
    </div>
  </div>
);

export default Stats;
