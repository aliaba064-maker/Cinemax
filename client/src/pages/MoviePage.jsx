import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import CommentSection from '../components/CommentSection';

export default function MoviePage(){
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    api.get(`/movies/${id}`).then(r => setMovie(r.data)).catch(() => {});
    api.get(`/episodes/${id}`).then(r => setEpisodes(r.data)).catch(() => {});
    api.get(`/comments/${id}`).then(r => setComments(r.data)).catch(() => {});
  }, [id]);

  if (!movie) return <div>تحميل...</div>;

  return (
    <section className="movie-detail">
      <div className="hero">
        <img src={movie.poster} alt={movie.title} className="poster" />
        <div className="info">
          <h1>{movie.title}</h1>
          <p>{movie.description}</p>
          <div>التصنيفات: {movie.categories?.join(', ')}</div>
          <div>اللغة: {movie.language} • الدولة: {movie.country}</div>
          <button className="btn" onClick={() => window.open('https://example.com/watch', '_blank')}>مشاهدة</button>
          <button className="btn secondary" onClick={() => window.open('https://example.com/download', '_blank')}>تحميل</button>
        </div>
      </div>

      {episodes.length > 0 && (
        <div className="episodes">
          <h3>الحلقات</h3>
          <ul>
            {episodes.map(e => (
              <li key={e._id}>
                الحلقة {e.number} - {e.title}
                <a href={e.videoUrl} target="_blank" rel="noopener noreferrer">تشغيل</a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <CommentSection workId={id} comments={comments} setComments={setComments} />
    </section>
  );
}
