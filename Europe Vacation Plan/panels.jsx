// 추가 패널들: 전체 일정 개요, 파리 근교, 숙소, 체크리스트, 번역

function OverviewPanel({ onDayClick, onCityClick }) {
  const data = window.TRIP_DATA;
  const cities = Object.values(data.cities);
  return (
    <div className="overview-wrap">
      <div className="ov-header">
        <div className="em-tag">All Days</div>
        <h2 className="em-title">전체 <span className="serif">일정표</span></h2>
        <p className="em-sub">10일 · 4개 도시 · 3회 국경/도시 이동</p>
      </div>

      <div className="ov-cities-strip">
        {cities.map(c => (
          <div key={c.id} className="ov-city-block" style={{ borderTopColor: c.color }}>
            <div className="ov-city-head">
              <span className="ov-city-name">{c.name}</span>
              <span className="ov-city-en serif">{c.nameEn}</span>
            </div>
            <div className="ov-city-days">
              {c.days.map(n => {
                const d = data.days.find(x => x.n === n);
                return (
                  <button key={n} className="ov-day-btn" onClick={() => onDayClick(n)}>
                    <span className="ov-day-num" style={{ color: c.color }}>D{n}</span>
                    <span className="ov-day-title">{d.title}</span>
                    <span className="ov-day-date">{d.dateLabel}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="ov-table-wrap">
        <table className="ov-table">
          <thead>
            <tr>
              <th>Day</th><th>날짜</th><th>도시</th><th>주제</th><th>핵심 일정</th><th></th>
            </tr>
          </thead>
          <tbody>
            {data.days.map(d => {
              const c = data.cities[d.city];
              const tc = d.toCity ? data.cities[d.toCity] : null;
              return (
                <tr key={d.n} onClick={() => onDayClick(d.n)}>
                  <td><span className="ov-td-day serif" style={{ color: c.color }}>{String(d.n).padStart(2, '0')}</span></td>
                  <td>{d.dateLabel}</td>
                  <td>
                    <span className="ov-td-city">
                      <span className="dot" style={{ background: c.color }}/>
                      {c.name}
                      {tc && <><span className="arrow">→</span><span className="dot" style={{ background: tc.color }}/>{tc.name}</>}
                    </span>
                  </td>
                  <td className="ov-td-title">{d.title}</td>
                  <td className="ov-td-sum">{d.summary}</td>
                  <td><span className="ov-td-arrow">→</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function OutskirtsPanel({ onBack }) {
  const list = window.TRIP_DATA.outskirts;
  return (
    <div className="outskirts-wrap">
      <div className="ov-header">
        <button className="back-btn" onClick={onBack}><span>←</span><span>지도로</span></button>
        <div className="em-tag">Day Trips from Paris</div>
        <h2 className="em-title">파리 <span className="serif">근교</span></h2>
        <p className="em-sub">당일치기로 다녀올 수 있는 곳들. 체류 4박 동안 선택 가능.</p>
      </div>

      <div className="outskirts-grid">
        {list.map(o => (
          <div key={o.id} className={`ok-card ${o.confirmed ? 'confirmed' : ''}`}>
            <div className="ok-head">
              <div>
                <div className="ok-name">{o.name}</div>
                <div className="ok-en serif">{o.nameEn}</div>
              </div>
              {o.confirmed ? (
                <span className="ok-badge confirmed">✓ 일정 포함</span>
              ) : o.season.includes('★') ? (
                <span className="ok-badge star">★ 추천</span>
              ) : (
                <span className="ok-badge">선택</span>
              )}
            </div>
            <div className="ok-meta">
              <div className="ok-row"><span className="ok-lbl">거리</span><span>{o.distance}</span></div>
              <div className="ok-row"><span className="ok-lbl">교통</span><span>{o.transport}</span></div>
              <div className="ok-row"><span className="ok-lbl">소요</span><span>{o.duration}</span></div>
              <div className="ok-row"><span className="ok-lbl">시즌</span><span>{o.season}</span></div>
            </div>
            <div className="ok-hl">
              <div className="ok-lbl-sm">하이라이트</div>
              <div>{o.highlight}</div>
            </div>
            <div className="ok-tip">
              <div className="ok-lbl-sm">팁</div>
              <div>{o.tip}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HotelsPanel({ onBack }) {
  const data = window.TRIP_DATA;
  return (
    <div className="hotels-wrap">
      <div className="ov-header">
        <button className="back-btn" onClick={onBack}><span>←</span><span>돌아가기</span></button>
        <div className="em-tag">Accommodations</div>
        <h2 className="em-title">숙소 <span className="serif">정보</span></h2>
        <p className="em-sub">확정된 4개 숙소 · 파리 대안 후보 {data.parisCandidates.length}곳</p>
      </div>

      <h3 className="section-h">✓ 확정된 숙소</h3>
      <div className="hotels-grid">
        {data.hotels.map((h, i) => {
          const c = data.cities[h.city];
          return (
            <div key={i} className="hotel-card" style={{ borderTopColor: c.color }}>
              <div className="hc-head">
                <span className="hc-city" style={{ color: c.color }}>
                  <span className="dot" style={{ background: c.color }}/>
                  {c.name}
                </span>
                <span className="hc-type">{h.type}</span>
              </div>
              <div className="hc-name">{h.name}</div>
              <div className="hc-en serif">{h.nameEn}</div>
              <div className="hc-meta">
                <div>{h.nights}</div>
                <div>{h.district}</div>
              </div>
              <div className="hc-status">✓ 확정</div>
            </div>
          );
        })}
      </div>

      <h3 className="section-h">파리 숙소 후보 (검토용)</h3>
      <div className="candidates-table-wrap">
        <table className="cand-table">
          <thead>
            <tr><th>숙소명</th><th>구</th><th>타입</th><th>교통</th><th className="price">가격 (KRW)</th></tr>
          </thead>
          <tbody>
            {data.parisCandidates.map((c, i) => (
              <tr key={i}>
                <td className="cand-name">{c.name}</td>
                <td>{c.district}</td>
                <td>{c.type}</td>
                <td>{c.note}</td>
                <td className="price">₩{c.price.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ChecklistPanel({ onBack }) {
  const [state, setState] = React.useState(() => {
    const saved = localStorage.getItem('__tripChecklist');
    if (saved) return JSON.parse(saved);
    return window.TRIP_DATA.checklist;
  });
  React.useEffect(() => {
    localStorage.setItem('__tripChecklist', JSON.stringify(state));
  }, [state]);

  function toggle(section, idx) {
    const copy = { ...state };
    copy[section] = [...copy[section]];
    copy[section][idx] = { ...copy[section][idx], done: !copy[section][idx].done };
    setState(copy);
  }

  const totalCount = Object.values(state).flat().length;
  const doneCount = Object.values(state).flat().filter(x => x.done).length;

  return (
    <div className="checklist-wrap">
      <div className="ov-header">
        <button className="back-btn" onClick={onBack}><span>←</span><span>돌아가기</span></button>
        <div className="em-tag">Pre-trip Checklist</div>
        <h2 className="em-title">여행 <span className="serif">준비</span></h2>
        <p className="em-sub">{doneCount} / {totalCount} 완료 · 체크 내용은 자동 저장됩니다.</p>
        <div className="cl-progress">
          <div className="cl-bar" style={{ width: `${(doneCount/totalCount)*100}%` }}/>
        </div>
      </div>

      <div className="checklist-grid">
        {Object.entries(state).map(([section, items]) => (
          <div key={section} className="cl-section">
            <h3 className="cl-section-h">{section}</h3>
            <ul className="cl-list">
              {items.map((item, i) => (
                <li key={i} className={`cl-item ${item.done ? 'done' : ''}`} onClick={() => toggle(section, i)}>
                  <span className="cl-box">{item.done ? '✓' : ''}</span>
                  <span className="cl-text">{item.t}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function PhrasesPanel({ onBack }) {
  return (
    <div className="phrases-wrap">
      <div className="ov-header">
        <button className="back-btn" onClick={onBack}><span>←</span><span>돌아가기</span></button>
        <div className="em-tag">Essential Phrases</div>
        <h2 className="em-title">여행 <span className="serif">회화</span></h2>
        <p className="em-sub">프랑스어 · 이탈리아어 핵심 표현</p>
      </div>
      <div className="phrases-table-wrap">
        <table className="phrases-table">
          <thead>
            <tr><th>한국어</th><th>🇫🇷 프랑스어</th><th>🇮🇹 이탈리아어</th></tr>
          </thead>
          <tbody>
            {window.TRIP_DATA.phrases.map((p, i) => (
              <tr key={i}>
                <td className="ph-ko">{p.ko}</td>
                <td className="ph-fr">{p.fr}</td>
                <td className="ph-it">{p.it}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

window.OverviewPanel = OverviewPanel;
window.OutskirtsPanel = OutskirtsPanel;
window.HotelsPanel = HotelsPanel;
window.ChecklistPanel = ChecklistPanel;
window.PhrasesPanel = PhrasesPanel;
