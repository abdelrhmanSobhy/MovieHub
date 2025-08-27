import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Wishlist from "./pages/Wishlist.jsx";
import SearchResults from "./pages/SearchResults.jsx";
import MovieDetails from "./pages/MovieDetails.jsx";
import TVShows from "./pages/TVShows.jsx";
import TVDetails from "./pages/TVDetails.jsx";
import { WishlistProvider } from "./context/WishlistContext";
import TVSeasons from "./pages/TVSeasons.jsx";
import TVSeasonDetails from "./pages/TVSeasonDetails.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/Favourite",
        element: <Wishlist />,
      },
      {
        path: "movie/:id",
        element: <MovieDetails />,
      },
      {
        path: "/tv",
        element: <TVShows />,
      },
      {
        path: "tv/:id",
        element: <TVDetails />,
      },
      {
        path: "search",
        element: <SearchResults />,
      },
      {
        path: "tv/:id/seasons",
        element: <TVSeasons />,
      },
      {
        path: "tv/:id/season/:seasonNumber",
        element: <TVSeasonDetails />,
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <WishlistProvider>
      <RouterProvider router={router} />
    </WishlistProvider>
  </StrictMode>
);
