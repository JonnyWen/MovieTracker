import { useNavigate } from "react-router"
import { useLikedMovies } from "../context/LikedMoviesContext";
import { MovieCard } from "../components/moviecard";

export const LikedMovies: React.FC = () => {
    const { likedMovies } = useLikedMovies();
    const navigate = useNavigate();

    if (likedMovies.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center py-24 text-slate-400">
                <div className="flex flex-col items-center text-center">
                    <p
                        className="items-center text-2xl mb-4"
                    >
                        You can start liking movies by clicking on heart button on each movie!
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
    }
    return (
        <div>
            <header className="border-b border-slate-800 bg-slate-900">
                <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    {/* Logo */}
                    <div onClick={() => navigate("/")}>
                        <h1 className="text-2xl font-bold">My List</h1>
                        <p className="text-sm text-slate-400">
                        🎬 MovieTracker
                        </p>
                    </div>
                </div>
            </header>

            <div
                className="mx-auto max-w-7xl grid p-5 grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
            >
                {likedMovies.map((movie, key) => (
                    <MovieCard movie={movie} key={movie.id} />
                ))}
            </div>
        </div>
    )
}