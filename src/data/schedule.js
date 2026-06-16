export const scenarios = {
  elevated: '과부하',
  balanced: '균형',
  restored: '회복',
};

export const healthData = {
  elevated: {
    sleepHours: 5.4,
    stressScore: 74,
    steps: 3200,
    energyScore: 44,
    hrv: 38,
    restingHeartRate: 73,
    sleepDebt: 1.6,
  },
};

export const screenTimeData = {
  elevated: {
    totalScreenTime: '6시간 42분',
    lateNightUsage: '48분',
    socialMediaMinutes: 92,
    shortFormMinutes: 64,
    productivityMinutes: 142,
    pickupCount: 86,
    focusBreaks: 18,
    sleepInterferenceRisk: '높음',
  },
};

export const calendarData = {
  elevated: {
    meetingCount: 9,
    continuousMeetingBlocks: 5,
    focusTimeAvailable: '35분',
    breakSlots: ['12:20'],
    lateEvents: 2,
    overloadTimeRange: '15:00~17:00',
    tomorrowRiskEvents: ['오전 리뷰 회의 3개 연속', '18:30 이후 광고 미팅'],
  },
};

export const burnoutPrediction = {
  elevated: {
    currentRiskScore: 72,
    predictedPeakRiskTime: '15:00~17:00',
    predictedPeakRiskScore: 81,
    mainRiskFactors: [
      { title: '수면 부족', detail: '최근 평균 대비 -1.3시간', source: 'health' },
      { title: '야간 스크린 타임 증가', detail: '01:00 이후 사용 48분', source: 'screentime' },
      { title: '오후 회의 과밀', detail: '14:00~17:00 회의 연속', source: 'calendar' },
    ],
    preventionImpactScore: 23,
    riskAfterIntervention: 49,
    confidence: 86,
  },
};

export const dataSourceSummary = {
  elevated: [
    {
      id: 'google-calendar',
      source: 'Google Calendar',
      status: '샘플 데이터 기반',
      syncState: 'sample',
      lastSyncedAt: '오늘 08:42',
      icon: 'calendar',
      note: '회의 밀도와 과밀 시간대를 예측에 반영',
      usedSignals: ['오늘 일정 13개', '연속 회의 블록 5개', '집중 가능 시간 35분'],
      impact: 38,
      impactLabel: '위험도 +38%',
    },
    {
      id: 'samsung-health',
      source: 'Samsung Health',
      status: '샘플 데이터 기반',
      syncState: 'sample',
      lastSyncedAt: '오늘 07:58',
      icon: 'heart-rate-monitor',
      note: '수면, HRV, 회복 신호를 분석',
      usedSignals: ['수면 5.4h', 'HRV 38ms', '스트레스 74점'],
      impact: 34,
      impactLabel: '위험도 +34%',
    },
    {
      id: 'screen-time',
      source: 'Screen Time',
      status: '연동 예정',
      syncState: 'planned',
      lastSyncedAt: '오늘 08:10',
      icon: 'device-mobile',
      note: '야간 사용과 앱 전환 패턴을 반영',
      usedSignals: ['야간 사용 48분', '픽업 86회', '집중 중단 18회'],
      impact: 28,
      impactLabel: '위험도 +28%',
    },
  ],
};

export const aiInterventions = {
  elevated: [
    {
      id: 'a1',
      time: '09:55',
      title: '10분 호흡 리셋',
      type: 'recovery',
      source: 'combined',
      reason: '회복 없이 오전 회의가 이어져 긴장도가 빠르게 올라갈 수 있습니다.',
      evidence: '수면 5.4시간, 스트레스 74점, 09:00 회의 직후',
      consequence: '지금 풀지 않으면 오전 내내 긴장도가 누적되어 오후 회의 전에 이미 지친 상태로 들어갑니다.',
      expectedEffect: '오전 과부하 상승을 완만하게 조정',
      riskReduction: 6,
      status: 'pending',
      alternatives: ['10:10', '12:30', '17:50'],
    },
    {
      id: 'a2',
      time: '12:20',
      title: '30분 Recovery Block',
      type: 'movement',
      source: 'health',
      reason: '점심 직후 회복 블록을 넣으면 15:00 이후 위험도가 72에서 49로 낮아질 가능성이 큽니다.',
      evidence: '3,200보, 에너지 44점, 오후 연속 회의 예정',
      consequence: '회복 블록 없이 오후로 넘어가면 연속 회의 구간에서 에너지가 먼저 바닥나 집중 붕괴로 이어질 수 있습니다.',
      expectedEffect: '오후 에너지 회복과 집중 유지 보조',
      riskReduction: 23,
      status: 'pending',
      alternatives: ['12:45', '13:10', '18:30'],
    },
    {
      id: 'a3',
      time: '15:50',
      title: '집중 알림 줄이기',
      type: 'focus',
      source: 'combined',
      reason: '15:00~17:00 구간은 회의와 앱 전환이 겹쳐 집중 붕괴 가능성이 가장 높습니다.',
      evidence: '회의 3개 연속, 픽업 86회, 집중 중단 18회',
      consequence: '알림을 그대로 두면 회의 사이마다 집중이 끊겨 피크 시간대 위험도가 81점까지 올라갈 수 있습니다.',
      expectedEffect: '피크 시간대 집중 이탈 완화',
      riskReduction: 9,
      status: 'pending',
      alternatives: ['16:05', '16:30', '17:00'],
    },
  ],
};

export const dailyEvents = {
  elevated: [
    { time: '08:30', title: '출근 직후 메일 정리', sub: '30분', type: 'normal' },
    { time: '09:00', title: '팀 스탠드업', sub: '30분 회의', type: 'normal' },
    { time: '09:40', title: '긴급 요청 확인', sub: '20분', type: 'normal' },
    { time: '10:10', title: '마케팅 싱크', sub: '40분 회의', type: 'normal' },
    { time: '11:00', title: '고객 피드백 리뷰', sub: '45분 회의', type: 'normal' },
    { time: '12:00', title: '점심 이동', sub: '30분', type: 'normal' },
    { time: '13:00', title: '보고서 수정', sub: '40분 집중 업무', type: 'normal' },
    { time: '13:45', title: '디자인 검토', sub: '30분 회의', type: 'normal' },
    { time: '14:20', title: '제품 리뷰 회의', sub: '40분', type: 'normal', risk: true },
    { time: '15:00', title: '파트너 미팅', sub: '1시간', type: 'normal', risk: true },
    { time: '16:00', title: '주간 의사결정 회의', sub: '1시간', type: 'normal', risk: true },
    { time: '17:10', title: '후속 액션 정리', sub: '30분', type: 'normal' },
    { time: '18:00', title: '광고 미팅 준비', sub: '45분', type: 'normal', risk: true },
  ],
};

export const burnoutReport = {
  weeklyTrend: [
    { day: '월', score: 58 },
    { day: '화', score: 64 },
    { day: '수', score: 77 },
    { day: '목', score: 74 },
    { day: '금', score: 69 },
    { day: '토', score: 42 },
    { day: '오늘', score: 72 },
  ],
  sourceImpact: [
    { source: 'Calendar', value: 38, detail: '오후 회의 과밀' },
    { source: 'Health', value: 34, detail: '수면 부족과 HRV 저하' },
    { source: 'Screen Time', value: 28, detail: '야간 사용과 잦은 앱 전환' },
  ],
  repeatedPatterns: [
    '수요일과 목요일 오후에 위험도가 반복적으로 상승했습니다.',
    '수면이 6시간 아래로 내려간 다음 날 집중 중단이 증가했습니다.',
    '01:00 이후 영상 사용 다음 날 스트레스 점수가 상승했습니다.',
  ],
  nextWeekPrediction: [
    { day: '월', label: '낮음', score: 39 },
    { day: '화', label: '주의', score: 51 },
    { day: '수', label: '높음', score: 68 },
    { day: '목', label: '높음', score: 71 },
    { day: '금', label: '주의', score: 56 },
  ],
  preventionEffects: [
    { action: '오후 회의 전 15분 휴식', effect: '피크 위험 -9' },
    { action: '야간 앱 제한 30분 앞당김', effect: '수면 방해 위험 -14%' },
    { action: '점심 산책 루틴', effect: '오후 에너지 +11' },
  ],
};

export const personalization = {
  integrations: [
    ['Google Calendar', '샘플 데이터 기반'],
    ['Samsung Health', '샘플 데이터 기반'],
    ['Screen Time', '연동 예정'],
  ],
  preferences: [
    ['선호 회복 루틴', '짧은 산책, 호흡, 스트레칭'],
    ['집중 선호 시간', '09:30~11:30'],
    ['알림 회피 시간', '22:30~07:30'],
    ['야간 스크린 목표', '자정 이후 사용 20분 이하'],
  ],
};
