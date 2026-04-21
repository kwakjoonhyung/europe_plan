# 엄마 아빠의 30년 만의 유럽 여행 🇫🇷🇮🇹

파리 · 안시 · 샤모니 · 밀라노 10일 여행 플래너 (2026.05.22 — 05.31)

## 주요 기능
- 🗺️ 실제 지도 기반 유럽 전체뷰 + 도시별 확대 (Leaflet + CartoDB)
- 📅 Day별 일정 하이라이트 + 교통 경로 시각화 (TGV, 버스, 비행기)
- 🏨 확정 숙소 4곳 + 파리 숙소 후보 비교표
- 🌸 파리 근교 정보 (베르사유 · 모네의 정원 · 퐁텐블로 등)
- ✅ 출국 준비 / 예약 / 현지 주의사항 체크리스트 (localStorage 자동저장)
- 💬 프랑스어 · 이탈리아어 핵심 회화

## 로컬에서 실행
정적 파일이므로 아무 웹서버나 사용 가능:

```bash
# Python이 있다면
python3 -m http.server 8000

# 또는 Node의 serve
npx serve .
```

브라우저에서 `http://localhost:8000` 접속.

## Vercel 배포 방법

### 방법 1: GitHub 연결 (추천)
1. 이 프로젝트를 GitHub 레포지토리에 푸시
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<YOUR_USERNAME>/europe-trip-planner.git
   git push -u origin main
   ```
2. [vercel.com](https://vercel.com) 로그인 → **Add New Project** → GitHub 레포 선택
3. Framework Preset을 **Other**로 두고 **Deploy** 클릭
4. 배포 완료! `.vercel.app` 도메인으로 접속 가능

### 방법 2: Vercel CLI (더 빠름)
```bash
npm i -g vercel
vercel
# 질문에 따라 로그인 → 프로젝트명 입력 → 배포
```

### 방법 3: 드래그&드롭
Vercel 대시보드에서 프로젝트 폴더를 통째로 드래그해도 배포됩니다.

## 기술
- React 18 (UMD) + Babel Standalone — 빌드 단계 없음
- Leaflet 1.9.4 — 지도
- CartoDB Voyager / Positron 타일 — 무료, 무인증
- Pretendard + Instrument Serif — 한글/영문 타이포

## 파일 구조
```
index.html       # 엔트리
data.js          # 여행 일정 · POI · 호텔 데이터
europe-map.jsx   # 유럽 전체 지도
city-map.jsx     # 도시별 지도 + Day 하이라이트
day-view.jsx     # 일별 상세 일정 뷰
panels.jsx       # 일정표 · 숙소 · 체크리스트 · 회화 · 근교
icons.jsx        # Lucide SVG 아이콘
styles.css       # 전체 스타일
```
