import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { fetchMovie, fetchMovieCredits } from "../api/tmdb";
import { useLikedMovies } from "../context/LikedMoviesContext";


export const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/w1280"
export const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w342";
export const ACTOR_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w185";

export const MovieDesc: React.FC = () => {
  const { id } = useParams<string>(); // read dynamic values from url
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);

  useEffect(() => {
    loadMovieCredits();
    loadMovieData();
  }, [id]);

  const loadMovieData = async () => {
    try {
      const data = await fetchMovie(id);
      setMovie(data);
    } catch (err) {
      console.error("Error fetching movie: ", err);
    } finally {
      setIsLoading(false);
    }
  }

  const loadMovieCredits = async () => {
    try {
      const data = await fetchMovieCredits(id);
      setCredits(data);
    } catch (err) {
      console.error("Error fetching movie: ", err);
    } finally {
      setIsLoading(false);
    }
  }

  const { toggleLike, isLiked } = useLikedMovies();
  const liked = movie ? isLiked(movie.id) : false;

  // loading movies
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-slate-400">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
        <p className="mt-4">Loading movies...</p>
      </div>
    );
  };
  // Check if link is valid movie
  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center py-24 text-slate-400">
        <div className="flex flex-col items-center text-center">
          <p
            className="items-center text-2xl mb-4"
          >
            Movie not found
          </p>
          <button
            onClick={() => navigate("/")}
            className="
                px-4 py-2 rounded-lg text-sm font-medium
                bg-slate-800 text-white
                hover:bg-slate-700
                active:scale-95
                transition
                disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  };

  // return null prevents React from executing JSX
  // React rerenders once return is considered valid (credits defined)
  if (!credits) return null;

  // Hero section (backdrop)
  // └── Poster + title + meta
  // Details section
  // └── Overview / description
  // Credits section
  // └── Director + Cast
  // Extras
  // └── Genres • Runtime • Rating • Release year

  const director = credits.crew.filter(
    person => person.job === "Director"
  );

  return (
    <div>
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur border-b border-white/10">
        <div
          className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between"
          onClick={() => navigate("/")}
        >
          <h1 className="text-xl font-bold text-white">
            🎬 MovieTracker
          </h1>
          <p className="text-sm text-slate-400">
            Discover trending and popular movies
          </p>
        </div>
      </header>
      <section
        className="relative h-[60vh] bg-cover bg-center"
        style={{
          backgroundImage: `url(${BACKDROP_BASE_URL}${movie.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto h-full flex items-end px-6 pb-12">
          <div className="flex gap-8">


            <img
              src={`${POSTER_BASE_URL}${movie.poster_path}`}
              alt={movie.title}
              className="w-48 rounded-xl shadow-lg"
            />
            

            <div className="text-white max-w-xl">
              <h1 className="text-4xl font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                {movie.title}
              </h1>

              <p className="mt-2 text-slate-300 italic drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                {movie.tagline}
              </p>

              <div className="mt-4 flex gap-4 text-sm text-slate-300 ">
                <span>⭐ {movie.vote_average.toFixed(1)}</span>
                <span>{movie.runtime} min</span>
                <span>{movie.release_date.slice(0, 4)}</span>
              </div>

              <button
              onClick={(e) => {
                e.preventDefault(); // prevent navigation to movie.id
                e.stopPropagation(); // prevent click from reaching parent 
                toggleLike(movie);
              }}
              className="
              absolute mt-4
              px-4 py-2 rounded-lg text-sm font-medium
              bg-slate-800  text-slate-300
              hover:bg-slate-700
              active:scale-95
              transition
              disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
            {liked ? "Liked ❤️" : "Like Movie 🤍"}
            </button>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 py-12">
          <h2 className="text-xl font-semibold text-white mb-4">
            Overview
          </h2>

          <p className="text-slate-300 leading-relaxed">
            {movie.overview}
          </p>
        </div>

        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            Cast
          </h2>

          <div className="flex gap-4 overflow-x-auto pb-4">
            {credits.cast.map(actor => (
              <div
                key={actor.id}
                className="w-32 shrink-0 text-center"
              >
                <img
                  src={
                    actor.profile_path
                      ? `${ACTOR_IMAGE_BASE_URL}${actor.profile_path}`
                      : "../assets/placeholder.jpg"
                  }
                  alt={actor.name}
                  className="w-32 h-40 object-cover rounded-lg bg-slate-800"
                />
                <p mt-2 text-sm text-white font-medium line-clamp-1>
                  {actor.name}
                </p>
                <p className="text-xs text-slate-400 line-clamp-1">
                  {actor.character}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            Director(s)
          </h2>

          <div className="flex gap-4 overflow-x-auto pb-4">
            {director.length > 0 && (director.map(director => (
              <div
                key={director.id}
                className="w-32 shrink-0 text-center"
              >
                <img
                  src={
                    director.profile_path
                      ? `${ACTOR_IMAGE_BASE_URL}${director.profile_path}`
                      : "../assets/placeholder.jpg"
                  }
                  alt={director.name}
                  className="w-32 h-40 object-cover rounded-lg bg-slate-800"
                />
                <p mt-2 text-sm text-white font-medium line-clamp-1>
                  {director.name}
                </p>
              </div>
            )))}
          </div>

        </div>



        <div className="max-w-5xl mx-auto px-6 py-6 pb-6">
          <div>
            <p className="text-slate-400">Genres</p>
            <p className="text-white">
              {movie.genres.map((g) => g.name).join(", ")}
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 pb-6">
          <p className="text-slate-400">Release Data</p>
          <p className="text-white">{movie.release_date}</p>
        </div>

        <div className="max-w-5xl mx-auto px-6 pb-6">
          <p className="text-slate-400">Rating</p>
          <p className="text-white">
            ⭐ {movie.vote_average} ({movie.vote_count} votes)
          </p>
        </div>

        <footer className="mt-6 border-t border-slate-800 bg-slate-900 py-6 text-center text-sm text-slate-400">
          Data provided by TMDB
        </footer>

      </section>
    </div>
  );
};