import { useState, useEffect } from 'react';
import './LottoGenerator.css'; // Component specific styles

export default function LottoGenerator() {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [bonus, setBonus] = useState<number | null>(null);
  const [sort, setSort] = useState(true);
  const [includeBonus, setIncludeBonus] = useState(false);

  const drawNumbers = () => {
    const pool = Array.from({ length: 45 }, (_, i) => i + 1);
    for (let i = pool.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    
    const count = includeBonus ? 7 : 6;
    const result = pool.slice(0, count);
    
    if (includeBonus) {
      setNumbers(result.slice(0, 6));
      setBonus(result[6]);
    } else {
      setNumbers(result);
      setBonus(null);
    }
  };

  // Initial draw
  useEffect(() => {
    drawNumbers();
  }, []);

  // Re-draw when options change (optional, but mimics some user expectations)
  // Actually, usually user wants to keep numbers when toggling sort, but re-draw when toggling bonus.
  // Let's keep it manual trigger mostly, but re-render display on sort change.

  const displayNumbers = sort ? [...numbers].sort((a, b) => a - b) : numbers;

  const getBallColor = (num: number) => {
    if (num <= 10) return "#fbc400";
    if (num <= 20) return "#69c8f2";
    if (num <= 30) return "#ff7272";
    if (num <= 40) return "#aaa";
    return "#b0d840";
  };

  return (
    <section className="panel">
      <h2>로또 번호 추첨</h2>
      <div className="controls">
        <div className="numbers-container">
          {displayNumbers.map((num, idx) => (
            <div 
              key={`${num}-${idx}`} 
              className="ball"
              style={{ borderColor: getBallColor(num), animationDelay: `${idx * 0.1}s` }}
            >
              {num}
            </div>
          ))}
          {bonus !== null && (
            <div 
              className="ball bonus"
              style={{ animationDelay: `${displayNumbers.length * 0.1}s` }}
            >
              {bonus}
            </div>
          )}
        </div>
        
        <div className="actions-row">
          <button onClick={drawNumbers} className="primary-btn">번호 생성하기</button>
        </div>
        
        <div className="options">
          <label>
            <input 
              type="checkbox" 
              checked={sort} 
              onChange={(e) => setSort(e.target.checked)} 
            />
            번호 정렬
          </label>
          <label>
            <input 
              type="checkbox" 
              checked={includeBonus} 
              onChange={(e) => {
                setIncludeBonus(e.target.checked);
                // Trigger redraw if enabling bonus to get a valid 7th number immediately or just reset
                // For simplicity, let's just update state, next click draws correct count.
                // Or better: auto-redraw
                // drawNumbers(); // Cannot call directly easily due to closure state staleness if not careful.
              }} 
            />
            보너스볼
          </label>
        </div>
      </div>
    </section>
  );
}