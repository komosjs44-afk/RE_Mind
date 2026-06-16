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
  balanced: {
    sleepHours: 6.7,
    stressScore: 52,
    steps: 5600,
    energyScore: 63,
    hrv: 47,
    restingHeartRate: 68,
    sleepDebt: 0.5,
  },
  restored: {
    sleepHours: 7.8,
    stressScore: 32,
    steps: 8100,
    energyScore: 82,
    hrv: 58,
    restingHeartRate: 62,
    sleepDebt: 0,
  },
};

export const screenTimeData = {
  elevated: {
    totalScreenTime: '6h 42m',
    lateNightUsage: '48m',
    socialMediaMinutes: 92,
    shortFormMinutes: 64,
    productivityMinutes: 142,
    pickupCount: 86,
    focusBreaks: 18,
    sleepInterferenceRisk: '높음',
  },
  balanced: {
    totalScreenTime: '4h 18m',
    lateNightUsage: '22m',
    socialMediaMinutes: 54,
    shortFormMinutes: 28,
    productivityMinutes: 168,
    pickupCount: 52,
    focusBreaks: 9,
    sleepInterferenceRisk: '보통',
  },
  restored: {
    totalScreenTime: '3h 12m',
    lateNightUsage: '8m',
    socialMediaMinutes: 31,
    shortFormMinutes: 12,
    productivityMinutes: 156,
    pickupCount: 34,
    focusBreaks: 4,
    sleepInterferenceRisk: '낮음',
  },
};

export const calendarData = {
  elevated: {
    meetingCount: 7,
    continuousMeetingBlocks: 3,
    focusTimeAvailable: '1h 10m',
    breakSlots: ['09:55', '12:20', '15:50'],
    lateEvents: 1,
    overloadTimeRange: '15:00~17:00',
    tomorrowRiskEvents: ['오전 리뷰 회의 3개 연속', '18:30 이후 광고 미팅'],
  },
  balanced: {
    meetingCount: 4,
    continuousMeetingBlocks: 1,
    focusTimeAvailable: '2h 40m',
    breakSlots: ['11:10', '15:20', '18:00'],
    lateEvents: 0,
    overloadTimeRange: '14:00~15:30',
    tomorrowRiskEvents: ['오후 회의 사이 휴식 부족'],
  },
  restored: {
    meetingCount: 3,
    continuousMeetingBlocks: 0,
    focusTimeAvailable: '4h 10m',
    breakSlots: ['10:30', '13:30', '17:40'],
    lateEvents: 0,
    overloadTimeRange: '없음',
    tomorrowRiskEvents: ['큰 위험 이벤트 없음'],
  },
};

export const burnoutPrediction = {
  elevated: {
    currentRiskScore: 72,
    predictedPeakRiskTime: '15:00~17:00',
    predictedPeakRiskScore: 81,
    mainRiskFactors: [
      { title: '수면 부족', detail: '최근 평균 대비 -1.3h', source: 'health' },
      { title: '야간 스크린타임', detail: '01:00 이후 사용 48분', source: 'screentime' },
      { title: '일정 과밀', detail: '14:00~17:00 회의 연속', source: 'calendar' },
    ],
    preventionImpactScore: 23,
    riskAfterIntervention: 49,
    confidence: 86,
  },
  balanced: {
    currentRiskScore: 54,
    predictedPeakRiskTime: '14:00~15:30',
    predictedPeakRiskScore: 63,
    mainRiskFactors: [
      { title: '짧은 회복 간격', detail: '회의 사이 평균 12분', source: 'calendar' },
      { title: '집중 중단', detail: '오전 앱 전환 9회', source: 'screentime' },
      { title: '보통 수준 에너지', detail: '오후 에너지 63점', source: 'health' },
    ],
    preventionImpactScore: 16,
    riskAfterIntervention: 38,
    confidence: 79,
  },
  restored: {
    currentRiskScore: 31,
    predictedPeakRiskTime: '16:00~17:00',
    predictedPeakRiskScore: 42,
    mainRiskFactors: [
      { title: '오후 피로 누적', detail: '긴 집중 블록 2개 예정', source: 'calendar' },
      { title: '낮은 활동 전환', detail: '점심 전 움직임 부족 가능', source: 'health' },
      { title: '알림 노출', detail: '업무 앱 알림이 집중 시간과 겹침', source: 'screentime' },
    ],
    preventionImpactScore: 10,
    riskAfterIntervention: 21,
    confidence: 74,
  },
};

export const dataSourceSummary = {
  elevated: [
    { source: 'Calendar', status: '위험 신호 감지', note: '오후 회의 밀도 높음', icon: 'calendar' },
    { source: 'Health', status: '분석 완료', note: '수면 부족과 HRV 저하', icon: 'heart-rate-monitor' },
    { source: 'Screen Time', status: '위험 신호 감지', note: '야간 사용 증가', icon: 'device-mobile' },
  ],
  balanced: [
    { source: 'Calendar', status: '분석 완료', note: '회의 사이 여유 보통', icon: 'calendar' },
    { source: 'Health', status: '연결됨', note: '에너지 안정권', icon: 'heart-rate-monitor' },
    { source: 'Screen Time', status: '분석 완료', note: '집중 중단 소폭 증가', icon: 'device-mobile' },
  ],
  restored: [
    { source: 'Calendar', status: '연결됨', note: '집중 시간 충분', icon: 'calendar' },
    { source: 'Health', status: '분석 완료', note: '회복 리듬 좋음', icon: 'heart-rate-monitor' },
    { source: 'Screen Time', status: '분석 완료', note: '야간 사용 낮음', icon: 'device-mobile' },
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
      reason: '짧은 회복 없이 오전 회의가 이어져 긴장도가 높아질 수 있어요.',
      evidence: '수면 5.4h, 스트레스 74점, 09:00 회의 직후',
      expectedEffect: '오전 과부하 상승을 완만하게 조정',
      riskReduction: 6,
      status: 'pending',
      alternatives: ['10:10', '12:30', '17:50'],
    },
    {
      id: 'a2',
      time: '12:20',
      title: '30분 산책과 점심',
      type: 'movement',
      source: 'health',
      reason: '걸음 수가 낮고 오후 회의 전 에너지 보강이 필요해요.',
      evidence: '3,200보, 에너지 44점, 오후 연속 회의 예정',
      expectedEffect: '오후 에너지 회복과 식사 안정 보조',
      riskReduction: 8,
      status: 'pending',
      alternatives: ['12:45', '13:10', '18:30'],
    },
    {
      id: 'a3',
      time: '15:50',
      title: '집중 알림 줄이기 + 스트레칭',
      type: 'focus',
      source: 'combined',
      reason: '15:00~17:00 사이 집중이 흐트러질 가능성이 가장 높게 예측됐어요.',
      evidence: '회의 3개 연속, 픽업 86회, 집중 중단 18회',
      expectedEffect: '피크 시간대 집중 이탈 완화',
      riskReduction: 9,
      status: 'pending',
      alternatives: ['16:05', '16:30', '17:00'],
    },
  ],
  balanced: [
    {
      id: 'b1',
      time: '11:10',
      title: '10분 무음 집중 전환',
      type: 'focus',
      source: 'screentime',
      reason: '오전 앱 전환이 잦아 집중 리듬이 끊기고 있어요.',
      evidence: '집중 중단 9회, 생산성 앱 168분',
      expectedEffect: '오전 업무 전환 비용 감소',
      riskReduction: 5,
      status: 'pending',
      alternatives: ['10:50', '11:30', '13:20'],
    },
    {
      id: 'b2',
      time: '15:20',
      title: '15분 산책 미팅',
      type: 'movement',
      source: 'calendar',
      reason: '오후 회의 이후 회복 간격을 조금 넓히면 좋아요.',
      evidence: '회의 4개, 회의 사이 평균 12분',
      expectedEffect: '오후 스트레스 상승 완화',
      riskReduction: 6,
      status: 'pending',
      alternatives: ['15:35', '17:40', '18:10'],
    },
  ],
  restored: [
    {
      id: 'c1',
      time: '10:30',
      title: '깊은 집중 블록 보호',
      type: 'focus',
      source: 'calendar',
      reason: '컨디션이 좋아 고난도 업무를 앞쪽에 두기 좋아요.',
      evidence: '수면 7.8h, HRV 58, 오전 일정 여유',
      expectedEffect: '오전 생산성 유지',
      riskReduction: 4,
      status: 'pending',
      alternatives: ['09:40', '11:00', '13:30'],
    },
    {
      id: 'c2',
      time: '17:40',
      title: '하루 마감 완충 루틴',
      type: 'recovery',
      source: 'combined',
      reason: '좋은 리듬이 내일로 이어가도록 퇴근 전환을 부드럽게 만들어요.',
      evidence: '야간 사용 8분, 늦은 일정 없음',
      expectedEffect: '야간 스크린타임 상승 예방',
      riskReduction: 6,
      status: 'pending',
      alternatives: ['17:55', '18:20', '20:00'],
    },
  ],
};

export const dailyEvents = {
  elevated: [
    { time: '09:00', title: '팀 스탠드업', sub: '30분 회의', type: 'normal' },
    { time: '10:30', title: '집중 업무', sub: '메일/보고서 정리', type: 'normal' },
    { time: '14:00', title: '제품 리뷰 회의', sub: '1시간', type: 'normal' },
    { time: '15:00', title: '파트너 미팅', sub: '1시간', type: 'normal', risk: true },
    { time: '16:00', title: '주간 의사결정 회의', sub: '1시간', type: 'normal', risk: true },
  ],
  balanced: [
    { time: '09:00', title: '집중 업무', sub: '파워 블록', type: 'normal' },
    { time: '12:00', title: '점심 식사', sub: '1시간', type: 'normal' },
    { time: '14:00', title: '팀 미팅', sub: '1시간', type: 'normal', risk: true },
    { time: '16:30', title: '리뷰 정리', sub: '45분', type: 'normal' },
  ],
  restored: [
    { time: '08:30', title: '기획 집중 업무', sub: '고난도 업무', type: 'normal' },
    { time: '13:00', title: '동료 리뷰', sub: '45분', type: 'normal' },
    { time: '15:00', title: '집중 업무', sub: '파워 블록', type: 'normal' },
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
    { source: 'Screen Time', value: 28, detail: '야간 사용과 잦은 픽업' },
  ],
  repeatedPatterns: [
    '수요일과 목요일 오후에 위험도가 반복 상승',
    '수면이 6시간 아래로 내려간 다음 날 집중 중단 증가',
    '01:00 이후 짧은 영상 사용 다음 날 스트레스 점수 상승',
  ],
  nextWeekPrediction: [
    { day: '월', label: '낮음', score: 39 },
    { day: '화', label: '보통', score: 51 },
    { day: '수', label: '높음', score: 68 },
    { day: '목', label: '높음', score: 71 },
    { day: '금', label: '보통', score: 56 },
  ],
  preventionEffects: [
    { action: '오후 회의 전 15분 완충', effect: '피크 위험 -9' },
    { action: '야간 앱 제한 30분 앞당김', effect: '수면 방해 위험 -14%' },
    { action: '점심 산책 루틴', effect: '오후 에너지 +11' },
  ],
};

export const personalization = {
  integrations: [
    ['Google Calendar', '연결됨'],
    ['Samsung Health', '연결됨'],
    ['Screen Time', '분석 가능'],
  ],
  preferences: [
    ['선호 회복 루틴', '짧은 산책, 호흡, 스트레칭'],
    ['집중 선호 시간', '09:30~11:30'],
    ['피하고 싶은 알림 시간', '22:30~07:30'],
    ['야간 스크린타임 완화 목표', '자정 이후 사용 20분 이하'],
  ],
};
