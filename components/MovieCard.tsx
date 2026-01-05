import { Link } from "react-router";

type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  popularity: number;
};

type MovieCardProps = {
  movie: Movie;
  viewMode?: "grid" | "list";
};

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
}) => {
  return (
    <Link to={`/movie/${movie.id}`} className="block">
      <div
        className="group rounded-xl bg-slate-900 border border-slate-800 overflow-hidden transition hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40"
      >
        {/* Poster wrapper */}
        <div
        className="overflow-hidden rounded-lg bg-slate-800 aspect-2/3 w-full"       
        >
            {/* Poster */}
            <img
            src={
                movie.poster_path
                ? `${IMAGE_BASE_URL}${movie.poster_path}`
                : "/placeholder.png"
            }
            alt={movie.title}
            className="rounded-lg object-cover bg-slate-800 h-72 w-full"
            />
        </div>

        {/* Info */}
        <div
          className="flex flex-col justify-between p-4"
        >
          <div>
            <h3 className="text-sm font-semibold leading-tight line-clamp-2 group-hover:text-indigo-400">
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
