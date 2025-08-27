import { Users } from "lucide-react";

const TVCrew = ({ creators, directors, writers, music, art, makeup, producers }) => {
  // Check if there's any crew data
  const hasCrewData = creators?.length > 0 || directors.length > 0 || writers.length > 0 || 
                      music.length > 0 || art.length > 0 || makeup.length > 0 || producers.length > 0;

  if (!hasCrewData) return null;

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
        <Users className="w-6 h-6 text-yellow-400" />
        Crew
      </h2>

      <div className="flex flex-col gap-4">
        {creators?.length > 0 && (
          <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800/90 flex flex-col sm:flex-row items-start sm:items-center gap-2 shadow-md">
            <p className="text-[20px] font-semibold text-white mr-2">Creators</p>
            <span className="text-gray-400 mt-0.5">
              {creators.map((c, index) => (
                <span key={c.id}>
                  {c.name}
                  {index < creators.length - 1 && (
                    <span className="mx-2 text-gray-500">•</span>
                  )}
                </span>
              ))}
            </span>
          </div>
        )}

        {directors.length > 0 && (
          <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800/90 flex flex-col sm:flex-row items-start sm:items-center gap-2 shadow-md">
            <p className="text-[20px] font-semibold text-white mr-2">Director</p>
            <span className="text-gray-400 mt-0.5">
              {directors.map((m, index) => (
                <span key={m.id}>
                  {m.name}
                  {index < directors.length - 1 && (
                    <span className="mx-2 text-gray-500">•</span>
                  )}
                </span>
              ))}
            </span>
          </div>
        )}

        {writers.length > 0 && (
          <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800/90 flex flex-col sm:flex-row items-start sm:items-center gap-2 shadow-md">
            <p className="text-[20px] font-semibold text-white mr-2">Writers</p>
            <span className="text-gray-400 mt-0.5">
              {writers.map((m, index) => (
                <span key={m.id}>
                  {m.name}
                  {index < writers.length - 1 && (
                    <span className="mx-2 text-gray-500">•</span>
                  )}
                </span>
              ))}
            </span>
          </div>
        )}

        {music.length > 0 && (
          <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800/90 flex flex-col sm:flex-row items-start sm:items-center gap-2 shadow-md">
            <p className="text-[20px] font-semibold text-white mr-2">Music</p>
            <span className="text-gray-400 mt-0.5">
              {music.map((m, index) => (
                <span key={m.id}>
                  {m.name}
                  {index < music.length - 1 && (
                    <span className="mx-2 text-gray-500">•</span>
                  )}
                </span>
              ))}
            </span>
          </div>
        )}

        {art.length > 0 && (
          <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800/90 flex flex-col sm:flex-row items-start sm:items-center gap-2 shadow-md">
            <p className="text-[20px] font-semibold text-white mr-2">Art</p>
            <span className="text-gray-400 mt-0.5">
              {art.map((m, index) => (
                <span key={m.id}>
                  {m.name}
                  {index < art.length - 1 && (
                    <span className="mx-2 text-gray-500">•</span>
                  )}
                </span>
              ))}
            </span>
          </div>
        )}

        {makeup.length > 0 && (
          <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800/90 flex flex-col sm:flex-row items-start sm:items-center gap-2 shadow-md">
            <p className="text-[20px] font-semibold text-white mr-2">Makeup</p>
            <span className="text-gray-400 mt-0.5">
              {makeup.map((m, index) => (
                <span key={m.id}>
                  {m.name}
                  {index < makeup.length - 1 && (
                    <span className="mx-2 text-gray-500">•</span>
                  )}
                </span>
              ))}
            </span>
          </div>
        )}

        {producers.length > 0 && (
          <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800/90 flex flex-col sm:flex-row items-start sm:items-center gap-2 shadow-md">
            <p className="text-[20px] font-semibold text-white mr-2">Producers</p>
            <span className="text-gray-400 mt-0.5">
              {producers.map((m, index) => (
                <span key={m.id || index}>
                  {m.name}
                  {index < producers.length - 1 && (
                    <span className="mx-2 text-gray-500">•</span>
                  )}
                </span>
              ))}
            </span>
          </div>
        )}
      </div>
    </section>
  );
};

export default TVCrew;