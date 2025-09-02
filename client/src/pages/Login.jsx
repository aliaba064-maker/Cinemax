import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      // حفظ معلومات المستخدم كما تريد
      navigate('/');
    } catch {
      alert('فشل تسجيل الدخول');
    }
  };

  return (
    <form onSubmit={onSubmit} className="auth-form">
      <h2>تسجيل الدخول</h2>
      <input placeholder="البريد الإلكتروني" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="كلمة المرور" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button type="submit">دخول</button>
    </form>
  );
}
