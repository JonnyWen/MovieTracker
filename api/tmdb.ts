const API_KEY = "766ef3297abeedbed3afeef5daa2e181";

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
    

    if (!response.ok) {
        throw new Error("Failed fetch");

    }

    return response.json();
};
