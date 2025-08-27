import { useState, useEffect, useRef } from "react";
import Logo from "./HeaderComponents/Logo";
import Options from "./HeaderComponents/Options";
import SearchBar from "./HeaderComponents/SearchBar";
import { useWishlist } from "../context/WishlistContext";
import { useSearchParams, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const { wishlist } = useWishlist();
  const [_searchParams, setSearchParams] = useSearchParams();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();

  const handleSearch = (newQuery) => {
    setSearchParams({ query: newQuery, page: 1 });
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-30 transition-colors duration-500 border-b border-white/10
        ${isScrolled ? "bg-black/80 backdrop-blur-md" : "bg-transparent"}
      `}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <Logo />

        {/* Desktop Options */}
        <div className="hidden lg:flex flex-1 justify-center">
          <Options wishlistCount={wishlist.length} />
        </div>

        {/* Desktop Search */}
        <div className="hidden lg:block">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-yellow-400 hover:text-yellow-500 text-2xl cursor-pointer duration-300"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="lg:hidden bg-black/90 border-t border-white/10 px-4 py-4 z-100"
          >
            <Options wishlistCount={wishlist.length} />

            <div className="mt-4">
              <SearchBar onSearch={handleSearch} small />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
