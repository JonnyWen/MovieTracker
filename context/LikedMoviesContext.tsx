import { createContext, useContext, useEffect, useState } from "react";

type Movie = {
    id: number;
    title: string;
    poster_path: string | null;
    release_date: string;
    vote_average: number;
    popularity: number;
};

interface LikedMoviesContextType {
    likedMovies: Movie[];
    toggleLike: (movie: Movie) => void;
    isLiked: (id: number) => boolean;
}

const LikedMoviesContext = createContext<LikedMoviesContextType | null>(null);

export const LikedMoviesProvider = ({ children }: { children: React.ReactNode }) => {
    const [likedMovies, setLikedMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem("likedMovies");
        if (saved) setLikedMovies(JSON.parse(saved));
    }, []);

    useEffect(() => {
        localStorage.setItem("likedMovies", JSON.stringify(likedMovies));
    }, [likedMovies]);

    const toggleLike = (movie: Movie) => {
        setLikedMovies(prev =>
            prev.some(m => m.id === movie.id)
                ? prev.filter(m => m.id !== movie.id)
                : [...prev, movie]
        );
    };

    const isLiked = (id: number) =>
        likedMovies.some(m => m.id === id)

    // useEffect(() => { 
    //     const saved = localStorage.getItem("likedMovies"); 
    //     if (saved) setLikedMovies(JSON.parse(saved)); }, []); 

    // useEffect(() => { 
    //     localStorage.setItem("likedMovies", JSON.stringify(likedMovies)); }, [likedMovies]);

    return (
        <LikedMoviesContext.Provider value={{ likedMovies, toggleLike, isLiked }}>
            {children}
        </LikedMoviesContext.Provider>
    );
};

export const useLikedMovies = () => {
    const ctx = useContext(LikedMoviesContext);
    if (!ctx) throw new Error("useLikedMovies must be used inside provider");
    return ctx;
}

