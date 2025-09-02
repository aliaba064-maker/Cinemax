import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function ProfilePage(){
  const [data, setData] = useState({ favorites: [], history: [], downloads: [] });

  useEffect(() => {
    api.get('/history', { // يعتمد وجود التفويض في header
    }).then(res => setData(d => ({ ...d, history: res.data }))).catch(() => {});
    api.get('/downloads').then(res => setData(d => ({ ...d, downloads: res.data }))).catch(() => {});
    // المفضلة يمكن إضافتها كطلب خاص
  }, []);

  return (
    <section>
      <h2>ملف المستخدم</h2>
      <div className="section">
        <h3>المفضلة</h3>
        {/* عرض عناصر المفضلة من البيانات المحفوظة أو من API */}
      </div>
      <div className="section">
        <h3>سجل المشاهدة</h3>
        <ul>
          {data.history.map((h,i) => (
            <li key={i}>{h.workId} - {new Date(h.watchedAt).toLocaleString()} - التراكب: {h.progress || 0}%</li>
          ))}
        </ul>
      </div>
      <div className="section">
        <h3>سجل التنزيلات</h3>
        <ul>
          {data.downloads.map((d,i) => (
            <li key={i}>{d.workId} - {new Date(d.downloadedAt).toLocaleString()}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
