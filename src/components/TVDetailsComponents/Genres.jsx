const Genres = ({ genres }) => (
  <div className="flex flex-wrap gap-2">
    {genres.map((g) => (
      <span
        key={g.id}
        className="px-4 py-2 text-sm bg-gray-900/80 border border-gray-800 rounded-full"
      >
        {g.name}
      </span>
    ))}
  </div>
);

export default Genres;