import { useState, useEffect } from 'react';
import './App.css';
import SearchIcon from './search.svg'
import MovieCard from './MovieCard';

//e4c08518

const API_URL = 'http://www.omdbapi.com/?apikey=e4c08518';

const App = () => {
  
    useEffect(() => {
        searchMovies('Avengers');
    }, []);

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);
    }

    return (
        <div className="app">
            <h1>Movie Land</h1>
            <div className="search">
                <input
                    placeholder = "Search for movies"
                    value = {searchTerm}
                    // onChange = {e => searchMovies(e.target.value)}
                    onChange = { (e) => setSearchTerm(e.target.value) }
                />
                <img
                    src={SearchIcon}
                    alt="Search Icon"
                    onClick = {(e) => searchMovies(searchTerm)}
                />
            </div>
            {
                movies.length > 0 ? (
                    <div className="container">
                        {
                            movies.map(movie => (
                                <MovieCard movie={movie}/>
                            ))
                        }
                    </div>
                ) : (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )
            }
            
        </div>
    );
}

export default App;