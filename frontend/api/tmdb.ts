const API_KEY = "766ef3297abeedbed3afeef5daa2e181";
//const API_KEY = import.meta.env.TMDB_API_KEY;
export const fetchMovies = async (
  page: number,
  sortBy: string,
) => {
    const voteFilter =
    sortBy === "vote_average.desc" || sortBy === "vote_average.asc"
      ? "&vote_count.gte=100"
      : "";

    const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=${sortBy}&page=${page}${voteFilter}`
    );
    

    if (!response.ok) throw new Error("Failed fetch");

    return response.json();
};
// TMDB API query does not support sort_by endpoint
export const searchAllMovies = async (
    query: string,
    page: number,
  ) => {
      const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
            query
          )}&page=${page}`
      );
      
      if (!response.ok) throw new Error("Failed fetch");
  
      return response.json();
};
// TMDB API now_playing does not support sort_by endpoint
export const fetchNowPlaying = async (
    page: number,
  ) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=${page}`
  );

  if (!response.ok) throw new Error("Failed fetch");

  return response.json();
}

export const fetchMovie = async (movieId: string) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
  );

  if (!response.ok) throw new Error("Failed fetch");

  return response.json();
}

export const fetchMovieCredits = async (movieId: string) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`
  );

  if (!response.ok) throw new Error("Failed fetch");

  return response.json();
}

