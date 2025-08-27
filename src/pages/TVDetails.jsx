import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchTvDetails,
  fetchTvRecommendations,
  fetchTvCredits,
} from "../services/API";
import { useWishlist } from "../context/WishlistContext";
import { ArrowLeft } from "lucide-react";
import Poster from "../components/TVDetailsComponents/Poster";
import Title from "../components/TVDetailsComponents/Title";
import InfoHeader from "../components/TVDetailsComponents/InfoHeader";
import MetaInfo from "../components/TVDetailsComponents/MetaInfo";
import Genres from "../components/TVDetailsComponents/Genres";
import Overview from "../components/TVDetailsComponents/Overview";
import Tagline from "../components/TVDetailsComponents/Tagline";
import ProductionCompanies from "../components/TVDetailsComponents/ProductionCompanies";
import TVStats from "../components/TVDetailsComponents/TVStats";
import TVCrew from "../components/TVDetailsComponents/TVCrew";
import Cast from "../components/TVDetailsComponents/Cast";
import Backdrop from "../components/TVDetailsComponents/Backdrop";
import Recommendations from "../components/TVDetailsComponents/Recommendations";

const TVDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { wishlist, toggleWishlist } = useWishlist();
  const [tvShow, setTvShow] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);

  useEffect(() => {
    fetchTvDetails(id).then(setTvShow);
    fetchTvRecommendations(id).then((data) =>
      setRecommendations(data.results || [])
    );
    fetchTvCredits(id).then((data) => {
      setCast(data.cast || []);
      setCrew(data.crew || []);
    });
  }, [id]);

  if (!tvShow) return <p className="p-4 text-white">Loading...</p>;

  // Filter crew members by role
  const directors = crew.filter((m) => m.job === "Director");
  const writers = crew.filter((m) =>
    ["Writer", "Screenplay", "Story"].includes(m.job)
  );
  const music = crew.filter((m) => m.job === "Original Music Composer");
  const art = crew.filter((m) =>
    ["Art Direction", "Production Design"].includes(m.job)
  );
  const makeup = crew.filter((m) =>
    ["Makeup Artist", "Hair & Makeup"].includes(m.job)
  );
  const producers = crew.filter((m) =>
    ["Producer", "Executive Producer"].includes(m.job)
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0b10] via-[#0b0b10] to-black text-white p-0 sm:p-15">
      <div className="container mx-auto px-4 py-8 relative">
        <button
          onClick={() => navigate(-1)}
          className="hidden md:flex items-center mb-6 text-gray-300 hover:text-white transition cursor-pointer animate-pulse "
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to TV Shows
        </button>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-10 mb-12 relative">
          <div className="mt-25 md:mt-0 h-full">
            <Poster item={tvShow} />
          </div>

          {/* Mobile InfoHeader above poster */}
          <div className="sm:hidden">
            <InfoHeader
              item={tvShow}
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
            />
          </div>

          {/* Desktop InfoHeader */}
          <div className="lg:col-span-2 space-y-6">
            <div className="hidden md:flex justify-between items-center">
              <Title title={tvShow.name} />
              <InfoHeader
                item={tvShow}
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
              />
            </div>
            <div className="md:hidden">
              <Title title={tvShow.name} />
            </div>
            <MetaInfo item={tvShow} />
            <Genres genres={tvShow.genres} />
            <Overview overview={tvShow.overview} />
            <Tagline tagline={tvShow.tagline} />
            <ProductionCompanies companies={tvShow.production_companies} />
            <hr className="border-gray-400/30 my-7" />
            <TVStats tvShow={tvShow} id={id} navigate={navigate} />
          </div>
        </div>

        <TVCrew
          creators={tvShow.created_by}
          directors={directors}
          writers={writers}
          music={music}
          art={art}
          makeup={makeup}
          producers={producers}
        />
        <Cast cast={cast} />
        <Backdrop backdrop={tvShow.backdrop_path} />
        <Recommendations recommendations={recommendations} type="tv" />
      </div>
    </div>
  );
};

export default TVDetails;