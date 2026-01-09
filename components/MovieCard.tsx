import { Link } from "react-router";
import { useLikedMovies } from "../context/LikedMoviesContext";

type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  popularity: number;
};

interface MovieCardProps {
  movie: Movie;
}

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
}) => {

  const { toggleLike, isLiked } = useLikedMovies();

  const liked = isLiked(movie.id);

  return (
    <Link to={`/movie/${movie.id}`} className="block">
      <div
        className="relative group rounded-xl bg-slate-900 border border-slate-800 transition hover:-translate-y-1 hover:shadow-xl "
      >

        {/* Poster wrapper */}
        <div
          className="relative overflow-hidden group rounded-xl bg-slate-800 aspect-2/3 w-full"
        >
          
          <button
            onClick={(e) => {
              e.preventDefault(); // prevent navigation to movie.id
              e.stopPropagation(); // prevent click from reaching parent 
              toggleLike(movie);
            }}
            className="absolute top-2 right-2 z-50 text-2xl drop-shadow-lg"    
          >
            {liked ? "❤️" : "🤍"}
          </button>

          {/* Poster */}
          <img
            src={
              movie.poster_path
                ? `${IMAGE_BASE_URL}${movie.poster_path}`
                : "../assets/placeholder_poster.jpg" // does not work
            }
            alt={movie.title}
            className="rounded-lg object-cover bg-slate-800 h-72 w-full"
          />
        </div>

        {/* Info */}
        <div
          className="flex flex-col justify-between p-4 overflow-hidden"
        >
          <div>
            <h3 className="text-sm font-semibold leading-tight line-clamp-1 group-hover:text-indigo-400">
              {movie.title}
            </h3>

            <p className="mt-1 text-xs text-slate-400">
              {movie.release_date?.slice(0, 4) || "Unknown"}
            </p>
          </div>

          {/* Stats */}
          <div className="mt-3 flex items-center gap-4 text-xs text-slate-300">
            <span className="flex items-center gap-1">
              ⭐ {movie.vote_average.toFixed(1)}{" "}
            </span>
            <span className="text-slate-500">
              Popularity: {Math.round(movie.popularity)}
            </span>

          </div>
        </div>
      </div>
    </Link>
  );
};
