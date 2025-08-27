import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-gradient-to-t from-[#1a1a1f] via-[#0b0b10] to-[#0b0b10] text-white py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center md:text-left">
          <Link
            to="/"
            className="flex items-center justify-center md:justify-start gap-2 text-yellow-400 font-extrabold text-2xl mb-3 drop-shadow-[0_0_6px_rgba(245,197,24,0.35)]"
          >
            Cinevo
          </Link>
          <p className="text-sm text-gray-400">
            Discover movies, explore reviews, and stay updated with the latest
            releases.
          </p>
        </div>

        <div className="flex flex-col items-center">
          <h3 className="text-yellow-400 font-semibold text-lg mb-4 ">
            Other Links
          </h3>
          <div className="flex flex-col md:flex-row gap-3 md:gap-6 text-center">
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="hover:text-yellow-400 transition"
            >
              Movies
            </Link>
            <Link
              to="/tv"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="hover:text-yellow-400 transition"
            >
              TV Shows
            </Link>
            <Link
              to="/Favourite"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="hover:text-yellow-400 transition"
            >
              Favourite
            </Link>
          </div>
        </div>

        {/* الجزء الجديد بدل أيقونات السوشيال */}
        <div className="flex flex-col items-center">
          <h3 className="text-yellow-400 font-semibold text-lg mb-4 ">
            Our Team
          </h3>
          <div className="flex flex-col gap-2 text-center">
            <a
              href="https://www.linkedin.com/in/a7mdt"
              target="_blank"
              rel="noreferrer"
              className="hover:text-yellow-400 transition"
            >
              Ahmed Tarek
            </a>
            <a
              href="https://www.linkedin.com/in/member2"
              target="_blank"
              rel="noreferrer"
              className="hover:text-yellow-400 transition"
            >
              Abdelrahman Sobhy
            </a>
            <a
              href="https://www.linkedin.com/in/mostafa-mohamed04"
              target="_blank"
              rel="noreferrer"
              className="hover:text-yellow-400 transition"
            >
              Mostafa Mohamed
            </a>
            <a
              href="https://www.linkedin.com/in/member4"
              target="_blank"
              rel="noreferrer"
              className="hover:text-yellow-400 transition"
            >
              Basma Osama
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 mt-8 pt-4 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Cinevo. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
