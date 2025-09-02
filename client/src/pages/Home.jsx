import React, { useEffect, useState } from 'react';
import api from '../services/api';
import MovieCard from '../components/MovieCard';

export default function Home(){
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    api.get('/movies')
      .then(res => setMovies(res.data))
      .catch(() => {});
  }, []);

  return (
    <section>
      <h2>المسلسلات والأفلام</h2>
      <div className="grid">
        {movies.map(m => (
          <MovieCard key={m._id} movie={m} />
        ))}
      </div>
    </section>
  );
}
