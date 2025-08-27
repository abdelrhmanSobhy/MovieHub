import { NavLink } from "react-router-dom";
import { FaFilm, FaTv, FaHeart } from "react-icons/fa";

const Options = ({ wishlistCount = 0 }) => {
  const base =
    "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition duration-500";
  const active = "bg-yellow-400 text-black shadow";
  const inactive = "text-gray-300 hover:text-white hover:bg-white/10";

  return (
    <nav
      className="
        flex flex-row items-center justify-center gap-2 
        flex-wrap md:flex-row
      "
    >
      <NavLink
        to="/"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={({ isActive }) => `${base} ${isActive ? active : inactive}`}
      >
        <FaFilm className="text-base" />
        <span>Movies</span>
      </NavLink>

      <NavLink
        to="/tv"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={({ isActive }) => `${base} ${isActive ? active : inactive}`}
      >
        <FaTv className="text-base" />
        <span>TV Shows</span>
      </NavLink>

      <NavLink
        to="/Favourite"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={({ isActive }) =>
          `${base} ${isActive ? active : inactive} relative`
        }
      >
        <FaHeart className="text-base" />
        <span>Favourite</span>
        {wishlistCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
            {wishlistCount}
          </span>
        )}
      </NavLink>
    </nav>
  );
};

export default Options;
