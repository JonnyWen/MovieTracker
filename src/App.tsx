import { BrowserRouter, Routes, Route } from "react-router";
import { Home } from "../pages/Home";
import { MovieDesc } from "../pages/MovieDesc";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDesc />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
