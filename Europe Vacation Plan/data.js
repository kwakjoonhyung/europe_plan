// 여행 데이터 - 엑셀에서 추출 + 실제 GPS 좌표
window.TRIP_DATA = {
  title: "엄마 아빠의 유럽 여행",
  subtitle: "Paris · Annecy · Chamonix · Milano",
  dateRange: "2026.05.22 — 2026.05.31",

  cities: {
    paris: {
      id: "paris", name: "파리", nameEn: "Paris", country: "France",
      lat: 48.8566, lng: 2.3522, zoom: 12,
      color: "#D94F3A",
      desc: "예술과 낭만의 도시. 센강을 따라 걸으며 도시 전체가 미술관.",
      days: [1, 2, 3, 4, 5]
    },
    annecy: {
      id: "annecy", name: "안시", nameEn: "Annecy", country: "France",
      lat: 45.8992, lng: 6.1294, zoom: 13,
      color: "#2E7D9A",
      desc: "알프스의 베네치아. 에메랄드빛 호수와 중세 골목.",
      days: [5, 6]
    },
    chamonix: {
      id: "chamonix", name: "샤모니", nameEn: "Chamonix", country: "France",
      lat: 45.9237, lng: 6.8694, zoom: 12,
      color: "#4A6B3A",
      desc: "몽블랑 기슭의 알프스 마을. 케이블카·산악열차·온천.",
      days: [6, 7, 8]
    },
    milano: {
      id: "milano", name: "밀라노", nameEn: "Milano", country: "Italy",
      lat: 45.4642, lng: 9.1900, zoom: 13,
      color: "#B8873E",
      desc: "패션·디자인·두오모. 이탈리아 북부 관문.",
      days: [8, 9, 10]
    }
  },

  days: [
    { n: 1, date: "2026-05-22", dateLabel: "5월 22일 (금)", city: "paris",
      title: "인천 → 파리", summary: "출국 · 파리 도착 · 체크인",
      items: [
        { time: "10:00", label: "아시아나 OZ501", type: "flight", note: "인천 출발 → 파리 CDG" },
        { time: "17:20", label: "파리 CDG 공항 도착", type: "arrive" },
        { time: "저녁", label: "호텔 체크인 · 석식", type: "hotel", note: "홀리데이인 파리 오페라 그랑 블루바르" },
    ]},
    { n: 2, date: "2026-05-23", dateLabel: "5월 23일 (토)", city: "paris",
      title: "센강 · 고딕 · 인상주의", summary: "시테섬에서 오르세까지, 파리의 정수",
      items: [
        { time: "오전", label: "시테섬 · 노트르담 대성당", type: "sight", poi: "notredame" },
        { time: "오전", label: "생트 샤펠 · 퐁뇌프 다리", type: "sight", poi: "saintechapelle" },
        { time: "오후", label: "오르세 미술관", type: "sight", poi: "orsay", note: "인상주의 컬렉션" },
        { time: "저녁", label: "튈르리 정원 · 콩코드 광장", type: "sight", poi: "tuileries" },
        { time: "저녁", label: "샹젤리제 · 개선문", type: "sight", poi: "arc" },
    ]},
    { n: 3, date: "2026-05-24", dateLabel: "5월 24일 (일)", city: "paris",
      title: "몽마르트 · 마레", summary: "언덕 위 보헤미안, 마레 지구 산책",
      items: [
        { time: "오전", label: "몽마르트 언덕 · 사크레쾨르", type: "sight", poi: "montmartre" },
        { time: "오후", label: "보주 광장 · 피카소 미술관", type: "sight", poi: "picasso" },
        { time: "저녁", label: "마레 지구 디저트 맛집", type: "food", poi: "marais" },
    ]},
    { n: 4, date: "2026-05-25", dateLabel: "5월 25일 (월)", city: "paris",
      title: "베르사유 · 몽파르나스", summary: "당일치기 근교 · 밤의 파리",
      items: [
        { time: "오전", label: "베르사유 궁전 (당일치기)", type: "sight", poi: "versailles", note: "RER C · 약 35분" },
        { time: "오후", label: "몽파르나스 타워 전망대", type: "sight", poi: "montparnasse" },
        { time: "저녁", label: "센강 산책 · 에펠탑 야경", type: "sight", poi: "eiffel" },
    ]},
    { n: 5, date: "2026-05-26", dateLabel: "5월 26일 (화)", city: "paris", toCity: "annecy",
      title: "파리 → 안시 (TGV)", summary: "아울렛 → 리옹역에서 출발",
      items: [
        { time: "오전", label: "파리 근교 아울렛 쇼핑", type: "shop", note: "라 발레 빌리지 추천" },
        { time: "18:46", label: "파리 리옹역 출발 (TGV)", type: "train" },
        { time: "22:33", label: "안시 도착 · 체크인", type: "arrive", note: "아파트호텔 아다지오 안시센터" },
    ]},
    { n: 6, date: "2026-05-27", dateLabel: "5월 27일 (수)", city: "annecy", toCity: "chamonix",
      title: "안시 호수 · 샤모니 이동", summary: "알프스의 베네치아 → 몽블랑 마을",
      items: [
        { time: "오전", label: "안시 구시가 · 운하 산책", type: "sight", poi: "annecy_old" },
        { time: "오후", label: "안시 호수 · 섬 궁전", type: "sight", poi: "annecy_lake" },
        { time: "17:35", label: "블라블라카 버스 탑승", type: "bus" },
        { time: "19:00", label: "샤모니 도착 · 체크인", type: "arrive", note: "샬레호텔 르 프리와르" },
    ]},
    { n: 7, date: "2026-05-28", dateLabel: "5월 28일 (목)", city: "chamonix",
      title: "에귀 뒤 미디 · 온천", summary: "케이블카로 몽블랑 전망 · 트래킹",
      items: [
        { time: "오전", label: "에귀 뒤 미디 전망대", type: "sight", poi: "aiguille", note: "케이블카 · 해발 3,842m" },
        { time: "오후", label: "샤모니 트래킹", type: "sight", poi: "trekking" },
        { time: "저녁", label: "온천 (TERME)", type: "spa", poi: "therme" },
    ]},
    { n: 8, date: "2026-05-29", dateLabel: "5월 29일 (금)", city: "chamonix", toCity: "milano",
      title: "몽탕베르 · 밀라노 이동", summary: "빙하동굴 → 버스로 국경을 넘다",
      items: [
        { time: "오전", label: "몽탕베르 산악열차", type: "sight", poi: "montenvers", note: "빙하동굴 탐방 (Mer de Glace)" },
        { time: "15:25", label: "샤모니 → 밀라노 버스", type: "bus", note: "소요 약 4시간" },
        { time: "저녁", label: "밀라노 도착 · 체크인", type: "arrive", note: "베스트웨스턴 호텔 메디슨" },
    ]},
    { n: 9, date: "2026-05-30", dateLabel: "5월 30일 (토)", city: "milano",
      title: "밀라노 시내", summary: "두오모 · 갈레리아 · 나빌리오",
      items: [
        { time: "오전", label: "두오모 성당 · 옥상 테라스", type: "sight", poi: "duomo" },
        { time: "오전", label: "비토리오 에마누엘레 2세 갈레리아", type: "sight", poi: "galleria" },
        { time: "오후", label: "스포르체스코 성 · 스칼라 극장", type: "sight", poi: "sforza" },
        { time: "저녁", label: "나빌리오 운하 산책 · 아페리티보", type: "food", poi: "navigli" },
    ]},
    { n: 10, date: "2026-05-31", dateLabel: "5월 31일 (일)", city: "milano",
      title: "밀라노 → 인천", summary: "마지막 시내 관광 · 귀국",
      items: [
        { time: "오전", label: "밀라노 마지막 관광", type: "sight", note: "브레라 지구 추천" },
        { time: "19:00", label: "중앙역 옆 공항버스 탑승", type: "bus", note: "공항까지 약 1시간" },
        { time: "22:00", label: "말펜사 공항 출발", type: "flight" },
        { time: "+1일 16:45", label: "인천 도착", type: "arrive", note: "5월 31일 → 6월 1일" },
    ]}
  ],

  hotels: [
    { city: "paris", nights: "5/22 – 5/26 (4박)", name: "홀리데이 인 파리 오페라 그랑 블루바르", nameEn: "Holiday Inn Paris Opera Grands Boulevards", district: "9구", type: "호텔", status: "확정", lat: 48.8724, lng: 2.3456 },
    { city: "annecy", nights: "5/26 – 5/27 (1박)", name: "아파트호텔 아다지오 안시센터", nameEn: "Aparthotel Adagio Annecy Centre", district: "시내", type: "레지던스", status: "확정", lat: 45.9022, lng: 6.1236 },
    { city: "chamonix", nights: "5/27 – 5/29 (2박)", name: "샬레 호텔 르 프리와르", nameEn: "Chalet Hotel Le Prieuré", district: "샤모니 중심", type: "호텔", status: "확정", lat: 45.9237, lng: 6.8694 },
    { city: "milano", nights: "5/29 – 5/31 (2박)", name: "베스트웨스턴 호텔 메디슨", nameEn: "Best Western Hotel Madison", district: "중앙역 인근", type: "호텔", status: "확정", lat: 45.4851, lng: 9.1989 },
  ],

  parisCandidates: [
    { name: "Charming Studio 2P - Place de la République", district: "11구", price: 228500, type: "주방 스튜디오", note: "파르망티에역 200m" },
    { name: "Penbed - Montparnasse 2 - Studio", district: "6구", price: 275000, type: "주방 스튜디오", note: "페르네티역 170m" },
    { name: "Quiet studio - 2P - Sentier", district: "2구", price: 245907, type: "주방 스튜디오", note: "본누벨역 260m" },
    { name: "Residence centre de Paris by Studio prestige", district: "2구", price: 317943, type: "레지던스 3.5성급", note: "세바스토폴역 210m" },
    { name: "레 파티오 뒤 마라", district: "마레", price: 326000, type: "호텔", note: "—" },
    { name: "레지던스 파리 그라빌리에", district: "3구", price: 258688, type: "주방 레지던스", note: "—" },
    { name: "호텔 바캉스 블루 프로방스 오페라", district: "오페라", price: 282087, type: "호텔", note: "—" },
    { name: "Cosy studio - 2P - Bastille", district: "11구", price: 244937, type: "주방 스튜디오", note: "바스티유" },
  ],

  // POI — 실제 GPS 좌표
  pois: {
    paris: [
      { id: "hotel", name: "홀리데이인 오페라 (숙소)", lat: 48.8724, lng: 2.3456, kind: "hotel", day: "숙소" },
      { id: "eiffel", name: "에펠탑", lat: 48.8584, lng: 2.2945, kind: "tower", day: "Day 4" },
      { id: "arc", name: "개선문", lat: 48.8738, lng: 2.2950, kind: "monument", day: "Day 2" },
      { id: "tuileries", name: "튈르리 정원 · 콩코드", lat: 48.8634, lng: 2.3275, kind: "garden", day: "Day 2" },
      { id: "orsay", name: "오르세 미술관", lat: 48.8600, lng: 2.3266, kind: "museum", day: "Day 2" },
      { id: "notredame", name: "노트르담 · 시테섬", lat: 48.8530, lng: 2.3499, kind: "cathedral", day: "Day 2" },
      { id: "saintechapelle", name: "생트 샤펠 · 퐁뇌프", lat: 48.8554, lng: 2.3450, kind: "cathedral", day: "Day 2" },
      { id: "montmartre", name: "몽마르트 · 사크레쾨르", lat: 48.8867, lng: 2.3431, kind: "hill", day: "Day 3" },
      { id: "picasso", name: "보주 광장 · 피카소 미술관", lat: 48.8598, lng: 2.3623, kind: "museum", day: "Day 3" },
      { id: "marais", name: "마레 지구 디저트", lat: 48.8570, lng: 2.3600, kind: "food", day: "Day 3" },
      { id: "montparnasse", name: "몽파르나스 타워", lat: 48.8421, lng: 2.3220, kind: "tower", day: "Day 4" },
      { id: "versailles", name: "베르사유 궁전", lat: 48.8049, lng: 2.1204, kind: "palace", day: "Day 4", outskirts: true },
      { id: "giverny", name: "모네의 정원 (지베르니)", lat: 49.0758, lng: 1.5336, kind: "garden", day: "선택", outskirts: true },
      { id: "fontainebleau", name: "퐁텐블로 성", lat: 48.4022, lng: 2.7000, kind: "palace", day: "선택", outskirts: true },
      { id: "outlet", name: "라 발레 빌리지 아울렛", lat: 48.8479, lng: 2.7842, kind: "shop", day: "Day 5", outskirts: true },
      { id: "gare_lyon", name: "파리 리옹역 (TGV)", lat: 48.8443, lng: 2.3737, kind: "train", day: "Day 5" },
      { id: "cdg", name: "파리 CDG 공항", lat: 49.0097, lng: 2.5479, kind: "plane", day: "Day 1", outskirts: true },
    ],
    annecy: [
      { id: "hotel", name: "아다지오 안시센터 (숙소)", lat: 45.9022, lng: 6.1236, kind: "hotel", day: "숙소" },
      { id: "annecy_old", name: "안시 구시가 · 팔레 드릴", lat: 45.8990, lng: 6.1279, kind: "old", day: "Day 6" },
      { id: "pont", name: "사랑의 다리 (Pont des Amours)", lat: 45.9015, lng: 6.1342, kind: "bridge", day: "Day 6" },
      { id: "annecy_lake", name: "안시 호수", lat: 45.8547, lng: 6.1719, kind: "lake", day: "Day 6" },
      { id: "chateau", name: "안시 성", lat: 45.8971, lng: 6.1263, kind: "castle", day: "Day 6" },
      { id: "station", name: "안시역 (SNCF)", lat: 45.9021, lng: 6.1206, kind: "train", day: "도착" },
      { id: "semnoz", name: "스농 산 전망대", lat: 45.8108, lng: 6.1092, kind: "mountain", day: "선택" },
    ],
    chamonix: [
      { id: "hotel", name: "샬레 르 프리외르 (숙소)", lat: 45.9237, lng: 6.8694, kind: "hotel", day: "숙소" },
      { id: "aiguille", name: "에귀 뒤 미디 전망대", lat: 45.8786, lng: 6.8878, kind: "summit", day: "Day 7" },
      { id: "montenvers", name: "몽탕베르 · 빙하동굴", lat: 45.9312, lng: 6.9081, kind: "glacier", day: "Day 8" },
      { id: "trekking", name: "샤모니 트래킹 (플레제르)", lat: 45.9481, lng: 6.8211, kind: "trek", day: "Day 7" },
      { id: "therme", name: "QC Terme 프레 생 디디에 온천", lat: 45.7614, lng: 6.9881, kind: "spa", day: "Day 7" },
      { id: "station", name: "샤모니 몽블랑역", lat: 45.9237, lng: 6.8700, kind: "train", day: "이동" },
      { id: "brevent", name: "르 브레방 (맞은편 전망)", lat: 45.9333, lng: 6.8456, kind: "summit", day: "선택" },
    ],
    milano: [
      { id: "hotel", name: "베스트웨스턴 메디슨 (숙소)", lat: 45.4851, lng: 9.1989, kind: "hotel", day: "숙소" },
      { id: "duomo", name: "두오모 성당", lat: 45.4642, lng: 9.1918, kind: "cathedral", day: "Day 9" },
      { id: "galleria", name: "갈레리아 비토리오 에마누엘레", lat: 45.4659, lng: 9.1899, kind: "gallery", day: "Day 9" },
      { id: "scala", name: "스칼라 극장", lat: 45.4675, lng: 9.1895, kind: "theater", day: "Day 9" },
      { id: "sforza", name: "스포르체스코 성", lat: 45.4705, lng: 9.1794, kind: "castle", day: "Day 9" },
      { id: "navigli", name: "나빌리오 운하", lat: 45.4509, lng: 9.1745, kind: "canal", day: "Day 9" },
      { id: "brera", name: "브레라 지구", lat: 45.4720, lng: 9.1880, kind: "old", day: "Day 10" },
      { id: "centrale", name: "밀라노 중앙역 (공항버스)", lat: 45.4864, lng: 9.2045, kind: "train", day: "Day 10" },
      { id: "last_supper", name: "최후의 만찬 (산타 마리아)", lat: 45.4659, lng: 9.1706, kind: "museum", day: "선택", note: "예약 필수" },
      { id: "malpensa", name: "말펜사 공항", lat: 45.6306, lng: 8.7281, kind: "plane", day: "Day 10", outskirts: true },
    ]
  },

  outskirts: [
    { id: "versailles", name: "베르사유 궁전", nameEn: "Château de Versailles", distance: "파리 서쪽 20km", transport: "RER C (약 35분) · 파리 몽파르나스 → 베르사유 샹티에", duration: "반나절 ~ 하루", highlight: "거울의 방 · 정원 · 마리 앙투아네트 영지", tip: "월요일 휴관. 오전 일찍 가서 줄을 피하세요.", season: "5월은 정원 장미가 막 피기 시작", day: 4, confirmed: true },
    { id: "giverny", name: "모네의 정원 (지베르니)", nameEn: "Fondation Monet, Giverny", distance: "파리 북서쪽 80km", transport: "생라자르역 → 베르농 (45분) → 셔틀버스 15분", duration: "하루 (왕복 포함 8시간)", highlight: "수련 연못 · 일본식 다리 · 모네의 집", tip: "4월~11월만 개방. 5월은 꽃이 만개하는 베스트 시즌.", season: "★ 5월 추천", day: null, confirmed: false },
    { id: "fontainebleau", name: "퐁텐블로 성 · 숲", nameEn: "Château de Fontainebleau", distance: "파리 남동쪽 60km", transport: "리옹역 → 퐁텐블로-아봉 (40분) → 버스 15분", duration: "반나절 ~ 하루", highlight: "나폴레옹이 사랑한 성 · 울창한 숲", tip: "베르사유보다 한적. 숲 산책을 좋아한다면 추천.", season: "신록의 계절", day: null, confirmed: false },
    { id: "mont_saint_michel", name: "몽생미셸", nameEn: "Mont-Saint-Michel", distance: "파리 서쪽 360km", transport: "TGV + 버스 · 최소 왕복 8시간", duration: "1박 2일 권장", highlight: "바다 위 수도원 · 조수간만의 차", tip: "당일치기는 빠듯.", season: "—", day: null, confirmed: false },
    { id: "chartres", name: "샤르트르 대성당", nameEn: "Cathédrale de Chartres", distance: "파리 남서쪽 90km", transport: "몽파르나스역 → 샤르트르 (1시간)", duration: "반나절", highlight: "유네스코 · 스테인드글라스의 성당", tip: "노트르담과 비교해보기 좋음.", season: "—", day: null, confirmed: false }
  ],

  checklist: {
    "출국 전 준비": [
      { t: "여권 유효기간 6개월 이상 확인", done: false },
      { t: "유럽 e심/로밍 신청", done: false },
      { t: "Navigo Easy (파리 교통카드) 계획", done: false },
      { t: "유로화 환전 + 해외결제 카드 2장", done: false },
      { t: "여행자 보험 가입", done: false },
      { t: "복용약 · 처방전 영문 사본", done: false },
      { t: "220V C타입 멀티 어댑터", done: false },
      { t: "Paris Museum Pass 구매 검토 (4일권)", done: false },
    ],
    "예약 필요": [
      { t: "에펠탑 전망대 온라인 예약", done: false },
      { t: "베르사유 궁전 시간대 지정 티켓", done: false },
      { t: "에귀 뒤 미디 케이블카 예약", done: false },
      { t: "몽탕베르 산악열차 예약", done: false },
      { t: "오르세 미술관 티켓", done: false },
      { t: "TGV 파리→안시 좌석 지정", done: false },
      { t: "블라블라카 버스 안시→샤모니", done: false },
      { t: "샤모니→밀라노 버스 (Flixbus/SAT)", done: false },
    ],
    "현지에서 챙길 것": [
      { t: "스리 조심 (파리 지하철·몽마르트)", done: false },
      { t: "저녁 8시 이후 식당 문 닫는 곳 많음", done: false },
      { t: "일요일 상점 휴무 (파리)", done: false },
      { t: "알프스 기온 낮음 — 경량 패딩", done: false },
      { t: "선크림 · 선글라스 (고산 자외선)", done: false },
      { t: "편한 운동화 필수", done: false },
    ]
  },

  phrases: [
    { ko: "안녕하세요", fr: "Bonjour (봉쥬르)", it: "Buongiorno (부온조르노)" },
    { ko: "감사합니다", fr: "Merci (메르시)", it: "Grazie (그라치에)" },
    { ko: "죄송합니다 / 실례합니다", fr: "Pardon (파르동)", it: "Scusi (스쿠지)" },
    { ko: "얼마예요?", fr: "C'est combien? (세 콩비앙)", it: "Quanto costa? (콴토 코스타)" },
    { ko: "물 한 잔 주세요", fr: "Une carafe d'eau, s'il vous plaît", it: "Un bicchiere d'acqua, per favore" },
    { ko: "계산서 주세요", fr: "L'addition, s'il vous plaît", it: "Il conto, per favore" },
    { ko: "화장실 어디에요?", fr: "Où sont les toilettes?", it: "Dov'è il bagno?" },
    { ko: "도와주세요", fr: "Aidez-moi, s'il vous plaît", it: "Aiuto, per favore" },
    { ko: "경찰 불러주세요", fr: "Appelez la police!", it: "Chiami la polizia!" },
    { ko: "영어 하세요?", fr: "Parlez-vous anglais?", it: "Parla inglese?" },
  ]
};
