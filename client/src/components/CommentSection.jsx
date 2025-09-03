import React, { useState } from 'react';
import api from '../services/api';

export default function CommentSection({ workId, comments, setComments }){
  const [text, setText] = useState('');
  const postComment = async () => {
    try {
      const res = await api.post(`/comments/${workId}`, { text });
      setComments([res.data, ...comments]);
      setText('');
    } catch {
      alert('فشل إرسال التعليق');
    }
  };
  return (
    <section className="comments">
      <h3>التعليقات</h3>
      <textarea placeholder="أضف تعليقك" value={text} onChange={e => setText(e.target.value)} />
      <button onClick={postComment}>إرسال</button>
      <ul>
        {comments.map(c => (
          <li key={c._id}><strong>{c.user}:</strong> {c.text} <em>({new Date(c.date).toLocaleString()})</em></li>
        ))}
      </ul>
    </section>
  );
}
