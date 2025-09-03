import React from 'react';
import { Link } from 'react-router-dom';

export default function MovieCard({ movie }){
  // افتراضياً تستخدم صورة poster و عنوان
  return (
    <div className="card">
      <img src={movie.poster} alt={movie.title} className="poster" />
      <div className="card-info">
        <h4>{movie.title}</h4>
        <Link to={`/movie/${movie._id}`} className="btn">تفاصيل</Link>
      </div>
    </div>
  );
}
