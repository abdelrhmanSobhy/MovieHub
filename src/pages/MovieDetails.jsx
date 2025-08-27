import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import {
  fetchMovieDetails,
  fetchMovieRecommendations,
  fetchMovieCredits,
} from "../services/API";
import { ArrowLeft } from "lucide-react";
import Poster from "../components/MovieDetailsComponents/Poster";
import Title from "../components/MovieDetailsComponents/Title";
import InfoHeader from "../components/MovieDetailsComponents/InfoHeader";
import MetaInfo from "../components/MovieDetailsComponents/MetaInfo";
import Genres from "../components/MovieDetailsComponents/Genres";
import Overview from "../components/MovieDetailsComponents/Overview";
import Tagline from "../components/MovieDetailsComponents/Tagline";
import ProductionCompanies from "../components/MovieDetailsComponents/ProductionCompanies";
import Stats from "../components/MovieDetailsComponents/Stats";
import Crew from "../components/MovieDetailsComponents/Crew";
import Cast from "../components/MovieDetailsComponents/Cast";
import Backdrop from "../components/MovieDetailsComponents/Backdrop";
import Recommendations from "../components/MovieDetailsComponents/Recommendations";
const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { wishlist, toggleWishlist } = useWishlist();
  const [movie, setMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  useEffect(() => {
    fetchMovieDetails(id).then(setMovie);
    fetchMovieRecommendations(id).then((data) =>
      setRecommendations(data.results || [])
    );
    fetchMovieCredits(id).then((data) => {
      setCast(data.cast || []);
      setCrew(data.crew || []);
    });
  }, [id]);
  if (!movie) return <p className="p-4 text-white">Loading...</p>;
  const directors = crew.filter((m) => m.job === "Director");
  const writers = crew.filter((m) =>
    ["Writer", "Screenplay", "Story"].includes(m.job)
  );
  const music = crew.filter((m) => m.job === "Original Music Composer");
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0b10] via-[#0b0b10] to-black text-white p-0 sm:p-15">
      <div className="container mx-auto px-4 py-8 relative">
        <button
          onClick={() => navigate(-1)}
          className="hidden md:flex items-center mb-6 text-gray-300 hover:text-white transition cursor-pointer animate-pulse "
        >
          <ArrowLeft className="h-5 w-5 mr-2" /> Back to Movies
        </button>
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-10 mb-12 relative">
          <div className="mt-25 md:mt-0 h-full">
            <Poster item={movie} />
          </div>
          {/* Mobile InfoHeader above poster */}
          <div className="sm:hidden">
            <InfoHeader
              item={movie}
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
            />
          </div>
          {/* Desktop InfoHeader */}
          <div className="lg:col-span-2 space-y-6 ">
            <div className="hidden md:flex justify-between items-center">
              <Title title={movie.title || movie.name} />
              <InfoHeader
                item={movie}
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
              />
            </div>
            <div className="md:hidden">
              <Title title={movie.title || movie.name} />
            </div>
            <MetaInfo item={movie} /> <Genres genres={movie.genres} />
            <Overview overview={movie.overview} />
            <Tagline tagline={movie.tagline} />
            <ProductionCompanies companies={movie.production_companies} />
            <hr className="border-gray-400/30 my-7" />
            <Stats movie={movie} />
          </div>
        </div>
        <Crew directors={directors} writers={writers} music={music} />
        <Cast cast={cast} /> <Backdrop backdrop={movie.backdrop_path} />
        <Recommendations recommendations={recommendations} type="movie" />
      </div>
    </div>
  );
};
export default MovieDetails;
