// Day별 상세 일정 뷰

function DayView({ dayN, onBack, onCityJump }) {
  const day = window.TRIP_DATA.days.find(d => d.n === dayN);
  if (!day) return null;
  const city = window.TRIP_DATA.cities[day.city];
  const toCity = day.toCity ? window.TRIP_DATA.cities[day.toCity] : null;
  const hotel = window.TRIP_DATA.hotels.find(h => h.city === (toCity?.id || city.id));

  const totalDays = window.TRIP_DATA.days.length;
  const prev = dayN > 1 ? dayN - 1 : null;
  const next = dayN < totalDays ? dayN + 1 : null;

  const typeLabel = {
    flight: "항공", train: "기차", bus: "버스", arrive: "도착",
    hotel: "숙소", sight: "관광", food: "식사", shop: "쇼핑", spa: "온천"
  };

  return (
    <div className="day-view-wrap">
      <div className="dv-header">
        <button className="back-btn" onClick={onBack}><span>←</span><span>전체 일정</span></button>
        <div className="dv-nav">
          {prev && <button className="dv-nav-btn" onClick={() => window.__goDay(prev)}>← Day {prev}</button>}
          {next && <button className="dv-nav-btn" onClick={() => window.__goDay(next)}>Day {next} →</button>}
        </div>
      </div>

      <div className="dv-hero" style={{ background: `linear-gradient(135deg, ${city.color}14, ${city.color}04)` }}>
        <div className="dv-hero-left">
          <div className="dv-day-num serif" style={{ color: city.color }}>
            Day <span className="big">{String(day.n).padStart(2, '0')}</span>
          </div>
          <div className="dv-date">{day.dateLabel}</div>
          <h1 className="dv-title">{day.title}</h1>
          <p className="dv-summary">{day.summary}</p>
          <div className="dv-city-chips">
            <button className="dv-city-chip" onClick={() => onCityJump(city.id)} style={{ borderColor: city.color }}>
              <span className="dot" style={{ background: city.color }}/>
              {city.name} 지도 보기
            </button>
            {toCity && (
              <>
                <span className="arrow">→</span>
                <button className="dv-city-chip" onClick={() => onCityJump(toCity.id)} style={{ borderColor: toCity.color }}>
                  <span className="dot" style={{ background: toCity.color }}/>
                  {toCity.name} 지도 보기
                </button>
              </>
            )}
          </div>
        </div>
        <div className="dv-hero-right">
          <DayProgressDots totalDays={totalDays} currentDay={day.n}/>
        </div>
      </div>

      <div className="dv-body">
        <div className="dv-timeline">
          <h3 className="section-h">타임라인</h3>
          <div className="timeline">
            {day.items.map((item, i) => (
              <div key={i} className={`tl-item type-${item.type}`}>
                <div className="tl-time">{item.time}</div>
                <div className="tl-dot-col">
                  <div className="tl-dot" style={{ background: city.color }}/>
                  {i < day.items.length - 1 && <div className="tl-line"/>}
                </div>
                <div className="tl-card">
                  <div className="tl-card-head">
                    <span className="tl-label">{item.label}</span>
                    <span className="tl-type-tag">{typeLabel[item.type] || item.type}</span>
                  </div>
                  {item.note && <div className="tl-note">{item.note}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dv-side">
          {hotel && (
            <div className="dv-hotel-card">
              <div className="card-tag">오늘 밤 숙소</div>
              <svg width="36" height="36" viewBox="0 0 32 32">
                {window.POI_ICONS.hotel('#1a1a1a')}
              </svg>
              <div className="hotel-name">{hotel.name}</div>
              <div className="hotel-en">{hotel.nameEn}</div>
              <div className="hotel-meta">
                <span>{hotel.nights}</span>
                <span>·</span>
                <span>{hotel.district}</span>
              </div>
              <div className="hotel-status">✓ {hotel.status}</div>
            </div>
          )}

          <TransportCard day={day}/>
          <TipsCard day={day}/>
        </div>
      </div>
    </div>
  );
}

function DayProgressDots({ totalDays, currentDay }) {
  return (
    <div className="day-dots-wrap">
      <div className="day-dots-label">진행</div>
      <div className="day-dots">
        {Array.from({ length: totalDays }, (_, i) => {
          const n = i + 1;
          const state = n < currentDay ? 'past' : n === currentDay ? 'now' : 'future';
          return (
            <div key={n} className={`day-dot ${state}`} onClick={() => window.__goDay(n)}>
              <span>{n}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TransportCard({ day }) {
  const transports = day.items.filter(i => ['flight', 'train', 'bus'].includes(i.type));
  if (transports.length === 0) return null;

  return (
    <div className="dv-transport-card">
      <div className="card-tag">교통편</div>
      {transports.map((t, i) => (
        <div key={i} className="transport-item">
          <div className="tp-icon">
            {t.type === 'flight' ? '✈' : t.type === 'train' ? '⎯⎯' : '⎯'}
          </div>
          <div>
            <div className="tp-time">{t.time}</div>
            <div className="tp-label">{t.label}</div>
            {t.note && <div className="tp-note">{t.note}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}

function TipsCard({ day }) {
  const tipsByDay = {
    1: "장시간 비행 · 도착 후 가벼운 산책으로 시차 적응",
    2: "노트르담은 외관 관람만 가능 (복구 공사). 박물관패스 활용",
    3: "일요일 상점 휴무 주의. 몽마르트는 소매치기 조심",
    4: "베르사유 월요일 휴관 확인. 오전 일찍 출발 권장",
    5: "TGV는 출발 30분 전 탑승. 리옹역 규모 큼",
    6: "블라블라카 예약 확인. 짐 무게 제한 체크",
    7: "에귀 뒤 미디는 고산병 주의. 따뜻한 옷 필수",
    8: "몽탕베르 빙하동굴 얼음 미끄러움 · 운동화",
    9: "두오모 옥상 예약 필수. 아페리티보는 18-20시",
    10: "체크아웃 후 짐 보관 서비스 활용. 공항 2시간 전 도착"
  };
  const tip = tipsByDay[day.n];
  if (!tip) return null;
  return (
    <div className="dv-tips-card">
      <div className="card-tag">오늘의 팁</div>
      <p className="tip-text">{tip}</p>
    </div>
  );
}

window.DayView = DayView;
