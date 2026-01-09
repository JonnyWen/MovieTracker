import { BrowserRouter, Routes, Route } from "react-router";
import { Home } from "../pages/Home";
import { MovieDesc } from "../pages/MovieDesc";
import { LikedMovies } from "../pages/LikedMovies";
import { LikedMoviesProvider } from "../context/LikedMoviesContext";

function App() {
  return (
    <LikedMoviesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/likedmovies" element={<LikedMovies />} />
          <Route path="/movie/:id" element={<MovieDesc />} />
        </Routes>
      </BrowserRouter>
    </LikedMoviesProvider>
  )
}

export default App
