import { useEffect, useState } from "react"
import { fetchMovies, fetchNowPlaying, searchAllMovies } from "../api/tmdb";
import { MovieCard } from "../components/moviecard";

type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  popularity: number;
};


export const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [page, setPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("popularity.desc");
  const [totalPages, setTotalPages] = useState<number>(1);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");

  type BrowseMode =
    | "discover"
    | "now_playing";

  const [browseMode, setBrowseMode] = useState<BrowseMode>("discover");


  // Create a slight delay effect (debounce)
  useEffect(() => {
    const t = setTimeout(() => {
      setSearchQuery(searchInput.trim());
    }, 400);

    return () => clearTimeout(t);
  }, [searchInput]);

  useEffect(() => {
    const fetchMoviesData = async () => {
      try {
        let data;

        if (browseMode === "now_playing") {
          data = await fetchNowPlaying(page);
        } else {
          data = searchQuery ? await searchAllMovies(searchQuery, page) : await fetchMovies(page, sortBy);
        }
        setMovies(data.results);
        setTotalPages(Math.min(data.total_pages, 500));
      } catch (err) {
        console.error("Error fetching movies: ", err);
      } finally { // no matter try is success or failure
        setIsLoading(false);
      }
    };

    fetchMoviesData()
  }, [page, sortBy, browseMode, searchQuery]);

  useEffect(() => {
    setPage(1);
  }, [sortBy, browseMode, searchQuery]);

  // implement sorting for when query is not empty

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* HEADER */}
      <header className="border-b border-slate-800 bg-slate-900">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Logo */}
          <div>
            <h1 className="text-2xl font-bold">🎬 MovieTracker</h1>
            <p className="text-sm text-slate-400">
              Discover trending and popular movies
            </p>
          </div>

          {/* Search */}
          <div className="w-full md:w-72">
            <input
              type="text"
              placeholder="Search movies..."
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full rounded-lg bg-slate-800 px-4 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </header>

      {searchQuery && <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between" />}

      {!searchQuery && (browseMode === "discover" ?
        (
          // allow sorting and mode change
          <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <label className="text-sm text-slate-400">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-lg bg-slate-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="popularity.desc">Popularity</option>
                <option value="vote_average.desc">Rating (High → Low)</option>
                <option value="vote_average.asc">Rating (Low → High)</option>
                <option value="release_date.desc">Release Date (New → Old)</option>
                <option value="release_date.asc">Release Date (Old → New)</option>
              </select>
            </div>


            < div className="flex items-center gap-3">
              <label className="text-sm text-slate-400">Browse:</label>
              <select
                value={browseMode}
                onChange={(e) => setBrowseMode(e.target.value as BrowseMode)}
                className="rounded-lg bg-slate-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="discover">Discover</option>
                <option value="now_playing">Now Playing</option>
              </select>
            </div>

          </div>
        ) : (
          // no sorting on mode change
          <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            < div className="flex items-center gap-3">
              <label className="text-sm text-slate-400">Browse:</label>
              <select
                value={browseMode}
                onChange={(e) => setBrowseMode(e.target.value as BrowseMode)}
                className="rounded-lg bg-slate-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="discover">Discover</option>
                <option value="now_playing">Now Playing</option>
              </select>
            </div>
          </div>
        ))}





      {/* CONTENT */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-24 text-slate-400">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
          <p className="mt-4">Loading movies...</p>
        </div>
      ) : (
        <div
          className="mx-auto max-w-7xl px-6 pb-16 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
        >
          {movies.map((movie, key) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      )
      }

      {/* Page */}
      <div className="flex gap-2 justify-center mb-6">
        <button
          disabled={page === 1}
          onClick={() => setPage(p => p - 1)}
          className="
                px-4 py-2 rounded-lg text-sm font-medium
                bg-slate-800 text-white
                hover:bg-slate-700
                active:scale-95
                transition
                disabled:opacity-50 disabled:cursor-not-allowed
                "
        >

          Prev
        </button>

        <span
          className="
          px-4 py-2 rounded-lg text-sm font-medium
          bg-slate-800 text-white
          hover:bg-slate-700
          active:scale-95"
        >
          Page {page}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(p => p + 1)}
          className="
                px-4 py-2 rounded-lg text-sm font-medium
                bg-slate-800 text-white
                hover:bg-slate-700
                active:scale-95
                transition
                disabled:opacity-50 disabled:cursor-not-allowed
                "
        >
          Next
        </button>
      </div>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 bg-slate-900 py-6 text-center text-sm text-slate-400">
        Data provided by TMDB
      </footer>
    </div >
  );
};
