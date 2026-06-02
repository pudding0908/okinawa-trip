'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [data, setData] = useState<any[]>([]);
  const [activeDay, setActiveDay] = useState(1);

  useEffect(() => {
    // 放入您的 CSV 發佈連結 (請確保已發佈為公開 CSV)
    const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQcPzPct92RIaHrTGtEtSYXLg7_ZVI_Q_9N2WM7mbIfRY6ffqiBICn-bwYS7j7pU5cu3sJSb992_Wm5/pub?output=csv';

    fetch(csvUrl)
      .then(res => res.text())
      .then(csvText => {
        const lines = csvText.split('\n');
        const headers = lines[0].split(',');
        const result = lines.slice(1).map(line => {
          const values = line.split(',');
          return headers.reduce((obj, header, i) => ({ ...obj, [header.trim()]: values[i] }), {});
        });
        setData(result);
      });
  }, []);

  return (
    <main className="p-4 max-w-sm mx-auto font-sans">
      <h1 className="text-xl font-bold text-center mb-4">OKINAWA 2026</h1>
      
      {/* 切換按鈕 */}
      <div className="flex justify-center gap-2 mb-6">
        {[1, 2, 3, 4].map(d => (
          <button key={d} onClick={() => setActiveDay(d)} 
            className={`px-3 py-1 rounded-full text-xs border ${activeDay === d ? 'bg-black text-white' : ''}`}>Day {d}</button>
        ))}
      </div>

      {/* 時間軸 */}
      <div className="border-l-2 border-gray-200 ml-2 space-y-6">
        {data.filter(i => Number(i.Day) === activeDay).map((item, i) => (
          <div key={i} className="relative pl-6">
            <div className="absolute -left-[9px] top-1 w-4 h-4 bg-white border-2 border-black rounded-full" />
            <div className="text-xs font-bold text-gray-500">{item.時間起} - {item.時間迄}</div>
            <div className="text-lg font-bold">{item.標題}</div>
            <div className="text-sm text-gray-600">{item.說明}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
