import { Users } from "lucide-react";

const Crew = ({ directors, writers, music }) => {
  if (!directors.length && !writers.length && !music.length) return null;

  const renderCrewCard = (name, job) => (
    <div
      key={name + job}
      className="bg-gray-900/50 p-4 rounded-lg border border-gray-800/90 flex flex-col items-center gap-2 shadow-md w-full sm:w-65"
    >
      <p className="text-[28px] font-semibold text-white font-['Bebas_Neue'] tracking-widest">
        {job}
      </p>
      <h3 className="text-gray-400 text-[18px]">{name}</h3>
    </div>
  );

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
        <Users className="w-6 h-6 text-yellow-400" />
        Crew
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 justify-items-center">
        {directors.map((d) => renderCrewCard(d.name, "Director"))}
        {writers.map((w) => renderCrewCard(w.name, w.job))}
        {music.map((m) => renderCrewCard(m.name, "Music"))}
      </div>
    </section>
  );
};

export default Crew;
