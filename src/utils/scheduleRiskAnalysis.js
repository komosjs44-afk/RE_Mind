import { parseTime, parseDurationMinutes, addMinutes } from './time';

export function getEventStartMinutes(event) {
  return parseTime(event?.time || event?.startTime || event?.start);
}

export function getEventEndMinutes(event) {
  if (event?.endTime) return parseTime(event.endTime);
  if (event?.end) return parseTime(event.end);
  const start = getEventStartMinutes(event);
  const duration = typeof event?.duration === 'number' ? event.duration : parseDurationMinutes(event?.sub || event?.title || '');
  return start + duration;
}

export function sortEventsByTime(events = []) {
  return [...events].sort((a, b) => getEventStartMinutes(a) - getEventStartMinutes(b));
}

export function getGapRiskLevel(gapMinutes) {
  if (gapMinutes <= 10) return 'risk';
  if (gapMinutes <= 30) return 'warning';
  return 'recovery';
}

export function calculateGaps(events = []) {
  const sorted = sortEventsByTime(events);
  return sorted.slice(1).map((event, index) => {
    const prev = sorted[index];
    const gapMinutes = Math.max(getEventStartMinutes(event) - getEventEndMinutes(prev), 0);
    return { prev, next: event, gapMinutes, level: getGapRiskLevel(gapMinutes) };
  });
}

export function findDenseScheduleBlocks(events = []) {
  const gaps = calculateGaps(events);
  const blocks = [];
  let current = [];

  gaps.forEach((gap) => {
    if (gap.gapMinutes <= 10) {
      if (current.length === 0) current.push(gap.prev);
      current.push(gap.next);
    } else if (current.length) {
      blocks.push(current);
      current = [];
    }
  });
  if (current.length) blocks.push(current);

  return blocks.filter((block) => block.length >= 2);
}

export function findRecoverySlot(events = [], minGapMinutes = 20) {
  const gaps = calculateGaps(events);
  const candidate = [...gaps].filter((gap) => gap.gapMinutes >= minGapMinutes).sort((a, b) => b.gapMinutes - a.gapMinutes)[0];
  if (!candidate) return null;

  const startMinutes = getEventEndMinutes(candidate.prev);
  const endMinutes = startMinutes + Math.min(candidate.gapMinutes, 30);

  return {
    startLabel: addMinutes('00:00', startMinutes),
    endLabel: addMinutes('00:00', endMinutes),
    gapMinutes: candidate.gapMinutes,
    afterEvent: candidate.prev,
    beforeEvent: candidate.next,
  };
}

export function buildScheduleRiskReasons(events = [], healthData) {
  const reasons = [];
  const denseBlocks = findDenseScheduleBlocks(events);

  if (denseBlocks.length) {
    const longest = [...denseBlocks].sort((a, b) => b.length - a.length)[0];
    reasons.push(`${longest[0].title}부터 ${longest[longest.length - 1].title}까지 ${longest.length}개 일정이 쉬는 시간 없이 이어집니다.`);
  } else if (events.length) {
    reasons.push('오늘 일정 사이에는 위험하게 붙어있는 구간이 없습니다.');
  }

  if (healthData?.sleepHours != null) {
    reasons.push(`수면 ${healthData.sleepHours}h, HRV ${healthData.hrv ?? '-'}ms로 회복 여력이 낮아 같은 일정도 더 크게 부담됩니다.`);
  } else {
    reasons.push('건강 데이터가 없어 일정 밀도 기준으로만 분석했습니다.');
  }

  return reasons;
}
