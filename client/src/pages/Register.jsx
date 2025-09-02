import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Register(){
  const [form, setForm] = useState({ username:'', email:'', password:'' });
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', form);
      navigate('/login');
    } catch {
      alert('فشل التسجيل');
    }
  };

  return (
    <form onSubmit={onSubmit} className="auth-form">
      <h2>تسجيل مستخدم جديد</h2>
      <input placeholder="اسم المستخدم" onChange={e => setForm({ ...form, username: e.target.value })} />
      <input placeholder="البريد الإلكت��وني" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="كلمة المرور" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button type="submit">تسجيل</button>
    </form>
  );
}
