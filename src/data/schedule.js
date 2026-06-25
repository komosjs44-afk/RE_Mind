// ─── 시나리오 ───────────────────────────────────────────────────────────────
export const scenarios = {
  elevated: '일정 과부하',
  balanced: '균형',
  restored: '회복',
};

// ─── 건강 요약 (Apple Health / 수동 입력) ─────────────────────────────────
export const healthSummary = {
  elevated: {
    date: '2026-06-25',
    sleepHours: 4.5,
    steps: 6200,
    fatigueLevel: 4,   // 1~5
    source: 'manual',  // 'healthkit' | 'manual'
  },
};

// ─── 학사 일정 ───────────────────────────────────────────────────────────────
export const academicTasks = [
  {
    id: 'task_1',
    title: '데이터사이언스 과제',
    type: 'assignment',
    dueDate: '2026-06-27',
    estimatedMinutes: 120,
    priority: 'high',
    daysLeft: 2,
  },
  {
    id: 'exam_1',
    title: '운영체제 시험',
    type: 'exam',
    dueDate: '2026-06-28',
    estimatedMinutes: 180,
    priority: 'high',
    daysLeft: 3,
  },
  {
    id: 'task_2',
    title: '알고리즘 과제',
    type: 'assignment',
    dueDate: '2026-06-30',
    estimatedMinutes: 90,
    priority: 'medium',
    daysLeft: 5,
  },
  {
    id: 'pres_1',
    title: '팀프로젝트 발표',
    type: 'presentation',
    dueDate: '2026-07-02',
    estimatedMinutes: 60,
    priority: 'medium',
    daysLeft: 7,
  },
];

// ─── 일간 캘린더 이벤트 배열 ─────────────────────────────────────────────────
export const calendarEvents = {
  elevated: [
    { time: '09:00', title: '아침 식사', type: 'personal' },
    { time: '10:00', endTime: '11:30', title: '알고리즘 강의', type: 'class', source: 'google_calendar' },
    { time: '12:00', title: '점심', type: 'personal' },
    { time: '13:00', endTime: '14:30', title: '팀플 미팅', type: 'meeting', source: 'google_calendar' },
    { time: '15:00', title: '자유 시간', type: 'free' },
    { time: '18:00', endTime: '23:00', title: '알바', type: 'work', source: 'google_calendar', risk: true },
  ],
};

// ─── 캘린더 요약 (집계) ─────────────────────────────────────────────────────
export const calendarSummary = {
  elevated: {
    totalCount: 6,
    workHours: 5,
    classHours: 1.5,
    meetingCount: 1,
    freeSlots: ['11:30~12:00', '14:30~15:00', '15:00~18:00'],
    overloadTimeRange: '18:00~23:00',
    tomorrowRiskEvents: ['운영체제 시험 D-2', '알바 연속 예정'],
  },
};

// ─── 일정 과부하 분석 (burnoutPrediction 대체) ───────────────────────────────
export const overloadAnalysis = {
  elevated: {
    currentRiskScore: 75,
    predictedPeakRiskTime: '18:00~23:00',
    predictedPeakRiskScore: 85,
    mainRiskFactors: [
      { title: '수면 부족', detail: '4.5h (권장 7h 대비 -2.5h)', source: 'health' },
      { title: '시험 D-3 + 알바 충돌', detail: '오늘 알바 5시간, 시험 준비 불가', source: 'academic' },
      { title: '과제 마감 D-2', detail: '데이터사이언스 과제 120분 필요', source: 'calendar' },
    ],
    preventionImpactScore: 20,
    riskAfterIntervention: 55,
    confidence: 82,
  },
};

// ─── AI 일정 재설계 추천 ──────────────────────────────────────────────────────
export const aiPlanRecommendations = {
  elevated: [
    {
      id: 'r1',
      time: '15:30',
      endTime: '17:30',
      title: '알바 전 2시간 시험 복습 블록',
      type: 'study',
      source: 'combined',
      reason: '오늘 알바가 18시부터라 복습할 수 있는 마지막 시간대는 15:30~17:30입니다. 지금 배치하지 않으면 시험 전날 밤 벼락치기가 불가피합니다.',
      evidence: '수면 4.5h, 시험 D-3, 알바 18:00~23:00',
      consequence: '복습 블록 없이 알바로 넘어가면 시험 전날 컨디션이 더 낮은 상태에서 벼락치기를 해야 합니다.',
      expectedEffect: '시험 준비 분산 · 실행 가능성 증가',
      riskReduction: 15,
      status: 'active',
      actionType: 'schedule_add',
      alternatives: ['14:00', '16:00', '17:00'],
    },
    {
      id: 'r2',
      time: '11:30',
      endTime: '12:00',
      title: '수업 후 30분 과제 시작',
      type: 'task',
      source: 'academic',
      reason: '알고리즘 수업 직후 11:30에 데이터사이언스 과제를 30분만 시작하면 마감 전날 몰아치기를 피할 수 있습니다.',
      evidence: '데이터사이언스 과제 D-2, 오전 수업 11:30 종료',
      consequence: '오늘 시작하지 않으면 D-1에 과제 + 시험 준비가 동시에 겹칩니다.',
      expectedEffect: '과제 마감 리스크 완화',
      riskReduction: 12,
      status: 'active',
      actionType: 'schedule_add',
      alternatives: ['13:00', '14:30'],
    },
    {
      id: 'r3',
      time: '23:30',
      endTime: '00:00',
      title: '알바 귀가 후 수면 우선 루틴',
      type: 'recovery',
      source: 'health',
      reason: '어제도 알바 후 01:30 취침 패턴이었습니다. 오늘은 귀가 즉시 수면 준비를 시작해야 합니다.',
      evidence: '수면 4.5h 연속, 시험 D-3',
      consequence: '오늘도 늦게 자면 시험 전날 컨디션이 더 낮아집니다.',
      expectedEffect: '수면 개선 · 시험 전날 컨디션 회복',
      riskReduction: 10,
      status: 'active',
      actionType: 'habit',
      alternatives: [],
    },
  ],
};

// ─── 오늘 일정 (calendarEvents + 기타 통합 뷰용) ─────────────────────────────
export const dailyPlan = {
  elevated: [
    { time: '09:00', title: '아침 식사', type: 'personal' },
    { time: '10:00', title: '알고리즘 강의', sub: '1시간 30분 수업', type: 'class' },
    { time: '12:00', title: '점심', sub: '30분', type: 'personal' },
    { time: '13:00', title: '팀플 미팅', sub: '1시간 30분', type: 'meeting' },
    { time: '18:00', title: '알바', sub: '5시간', type: 'work', risk: true },
  ],
};

// ─── 데이터 소스 요약 (연동 센터) ──────────────────────────────────────────
export const dataSourceSummary = {
  elevated: [
    {
      id: 'apple-health',
      source: 'Apple Health',
      status: '샘플 데이터 기반',
      syncState: 'sample',
      lastSyncedAt: '오늘 07:30',
      icon: 'heart',
      note: '수면과 걸음 수를 일정 과부하 판단에 반영',
      usedSignals: ['수면 4.5h', '걸음수 6,200보', '피로도 4/5'],
      impact: 35,
      impactLabel: '과부하 +35%',
    },
    {
      id: 'google-calendar',
      source: 'Google Calendar',
      status: '샘플 데이터 기반',
      syncState: 'sample',
      lastSyncedAt: '오늘 08:00',
      icon: 'calendar',
      note: '수업, 알바, 팀플 일정을 AI 재설계에 반영',
      usedSignals: ['알바 5시간', '강의 1.5시간', '팀플 1.5시간'],
      impact: 40,
      impactLabel: '과부하 +40%',
    },
    {
      id: 'academic-tasks',
      source: '학사 일정',
      status: '수동 입력',
      syncState: 'manual',
      lastSyncedAt: '어제 23:00',
      icon: 'school',
      note: '과제와 시험 마감일을 일정 우선순위에 반영',
      usedSignals: ['운영체제 시험 D-3', '데이터사이언스 과제 D-2', '알고리즘 과제 D-5'],
      impact: 25,
      impactLabel: '과부하 +25%',
    },
  ],
};

// ─── 주간 컨디션 리포트 (burnoutReport 대체) ─────────────────────────────────
export const conditionReport = {
  weeklyTrend: [
    { day: '월', score: 45 },
    { day: '화', score: 58 },
    { day: '수', score: 67 },
    { day: '목', score: 72 },
    { day: '금', score: 61 },
    { day: '토', score: 38 },
    { day: '오늘', score: 75 },
  ],
  sourceImpact: [
    { source: 'Google Calendar', value: 40, detail: '알바 5h + 수업 겹침' },
    { source: 'Apple Health', value: 35, detail: '수면 4.5h, 회복 여력 낮음' },
    { source: '학사 일정', value: 25, detail: '시험 D-3, 과제 마감 D-2' },
  ],
  repeatedPatterns: [
    '알바 다음 날 수면이 짧아지는 패턴이 반복됩니다.',
    '시험 전주에 일정 밀도가 급격히 증가했습니다.',
    '수업 연속 구간 이후 과제 시작이 늦어지는 경향이 있습니다.',
  ],
  nextWeekPrediction: [
    { day: '월', label: '주의', score: 52 },
    { day: '화', label: '높음', score: 68 },
    { day: '수', label: '높음', score: 73 },
    { day: '목', label: '매우 높음', score: 82 },
    { day: '금', label: '주의', score: 55 },
  ],
  preventionEffects: [
    { action: '알바 전 복습 블록 2시간', effect: '시험 과부하 -15' },
    { action: '수업 후 과제 30분 시작', effect: '마감 리스크 완화' },
    { action: '귀가 후 수면 우선 루틴', effect: '수면 개선 +1h' },
  ],
};
