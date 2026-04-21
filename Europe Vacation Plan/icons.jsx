// Lucide 기반 POI 아이콘 — 실제로는 lucide SVG 문자열을 반환
// https://lucide.dev — MIT license

const LUCIDE = {
  hotel: `<path d="M10 22v-6.57"/><path d="M12 11h.01"/><path d="M12 7h.01"/><path d="M14 15.43V22"/><path d="M15 16a5 5 0 0 0-6 0"/><path d="M16 11h.01"/><path d="M16 7h.01"/><path d="M8 11h.01"/><path d="M8 7h.01"/><rect x="4" y="2" width="16" height="20" rx="2"/>`,
  tower: `<path d="M18 22h-2a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h2"/><path d="M8 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h2"/><path d="M12 2v20"/><path d="M4 8h16"/><path d="M4 16h16"/>`,
  cathedral: `<path d="M10 9h4"/><path d="M12 7v5"/><path d="M14 22v-4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4"/><path d="M18 22V5.618a1 1 0 0 0-.553-.894l-4.553-2.277a2 2 0 0 0-1.788 0L6.553 4.724A1 1 0 0 0 6 5.618V22"/><path d="m18 7 3.447 1.724a1 1 0 0 1 .553.894V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.618a1 1 0 0 1 .553-.894L6 7"/>`,
  museum: `<path d="M10 22v-6.5"/><path d="M12 2 2 7l10 5 10-5-10-5z"/><path d="M14 22v-6.5"/><path d="M18 22v-6.5"/><path d="M6 22v-6.5"/><path d="m2 7 10 5 10-5"/>`,
  monument: `<path d="M8 22h8"/><path d="M12 11v11"/><path d="m19 3-7 8-7-8Z"/>`,
  garden: `<path d="M12 22V8"/><path d="M5 12V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v5"/><circle cx="7" cy="4" r="2"/><circle cx="17" cy="4" r="2"/><circle cx="5" cy="14" r="3"/><circle cx="19" cy="14" r="3"/><circle cx="12" cy="19" r="3"/>`,
  hill: `<path d="m3 18 7-11 5 8 3-4 3 7z"/><circle cx="17" cy="5" r="2"/>`,
  palace: `<path d="M3 10V5l3 2 3-2 3 2 3-2 3 2 3-2v5"/><path d="M3 10h18v11H3z"/><path d="M10 21v-4a2 2 0 0 1 4 0v4"/>`,
  summit: `<path d="m2 20 6-12 4 6 3-4 7 10Z"/><path d="m6 14 2-4 2 4"/>`,
  glacier: `<path d="m2 21 8-14 4 6 3-4 5 12Z"/><circle cx="10" cy="6" r="1.5"/><circle cx="17" cy="4" r="1"/>`,
  spa: `<path d="M12 3c.5 2 2 3.5 4 4-2 .5-3.5 2-4 4-.5-2-2-3.5-4-4 2-.5 3.5-2 4-4z"/><path d="M2 21h20"/><path d="M2 17c2-1 4-1 6 0 2 1 4 1 6 0 2-1 4-1 6 0"/>`,
  train: `<path d="M8 3.1V7a4 4 0 0 0 8 0V3.1"/><path d="m9 15-1-1"/><path d="m15 15 1-1"/><path d="M9 19c-2.8 0-5-2.2-5-5v-4a8 8 0 0 1 16 0v4c0 2.8-2.2 5-5 5Z"/><path d="m8 19-2 3"/><path d="m16 19 2 3"/>`,
  lake: `<path d="M2 18a6 6 0 0 0 6-6c0-3 2-6 6-6s6 3 6 6c0 3-2 6-6 6-3 0-6 2-6 6"/><circle cx="15" cy="9" r="1"/>`,
  bridge: `<path d="M2 16s2-3 4-3 3 1 6 1 3-1 6-1 4 3 4 3"/><path d="M2 20h20"/><path d="M6 16v4"/><path d="M10 14v6"/><path d="M14 14v6"/><path d="M18 16v4"/>`,
  castle: `<path d="M22 20v-9H2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2Z"/><path d="M18 11V4H6v7"/><path d="M15 22v-4a3 3 0 0 0-3-3v0a3 3 0 0 0-3 3v4"/><path d="M22 11V9"/><path d="M2 11V9"/><path d="M6 4V2"/><path d="M18 4V2"/><path d="M10 4V2"/><path d="M14 4V2"/>`,
  old: `<rect x="3" y="8" width="4" height="14" rx="1"/><rect x="10" y="4" width="4" height="18" rx="1"/><rect x="17" y="10" width="4" height="12" rx="1"/><circle cx="5" cy="5" r="1"/><circle cx="12" cy="2" r="1"/><circle cx="19" cy="7" r="1"/>`,
  food: `<path d="M3 11h18"/><path d="M12 11V3"/><path d="M8 7h.01"/><path d="M8 15c-2 0-5 1-5 4v3h18v-3c0-3-3-4-5-4"/><path d="M12 15v7"/>`,
  shop: `<path d="M3 9h18l-2 11H5Z"/><path d="M8 9V6a4 4 0 0 1 8 0v3"/>`,
  gallery: `<path d="M3 3h18v14H3z"/><path d="M3 21h18"/><circle cx="9" cy="10" r="2"/><path d="m14 14 3-4 4 7"/>`,
  theater: `<circle cx="12" cy="12" r="10"/><path d="M8 10h.01"/><path d="M16 10h.01"/><path d="M8 15s1.5 2 4 2 4-2 4-2"/>`,
  canal: `<path d="M2 10h20"/><path d="M2 14h20"/><path d="M4 10v8"/><path d="M20 10v8"/><path d="M4 4h4l-1 6"/><path d="M20 4h-4l1 6"/>`,
  trek: `<circle cx="13" cy="4" r="2"/><path d="m12 8-3 8 3 2 2-5 3 1-3-4"/><path d="m16 17 3 4"/><path d="m19 12 2-3"/>`,
  mountain: `<path d="m8 3 4 8 5-5 5 15H2L8 3z"/>`,
  plane: `<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>`,
  bus: `<path d="M8 6v6"/><path d="M15 6v6"/><path d="M2 12h19.6"/><path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3"/><circle cx="7" cy="18" r="2"/><path d="M9 18h5"/><circle cx="16" cy="18" r="2"/>`,
  sight: `<path d="m21 8-2 14H5L3 8Z"/><path d="M3 8v-.5a3.5 3.5 0 0 1 7 0V8"/><path d="M14 8v-.5a3.5 3.5 0 0 1 7 0V8"/>`,
  arrive: `<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3" fill="currentColor"/>`
};

function PoiIcon({ kind, color = "#1a1a1a", size = 24, strokeWidth = 2 }) {
  const path = LUCIDE[kind] || LUCIDE.monument;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" 
      fill="none" stroke={color} strokeWidth={strokeWidth}
      strokeLinecap="round" strokeLinejoin="round"
      dangerouslySetInnerHTML={{ __html: path }}/>
  );
}

// Plain HTML string for Leaflet markers
function iconHtml(kind, color = "#1a1a1a", strokeWidth = 2) {
  const path = LUCIDE[kind] || LUCIDE.monument;
  return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`;
}

window.PoiIcon = PoiIcon;
window.LUCIDE_ICONS = LUCIDE;
window.iconHtml = iconHtml;
