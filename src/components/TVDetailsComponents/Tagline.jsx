import { Quote } from "lucide-react";

const Tagline = ({ tagline }) => {
  if (!tagline) return null;
  return (
    <section className="mb-8 flex flex-col sm:flex-row sm:items-center gap-2">
      <h2 className="text-2xl font-semibold flex items-center gap-2">
        <Quote className="w-5 h-5 text-yellow-400" />
        Famous Quote
      </h2>
      <p className="text-gray-400 italic mt-1">"{tagline}"</p>
    </section>
  );
};

export default Tagline;