// 유럽 전체 지도 - Leaflet + OpenStreetMap 타일

function EuropeMap({ onCityClick }) {
  const mapRef = React.useRef(null);
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    if (!window.L) return;
    if (mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [47.5, 5.5],
      zoom: 5,
      zoomControl: true,
      scrollWheelZoom: true,
      attributionControl: true,
    });

    // CartoDB Positron — 무료, 무인증, 깔끔한 회색톤
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '© OpenStreetMap © CARTO',
      subdomains: 'abcd',
      maxZoom: 20,
    }).addTo(map);

    mapRef.current = map;
    setTimeout(() => map.invalidateSize(), 100);

    const cities = Object.values(window.TRIP_DATA.cities);
    const bounds = L.latLngBounds(cities.map(c => [c.lat, c.lng]));

    // 이동 경로
    const routes = [
      ['paris', 'annecy'],
      ['annecy', 'chamonix'],
      ['chamonix', 'milano']
    ];
    routes.forEach(([a, b]) => {
      const ca = window.TRIP_DATA.cities[a];
      const cb = window.TRIP_DATA.cities[b];
      L.polyline([[ca.lat, ca.lng], [cb.lat, cb.lng]], {
        color: '#1a1a1a', weight: 2, dashArray: '6 6', opacity: 0.6
      }).addTo(map);
    });

    // 도시 마커
    cities.forEach(city => {
      const html = `
        <div class="city-marker" style="--c:${city.color}">
          <div class="cm-pin">
            <div class="cm-inner"></div>
          </div>
          <div class="cm-label">
            <div class="cm-name">${city.name}</div>
            <div class="cm-en">${city.nameEn}</div>
            <div class="cm-days">Day ${city.days.join(', ')}</div>
          </div>
        </div>`;
      const icon = L.divIcon({
        html, className: 'city-marker-wrap', iconSize: [120, 70], iconAnchor: [60, 35]
      });
      const m = L.marker([city.lat, city.lng], { icon }).addTo(map);
      m.on('click', () => onCityClick(city.id));
    });

    map.fitBounds(bounds, { padding: [60, 60] });

    return () => { if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; } };
  }, [onCityClick]);

  return (
    <div className="europe-map-wrap">
      <div className="europe-map-header">
        <div className="em-tag">Trip Overview</div>
        <h2 className="em-title">유럽 <span className="serif">itinerary</span></h2>
        <p className="em-sub">2026 · 5월 22일 – 31일 · 10일 · 4개 도시 · 마커를 클릭하면 상세 지도로 이동</p>
      </div>

      <div ref={containerRef} className="leaflet-europe"/>

      <div className="europe-legend">
        {Object.values(window.TRIP_DATA.cities).map(c => (
          <button key={c.id} className="legend-chip" onClick={() => onCityClick(c.id)}>
            <span className="chip-dot" style={{ background: c.color }}/>
            <span className="chip-name">{c.name}</span>
            <span className="chip-en">{c.nameEn}</span>
            <span className="chip-days">D{c.days[0]}–{c.days[c.days.length-1]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

window.EuropeMap = EuropeMap;
