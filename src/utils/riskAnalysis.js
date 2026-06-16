export function getRiskLevel(score) {
  if (score <= 39) return 'recovery';
  if (score <= 69) return 'warning';
  return 'risk';
}

export function getRiskLabel(score) {
  const labels = {
    recovery: '회복',
    warning: '주의',
    risk: '위험',
  };

  return labels[getRiskLevel(score)];
}

export function getRiskColor(score) {
  const colors = {
    recovery: 'text-healthy',
    warning: 'text-warning',
    risk: 'text-risk',
  };

  return colors[getRiskLevel(score)];
}

export function calculateRiskDelta(current, after) {
  return Math.max(Number(current || 0) - Number(after || 0), 0);
}

export function buildRiskReasons({ dailyEvents = [], healthData = {}, screenData = {} }) {
  const meetingCount = dailyEvents.filter((event) => event.sub?.includes('회의') || event.title?.includes('미팅')).length;
  const riskEvents = dailyEvents.filter((event) => event.risk).length;

  return [
    {
      source: 'Calendar',
      title: '일정 밀도',
      reason: `오늘 회의/미팅 ${meetingCount}개와 위험 구간 일정 ${riskEvents}개가 겹칩니다.`,
      tone: 'warning',
    },
    {
      source: 'Samsung Health',
      title: '회복 여력',
      reason: `수면 ${healthData.sleepHours || '-'}h, HRV ${healthData.hrv || '-'}ms로 회복 신호가 낮습니다.`,
      tone: 'risk',
    },
    {
      source: 'Screen Data',
      title: '집중 방해',
      reason: `야간 사용 ${screenData.lateNightUsage || '-'}, 픽업 ${screenData.pickupCount || '-'}회가 다음 날 집중에 부담을 줍니다.`,
      tone: 'ai',
    },
  ];
}

export function getPrimaryIntervention(aiInterventions = []) {
  return [...aiInterventions].sort((a, b) => (b.riskReduction || 0) - (a.riskReduction || 0))[0] || null;
}

export function buildTimelineItems(dailyEvents = [], aiInterventions = []) {
  return [
    ...dailyEvents,
    ...aiInterventions.map((item) => ({ ...item, type: 'ai' })),
  ].sort((a, b) => String(a.time).localeCompare(String(b.time)));
}
