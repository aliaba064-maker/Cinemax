import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar(){
  return (
    <nav className="nav">
      <Link to="/">الرئيسية</Link>
      <Link to="/profile">المفضلة / سجل المشاهدة</Link>
      <Link to="/login">دخول</Link>
    </nav>
  );
}
