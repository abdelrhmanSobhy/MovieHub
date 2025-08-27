import Card from "../../components/Card";

const Recommendations = ({ recommendations, type }) => {
  if (!recommendations.length) return null;
  
  return (
    <section>
      <h2 className="text-xl sm:text-3xl font-semibold mb-6 flex items-center gap-2 border-l-4 rounded-sm border-yellow-400 pl-3">
        Recommended TV Shows
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommendations.map((rec) => {
          const transformedShow = {
            ...rec,
            title: rec.name || rec.original_name,
            release_date: rec.first_air_date,
          };
          return <Card key={rec.id} movie={transformedShow} type={type} />;
        })}
      </div>
    </section>
  );
};

export default Recommendations;