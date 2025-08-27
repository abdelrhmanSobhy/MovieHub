import { User, Users } from "lucide-react";
import { getImageUrl } from "../../services/API";

const Cast = ({ cast }) => {
  if (!cast.length) return null;

  return (
    <section className="mb-16">
      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
        <Users className="w-6 h-6 text-yellow-400" />
        Top Cast
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {cast.slice(0, 8).map((actor) => (
          <div key={actor.id} className="rounded-lg p-3">
            {actor.profile_path ? (
              <img
                src={getImageUrl(actor.profile_path, "w185")}
                alt={actor.name}
                className="w-full h-65 object-contain rounded-lg mb-2 shadow-lg"
              />
            ) : (
              <div className="flex w-full h-65 bg-gray-700 text-gray-400 items-center justify-center rounded-md mb-2">
                <User size={40} />
              </div>
            )}
            <div className="flex flex-col items-center justify-center gap-1">
              <h3 className="text-[16px] font-semibold text-white truncate">
                {actor.name}
              </h3>
              <p className="text-[12px] text-gray-400 truncate">
                as {actor.character || "—"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Cast;