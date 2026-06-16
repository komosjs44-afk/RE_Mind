import { useState } from 'react';
import MiniMonthPicker from './calendar/MiniMonthPicker';
import DayTimeline from './calendar/DayTimeline';
import CalendarEmptyState from './calendar/CalendarEmptyState';
import CalendarRiskActionPanel from './calendar/CalendarRiskActionPanel';
import { parseTime } from '../utils/time';

export default function Calendar({
  events,
  calendarData,
  prediction,
  primaryIntervention,
  acceptIntervention,
  delayIntervention,
  curY,
  curM,
  selD,
  setCurY,
  setCurM,
  setSelD,
}) {
  const [focusModeOn, setFocusModeOn] = useState(false);
  const isToday = curY === 2026 && curM === 5 && selD === 16;
  const dayEvents = isToday ? events : getMockFutureEvents(selD);
  const sortedEvents = [...dayEvents].sort((a, b) => parseTime(a.time) - parseTime(b.time));
  const hasRiskWindow = isToday && calendarData.overloadTimeRange.includes('~');
  const [riskStart, riskEnd] = hasRiskWindow ? calendarData.overloadTimeRange.split('~') : [null, null];

  return (
    <main className="page no-scrollbar h-[calc(100%-112px)] overflow-y-auto pb-24">
      <MiniMonthPicker curY={curY} curM={curM} selD={selD} setCurY={setCurY} setCurM={setCurM} setSelD={setSelD} />
      {isToday && (
        <CalendarRiskActionPanel
          prediction={prediction}
          calendarData={calendarData}
          intervention={primaryIntervention}
          focusModeOn={focusModeOn}
          onAccept={acceptIntervention}
          onDelay={delayIntervention}
          onFocusMode={() => setFocusModeOn((prev) => !prev)}
        />
      )}
      <section className="mx-4 mb-4 mt-3 rounded-lg border border-border bg-card p-3 shadow-sm">
        <p className="px-1 pb-2 text-[11px] font-semibold uppercase tracking-wide text-text-secondary">
          {String(curM + 1).padStart(2, '0')}월 {selD}일 보호 타임라인
        </p>
        {dayEvents.length === 0 ? (
          <CalendarEmptyState />
        ) : (
          <DayTimeline
            events={sortedEvents}
            riskWindow={hasRiskWindow ? { start: riskStart, end: riskEnd } : null}
          />
        )}
      </section>
    </main>
  );
}

function getMockFutureEvents(day) {
  const events = {
    17: [
      { title: '기획 리뷰', time: '10:00', sub: '45분', type: 'normal' },
      { title: '점심 산책', time: '12:30', sub: 'AI 회복 루틴', type: 'ai', source: 'health', status: 'pending' },
    ],
    18: [
      { title: '연속 회의 블록', time: '14:00', sub: '2시간', type: 'normal', risk: true },
      { title: '회의 전 완충', time: '16:10', sub: 'AI 회복 루틴', type: 'ai', source: 'calendar', status: 'pending' },
    ],
    20: [
      { title: '주간 광고 회의', time: '09:00', sub: '1시간', type: 'normal' },
      { title: '파워존 보호', time: '10:30', sub: 'AI 회복 루틴', type: 'ai', source: 'combined', status: 'accepted' },
    ],
  };

  return events[day] || [];
}
