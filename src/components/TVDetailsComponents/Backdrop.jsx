import { getImageUrl } from "../../services/API";

const Backdrop = ({ backdrop }) => {
  if (!backdrop) return null;
  return (
    <div className="relative rounded-xl overflow-hidden shadow-xl mb-16">
      <img
        src={getImageUrl(backdrop, "w1280")}
        alt="Backdrop"
        className="w-full h-auto object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
    </div>
  );
};

export default Backdrop;