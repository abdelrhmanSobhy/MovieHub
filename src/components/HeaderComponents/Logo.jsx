import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <span className="text-2xl md:text-3xl font-black italic tracking-wide text-yellow-400 drop-shadow-[0_0_6px_rgba(245,197,24,0.35)]">
        Cinevo
      </span>
    </Link>
  );
};

export default Logo;