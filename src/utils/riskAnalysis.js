export function getRiskLevel(score) {
  if (score <= 39) return 'recovery';
  if (score <= 69) return 'warning';
  return 'risk';
}

export function getRiskLabel(score) {
  return { recovery: '회복', warning: '주의', risk: '위험' }[getRiskLevel(score)];
}

export function getRiskColor(score) {
  return { recovery: 'text-healthy', warning: 'text-warning', risk: 'text-risk' }[getRiskLevel(score)];
}

export function calculateRiskDelta(current, after) {
  return Math.max(Number(current || 0) - Number(after || 0), 0);
}

export function buildRiskReasons({ dailyEvents = [], healthData = {}, academicTasks = [] }) {
  const meetingCount = dailyEvents.filter((e) => e.type === 'meeting' || e.sub?.includes('회의')).length;
  const workEvents = dailyEvents.filter((e) => e.type === 'work');
  const workHours = workEvents.reduce((sum, e) => {
    if (!e.time || !e.endTime) return sum + 3;
    const start = parseInt(e.time.split(':')[0]) * 60 + parseInt(e.time.split(':')[1]);
    const end = parseInt(e.endTime.split(':')[0]) * 60 + parseInt(e.endTime.split(':')[1]);
    return sum + (end - start) / 60;
  }, 0);
  const urgentTasks = academicTasks.filter((t) => t.daysLeft <= 3);

  return [
    {
      source: 'Google Calendar',
      title: '일정 밀도',
      reason: `오늘 알바 ${workHours > 0 ? workHours + '시간' : '일정'}과 수업·팀플 ${meetingCount}개가 겹쳐 자유 시간이 부족합니다.`,
      tone: 'warning',
    },
    {
      source: 'Apple Health',
      title: '회복 여력',
      reason: `수면 ${healthData.sleepHours || '-'}h, 걸음 ${healthData.steps?.toLocaleString() || '-'}보로 컨디션 회복이 필요한 상태입니다.`,
      tone: 'risk',
    },
    {
      source: '학사 일정',
      title: '마감 임박',
      reason: urgentTasks.length > 0
        ? `${urgentTasks.map((t) => `${t.title} D-${t.daysLeft}`).join(', ')}으로 오늘 준비 시간이 필요합니다.`
        : '이번 주 주요 마감이 없어 일정 여유가 있습니다.',
      tone: 'ai',
    },
  ];
}

export function getPrimaryIntervention(aiInterventions = []) {
  return [...aiInterventions].sort((a, b) => (b.riskReduction || 0) - (a.riskReduction || 0))[0] || null;
}

export function buildTimelineItems(dailyPlan = [], aiRecommendations = []) {
  return [
    ...dailyPlan,
    ...aiRecommendations.map((item) => ({ ...item, type: 'ai' })),
  ].sort((a, b) => String(a.time).localeCompare(String(b.time)));
}
