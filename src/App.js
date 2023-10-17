import React, { useState, useEffect, useCallback } from "react";

import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";
import "./App.css";
import debounce from "./debounce";

const API_URL = "https://www.omdbapi.com?apikey=626a7c24";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    searchMovies("star");
  }, []);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}&page=1`);
    const data = await response.json();

    console.log(data.Search);
    setMovies(data.Search);
  };

  const customDebounce = useCallback(debounce(searchMovies), []);

  const handleonChange = (e) => {
    setSearchTerm(e.target.value); //value of search input field

    customDebounce(e.target.value);
  };

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          value={searchTerm}
          onChange={handleonChange}
          placeholder="Search for movies"
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
