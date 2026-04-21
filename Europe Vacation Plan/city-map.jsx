// 도시별 Leaflet 지도 + 실제 POI 좌표 + Day 하이라이트 + 교통경로

function CityMap({ cityId, onBack, onDaySelect }) {
  const city = window.TRIP_DATA.cities[cityId];
  const allPois = window.TRIP_DATA.pois[cityId] || [];
  const [hoveredPoi, setHoveredPoi] = React.useState(null);
  const [activeDay, setActiveDay] = React.useState(null); // 선택된 day n (숫자)
  const [showOutskirts, setShowOutskirts] = React.useState(true);
  const [tileStyle, setTileStyle] = React.useState('watercolor');
  const mapRef = React.useRef(null);
  const markersRef = React.useRef({});
  const routesRef = React.useRef([]); // Day별 교통경로 polyline들
  const tileRefs = React.useRef({ base: null, labels: null });
  const containerRef = React.useRef(null);

  const mainPois = allPois.filter(p => !p.outskirts);
  const outskirtsPois = allPois.filter(p => p.outskirts);
  const visiblePois = showOutskirts ? allPois : mainPois;

  // 이 도시를 지나는 모든 days (도착/출발/머무르는 날 포함)
  const cityDays = window.TRIP_DATA.days.filter(d =>
    d.city === cityId || d.toCity === cityId ||
    (d.items && d.items.some(it => it.poi && allPois.find(p => p.id === it.poi)))
  );

  // 활성 day의 POI ids 계산
  const activeDayData = cityDays.find(d => d.n === activeDay);
  const activeDayPoiIds = React.useMemo(() => {
    if (!activeDayData) return new Set();
    const ids = new Set();
    activeDayData.items.forEach(it => {
      if (it.poi) ids.add(it.poi);
    });
    return ids;
  }, [activeDay, cityId]);

  // 해당 도시의 숙소 찾기
  const cityHotel = allPois.find(p => p.kind === 'hotel');

  // 타일 정의
  const tiles = {
    watercolor: { base: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', attr: '© OpenStreetMap © CARTO', sub: 'abcd' },
    toner: { base: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', attr: '© OpenStreetMap © CARTO', sub: 'abcd' },
    osm: { base: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', attr: '© OpenStreetMap contributors', sub: 'abc' }
  };

  // Init map
  React.useEffect(() => {
    if (!window.L || !containerRef.current) return;
    const map = L.map(containerRef.current, {
      center: [city.lat, city.lng], zoom: city.zoom,
      zoomControl: true, scrollWheelZoom: true,
    });
    mapRef.current = map;
    setTimeout(() => map.invalidateSize(), 100);
    return () => {
      if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; }
      markersRef.current = {};
      routesRef.current = [];
      tileRefs.current = { base: null, labels: null };
    };
  }, [cityId]);

  // Apply tile style
  React.useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const t = tiles[tileStyle];
    if (tileRefs.current.base) { map.removeLayer(tileRefs.current.base); tileRefs.current.base = null; }
    tileRefs.current.base = L.tileLayer(t.base, {
      attribution: t.attr, subdomains: t.sub || 'abc', maxZoom: 20
    }).addTo(map);
  }, [tileStyle, cityId]);

  // Draw markers (with active-day highlighting)
  React.useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    Object.values(markersRef.current).forEach(m => map.removeLayer(m));
    markersRef.current = {};

    visiblePois.forEach(poi => {
      const isHotel = poi.kind === 'hotel';
      const isInActiveDay = activeDay != null && activeDayPoiIds.has(poi.id);
      const isDimmed = activeDay != null && !isInActiveDay && !isHotel;

      const markerColor = isHotel ? '#1a1a1a' : city.color;
      const bgColor = isHotel ? city.color : '#fff6e8';

      let cls = 'poi-marker-html';
      if (poi.outskirts) cls += ' outskirts';
      if (isInActiveDay) cls += ' active-day';
      if (isDimmed) cls += ' dimmed';

      const html = `
        <div class="${cls}" data-id="${poi.id}">
          <div class="pm-bubble" style="background:${bgColor}; border-color:${markerColor}">
            ${window.iconHtml(poi.kind, markerColor, 2.2)}
          </div>
          <div class="pm-label">${poi.name}</div>
          ${poi.day ? `<div class="pm-day" style="background:${city.color}">${poi.day}</div>` : ''}
          ${isInActiveDay ? `<div class="pm-ring" style="border-color:${city.color}"></div>` : ''}
        </div>`;
      const icon = L.divIcon({
        html, className: 'poi-marker-leaflet', iconSize: [140, 50], iconAnchor: [70, 44]
      });
      const marker = L.marker([poi.lat, poi.lng], { icon, riseOnHover: true, zIndexOffset: isInActiveDay ? 1000 : 0 }).addTo(map);
      marker.on('mouseover', () => setHoveredPoi(poi.id));
      marker.on('mouseout', () => setHoveredPoi(null));
      markersRef.current[poi.id] = marker;
    });

    // 초기 fit bounds (activeDay가 없을 때)
    if (activeDay == null && visiblePois.length > 0) {
      const bounds = L.latLngBounds(visiblePois.filter(p => !p.outskirts || p.kind !== 'plane').map(p => [p.lat, p.lng]));
      if (bounds.isValid()) map.fitBounds(bounds, { padding: [50, 50], maxZoom: city.zoom + 1 });
    }
  }, [visiblePois.length, showOutskirts, cityId, activeDay]);

  // Draw routes + fit to active day POIs
  React.useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Clear old routes
    routesRef.current.forEach(r => map.removeLayer(r));
    routesRef.current = [];

    if (activeDay == null) return;

    const day = cityDays.find(d => d.n === activeDay);
    if (!day) return;

    // 1. Day 내 POI들을 순서대로 연결 (걷는 경로 · 점선)
    const dayPois = day.items
      .filter(it => it.poi)
      .map(it => allPois.find(p => p.id === it.poi))
      .filter(Boolean);

    const walkPoints = [];
    // 시작점: 해당 도시 숙소 (숙박 있는 날만)
    if (cityHotel && day.city === cityId && dayPois.length > 0) {
      walkPoints.push([cityHotel.lat, cityHotel.lng]);
    }
    dayPois.forEach(p => walkPoints.push([p.lat, p.lng]));

    if (walkPoints.length >= 2) {
      const walk = L.polyline(walkPoints, {
        color: city.color,
        weight: 3,
        opacity: 0.55,
        dashArray: '2 8',
        lineCap: 'round'
      }).addTo(map);
      routesRef.current.push(walk);
    }

    // 2. 도시간 이동 (toCity 있으면 기차/버스 경로)
    if (day.toCity && day.toCity !== cityId) {
      // 현재 도시에서 다음 도시로 떠나는 경우
      const nextCity = window.TRIP_DATA.cities[day.toCity];
      if (nextCity) {
        const transit = L.polyline([
          [city.lat, city.lng],
          [nextCity.lat, nextCity.lng]
        ], {
          color: '#1a1a1a', weight: 3, opacity: 0.7,
        }).addTo(map);
        routesRef.current.push(transit);

        // 교통수단 뱃지
        const transitItem = day.items.find(it => ['train','bus','flight'].includes(it.type));
        const transitKind = transitItem?.type || 'train';
        const transitIcon = L.divIcon({
          className: 'transit-badge-leaflet',
          html: `<div class="transit-badge">
            <div class="tb-icon">${window.iconHtml(transitKind, '#1a1a1a', 2)}</div>
            <div class="tb-text">→ ${nextCity.name}</div>
          </div>`,
          iconSize: [120, 44], iconAnchor: [60, 22]
        });
        const midLat = (city.lat + nextCity.lat) / 2;
        const midLng = (city.lng + nextCity.lng) / 2;
        const badge = L.marker([midLat, midLng], { icon: transitIcon, interactive: false }).addTo(map);
        routesRef.current.push(badge);
      }
    }

    if (day.city !== cityId && day.toCity === cityId) {
      // 이 도시로 도착하는 날 (출발지→이 도시)
      const fromCity = window.TRIP_DATA.cities[day.city];
      if (fromCity) {
        const transit = L.polyline([
          [fromCity.lat, fromCity.lng],
          [city.lat, city.lng]
        ], { color: '#1a1a1a', weight: 3, opacity: 0.7 }).addTo(map);
        routesRef.current.push(transit);
      }
    }

    // 3. Fit bounds to active day POIs (포함 이동경로)
    const fitPoints = [...walkPoints];
    if (day.toCity && day.toCity !== cityId) {
      const nc = window.TRIP_DATA.cities[day.toCity];
      if (nc) fitPoints.push([nc.lat, nc.lng]);
    }
    if (fitPoints.length > 0) {
      const bounds = L.latLngBounds(fitPoints);
      if (bounds.isValid()) {
        map.flyToBounds(bounds, { padding: [80, 80], maxZoom: 14, duration: 0.8 });
      }
    }
  }, [activeDay, cityId]);

  // Highlight hovered marker
  React.useEffect(() => {
    Object.entries(markersRef.current).forEach(([id, marker]) => {
      const el = marker.getElement();
      if (!el) return;
      if (id === hoveredPoi) el.classList.add('hovered');
      else el.classList.remove('hovered');
    });
  }, [hoveredPoi]);

  function focusPoi(poi) {
    const map = mapRef.current;
    if (!map) return;
    map.flyTo([poi.lat, poi.lng], Math.max(map.getZoom(), 15), { duration: 0.8 });
    setHoveredPoi(poi.id);
  }

  function handleDayClick(n) {
    setActiveDay(activeDay === n ? null : n);
  }

  function resetView() {
    setActiveDay(null);
    const map = mapRef.current;
    if (!map) return;
    map.flyTo([city.lat, city.lng], city.zoom, { duration: 0.6 });
  }

  // 현재 active day의 타임라인
  const activeDayTimeline = activeDayData?.items.filter(it => it.poi || it.type === 'train' || it.type === 'bus' || it.type === 'flight') || [];

  return (
    <div className="city-map-wrap">
      <div className="city-map-header">
        <button className="back-btn" onClick={onBack}>
          <span>←</span> <span>유럽 지도로</span>
        </button>
        <div className="city-title-block">
          <div className="ct-tag" style={{ color: city.color }}>
            <span className="dot" style={{ background: city.color }}/>
            {city.country}
          </div>
          <h1 className="ct-name">
            <span className="ct-ko">{city.name}</span>
            <span className="ct-en serif">{city.nameEn}</span>
          </h1>
          <p className="ct-desc">{city.desc}</p>
        </div>
        <div className="city-day-pills">
          {cityDays.map(d => {
            const isActive = activeDay === d.n;
            const hasPoi = d.items.some(it => it.poi);
            const hasTransit = d.toCity && d.toCity !== d.city;
            return (
              <button key={d.n}
                className={`day-pill ${isActive ? 'is-active' : ''}`}
                onClick={() => handleDayClick(d.n)}
                style={{
                  borderLeftColor: city.color,
                  background: isActive ? city.color : undefined,
                  color: isActive ? '#fff6e8' : undefined,
                }}>
                <span className="dp-num">D{d.n}</span>
                <span className="dp-title">{d.title}</span>
                <span className="dp-icons">
                  {hasPoi && <span className="dp-dot" title="명소"/>}
                  {hasTransit && <span className="dp-arrow">→</span>}
                </span>
              </button>
            );
          })}
          {activeDay != null && (
            <button className="day-pill reset" onClick={resetView}>
              <span>전체 보기</span>
            </button>
          )}
        </div>
        {activeDay != null && activeDayData && (
          <div className="day-timeline-strip" style={{ borderColor: city.color }}>
            <div className="dts-head">
              <span className="dts-tag" style={{ background: city.color }}>Day {activeDay}</span>
              <span className="dts-date">{activeDayData.dateLabel}</span>
              <button className="dts-open" onClick={() => onDaySelect(activeDay)}>상세 일정 →</button>
            </div>
            <div className="dts-title serif">{activeDayData.title}</div>
            <div className="dts-items">
              {activeDayData.items.map((it, i) => (
                <div key={i} className="dts-item">
                  <span className="dts-time">{it.time}</span>
                  <span className="dts-icon" style={{ color: city.color }}>
                    <PoiIcon kind={it.type === 'train' ? 'train' : it.type === 'bus' ? 'bus' : it.type === 'flight' ? 'plane' : it.type === 'hotel' ? 'hotel' : (it.poi ? (allPois.find(p => p.id === it.poi)?.kind || 'sight') : 'sight')} color={city.color} size={16}/>
                  </span>
                  <span className="dts-label">{it.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="city-map-toolbar">
        <div className="tile-switcher">
          <span className="ts-label">지도 스타일</span>
          <button className={`ts-btn ${tileStyle==='watercolor'?'active':''}`} onClick={() => setTileStyle('watercolor')}>컬러</button>
          <button className={`ts-btn ${tileStyle==='toner'?'active':''}`} onClick={() => setTileStyle('toner')}>라이트</button>
          <button className={`ts-btn ${tileStyle==='osm'?'active':''}`} onClick={() => setTileStyle('osm')}>표준</button>
        </div>
        {outskirtsPois.length > 0 && (
          <label className="outskirts-toggle">
            <input type="checkbox" checked={showOutskirts} onChange={e => setShowOutskirts(e.target.checked)}/>
            <span>근교 명소 포함 ({outskirtsPois.length})</span>
          </label>
        )}
      </div>

      <div ref={containerRef} className="leaflet-city"/>

      <div className="city-map-footer">
        <div className="legend-row">
          <div className="poi-count">
            <span className="count-num">{activeDay ? activeDayPoiIds.size : visiblePois.length}</span>
            <span className="count-lbl">{activeDay ? `Day ${activeDay} 방문지` : '곳 표시 중'}</span>
          </div>
        </div>

        <div className="poi-list">
          {visiblePois
            .filter(p => activeDay == null || activeDayPoiIds.has(p.id) || p.kind === 'hotel')
            .map(poi => (
            <div key={poi.id}
              className={`poi-row ${hoveredPoi === poi.id ? 'hover' : ''} ${poi.outskirts ? 'is-outskirts' : ''} ${activeDay != null && activeDayPoiIds.has(poi.id) ? 'is-active-day' : ''}`}
              onMouseEnter={() => setHoveredPoi(poi.id)}
              onMouseLeave={() => setHoveredPoi(null)}
              onClick={() => focusPoi(poi)}>
              <div className="poi-row-icon" style={{ color: poi.kind === 'hotel' ? '#1a1a1a' : city.color }}>
                <PoiIcon kind={poi.kind} color={poi.kind === 'hotel' ? '#1a1a1a' : city.color} size={22}/>
              </div>
              <div className="poi-row-body">
                <div className="poi-row-name">{poi.name}</div>
                {poi.note && <div className="poi-row-note">{poi.note}</div>}
              </div>
              <div className="poi-row-day" style={{ color: city.color, borderColor: city.color + '40' }}>
                {poi.day}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

window.CityMap = CityMap;
