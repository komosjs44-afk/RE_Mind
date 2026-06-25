# RE:Mind

번아웃 위험 예측 및 AI 개입 제안 앱 (React + Vite)

배포 URL: https://re-mind-git-main-komosjs44-afks-projects.vercel.app/

## 시스템 흐름도

```mermaid
flowchart TD
  main[src/main.jsx] --> App[src/App.jsx]

  App --> scenario{시나리오 선택\nnormal / elevated}
  scenario --> DataLayer[정적 목 데이터\ndata/schedule.js]

  DataLayer --> aiInterventions[AI 개입 목록\naiInterventions]
  DataLayer --> burnoutPrediction[번아웃 예측 데이터\nburnoutPrediction]
  DataLayer --> calendarData[캘린더 데이터\ncalendarData]
  DataLayer --> dailyEvents[일간 일정\ndailyEvents]
  DataLayer --> healthData[건강 · 화면 데이터\nhealthData · screenTimeData]

  App --> RiskUtils[위험 분석 유틸\nriskAnalysis.js · riskTier.js\nscheduleRiskAnalysis.js]
  RiskUtils --> RiskLevel[위험 등급 판정\nrecovery · warning · risk]
  RiskUtils --> RiskReasons[위험 근거 생성\nbuildRiskReasons]

  aiInterventions --> Hook[useInterventionState]
  Hook <--> Storage[localStorage\n날짜별 개입 상태 저장\nremind_intervention_state_YYYY-MM-DD]

  Hook --> allInterventions[전체 개입 목록\n상태 계산 + 정렬]
  allInterventions --> Primary[primaryIntervention\n최고 riskReduction 항목]
  allInterventions --> Secondary[secondaryInterventions\n나머지 항목]
  allInterventions --> Notifications[buildNotifications\n알림 항목 생성]

  dailyEvents --> Timeline[타임라인 병합\ndailyEvents + interventions 정렬]

  App --> Start[온보딩 StartScreen]
  Start -->|hasStarted| Shell[앱 Shell]

  Shell --> Header[Header\n타이틀 + 알림 아이콘]
  Shell --> BottomNav[BottomNav]
  Notifications --> Header

  BottomNav --> Home[Home 탭]
  BottomNav --> Calendar[Calendar 탭]
  BottomNav --> Analysis[Analysis 탭]
  BottomNav --> User[UserInfo 탭]

  Primary --> Home
  Secondary --> Home
  Timeline --> Home
  Timeline --> Calendar
  Primary --> Calendar
  allInterventions --> Analysis

  Home --> Actions[개입 액션]
  Calendar --> Actions
  Analysis --> GoHome[추천 행동 CTA\nonGoHome → Home]

  Actions --> Accept[수락\nacceptIntervention → ACCEPTED]
  Actions --> Move[시간 변경\nmoveIntervention → 시간 재지정]
  Actions --> Delay[15분 미루기\ndelayIntervention → SNOOZED]
  Actions --> Dismiss[제외\ndismissIntervention → DISMISSED]

  Accept --> Hook
  Move --> Hook
  Delay --> Hook
  Dismiss --> Hook

  Hook --> Toast[Toast 알림\n되돌리기 액션 포함 5.2초]
```

## 기술 스택

- React 19 + Vite 8
- Tailwind CSS v4
- localStorage 기반 상태 영속성

## 개발 실행

```bash
npm install
npm run dev
```

## 빌드

```bash
npm run build
```
