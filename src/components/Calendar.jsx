import { useState } from 'react';
import MiniMonthPicker from './calendar/MiniMonthPicker';
import DayTimeline from './calendar/DayTimeline';
import CalendarEmptyState from './calendar/CalendarEmptyState';
import { parseTime } from '../utils/time';

export default function Calendar({
  events,
  calendarData,
  curY,
  curM,
  selD,
  setCurY,
  setCurM,
  setSelD,
}) {
  const isToday = curY === 2026 && curM === 5 && selD === 16;
  const dayEvents = isToday ? events : getMockFutureEvents(selD);
  const sortedEvents = [...dayEvents].sort((a, b) => parseTime(a.time) - parseTime(b.time));
  const hasRiskWindow = isToday && calendarData?.overloadTimeRange?.includes('~');
  const [riskStart, riskEnd] = hasRiskWindow ? calendarData.overloadTimeRange.split('~') : [null, null];

  return (
    <main className="page no-scrollbar h-[calc(100%-112px)] overflow-y-auto pb-24">
      <MiniMonthPicker curY={curY} curM={curM} selD={selD} setCurY={setCurY} setCurM={setCurM} setSelD={setSelD} compact />
      <section className="mx-4 mb-4 mt-3 rounded-[24px] border border-border bg-card p-3 shadow-sm">
        <div className="flex items-center justify-between px-1 pb-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-text-secondary">시간축 탐색</p>
            <h2 className="text-[16px] font-semibold text-text-primary">
              {String(curM + 1).padStart(2, '0')}월 {selD}일
            </h2>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="rounded-full bg-ai-soft px-3 py-1 text-[11px] font-semibold text-ai">
              {dayEvents.length}개 일정
            </span>
            {hasRiskWindow && (
              <span className="rounded-full bg-risk-soft px-3 py-1 text-[11px] font-semibold text-risk">
                {calendarData.overloadTimeRange} 과부하
              </span>
            )}
          </div>
        </div>
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
    2: [
      { title: '월간 목표 점검', time: '09:30', sub: '45분 회의', type: 'normal' },
      { title: '치과 예약', time: '12:30', sub: '1시간', type: 'normal' },
      { title: '친구 저녁 약속', time: '18:30', sub: '1시간 30분', type: 'normal' },
    ],
    3: [
      { title: '출근길 이동', time: '08:00', sub: '45분', type: 'normal' },
      { title: '고객사 미팅', time: '10:00', sub: '1시간', type: 'normal' },
      { title: '자료 정리', time: '13:30', sub: '1시간', type: 'normal' },
      { title: '헬스장', time: '19:00', sub: '1시간', type: 'normal' },
    ],
    5: [
      { title: '제품 스펙 리뷰', time: '09:00', sub: '1시간', type: 'normal' },
      { title: '팀 점심', time: '12:00', sub: '1시간', type: 'normal' },
      { title: '브랜드 회의', time: '14:00', sub: '1시간', type: 'normal' },
      { title: '저녁 장보기', time: '18:20', sub: '40분', type: 'normal' },
    ],
    6: [
      { title: '원온원', time: '10:30', sub: '30분 회의', type: 'normal' },
      { title: '병원 예약', time: '15:00', sub: '1시간', type: 'normal' },
      { title: '가족 통화', time: '20:00', sub: '30분', type: 'normal' },
    ],
    8: [
      { title: '주간 킥오프', time: '09:00', sub: '45분 회의', type: 'normal' },
      { title: '리서치 인터뷰', time: '11:00', sub: '1시간', type: 'normal' },
      { title: '보고서 작성', time: '14:00', sub: '1시간 30분', type: 'normal' },
      { title: '저녁 약속', time: '19:00', sub: '1시간 30분', type: 'normal' },
    ],
    10: [
      { title: '디자인 QA', time: '09:30', sub: '1시간', type: 'normal' },
      { title: '점심 산책', time: '12:20', sub: 'AI 회복 루틴', type: 'ai', source: 'health', status: 'pending' },
      { title: '파트너 콜', time: '16:00', sub: '45분 회의', type: 'normal' },
    ],
    12: [
      { title: '오전 회의 블록', time: '09:00', sub: '2시간', type: 'normal', risk: true },
      { title: '프로젝트 리뷰', time: '13:00', sub: '1시간', type: 'normal' },
      { title: '긴급 수정 대응', time: '16:00', sub: '1시간', type: 'normal', risk: true },
      { title: '동료 저녁', time: '19:00', sub: '1시간 30분', type: 'normal' },
    ],
    13: [
      { title: '세탁/집안일', time: '10:00', sub: '1시간', type: 'normal' },
      { title: '카페 작업', time: '14:00', sub: '2시간', type: 'normal' },
      { title: '친구 생일 모임', time: '18:30', sub: '2시간', type: 'normal' },
    ],
    15: [
      { title: '월요일 스탠드업', time: '09:00', sub: '30분 회의', type: 'normal' },
      { title: '광고 소재 리뷰', time: '10:00', sub: '1시간', type: 'normal' },
      { title: '런치 미팅', time: '12:00', sub: '1시간', type: 'normal' },
      { title: '기획서 마감', time: '15:00', sub: '2시간', type: 'normal', risk: true },
    ],
    17: [
      { title: '기획 리뷰', time: '10:00', sub: '45분 회의', type: 'normal' },
      { title: '팀 점심', time: '12:00', sub: '1시간', type: 'normal' },
      { title: '점심 산책', time: '12:30', sub: 'AI 회복 루틴', type: 'ai', source: 'health', status: 'pending' },
      { title: '친구 커피 약속', time: '18:00', sub: '1시간', type: 'normal' },
    ],
    18: [
      { title: '아침 운동', time: '07:30', sub: '40분', type: 'normal' },
      { title: '리더십 싱크', time: '10:00', sub: '1시간', type: 'normal' },
      { title: '연속 회의 블록', time: '14:00', sub: '2시간', type: 'normal', risk: true },
      { title: '회의 전 휴식', time: '16:10', sub: 'AI 회복 루틴', type: 'ai', source: 'calendar', status: 'pending' },
      { title: '장보기', time: '18:30', sub: '40분', type: 'normal' },
    ],
    19: [
      { title: '주간 회고', time: '09:30', sub: '1시간', type: 'normal' },
      { title: '은행 업무', time: '12:30', sub: '30분', type: 'normal' },
      { title: '저녁 약속', time: '19:00', sub: '2시간', type: 'normal' },
    ],
    20: [
      { title: '주간 광고 회의', time: '09:00', sub: '1시간', type: 'normal' },
      { title: '파워존 보호', time: '10:30', sub: 'AI 회복 루틴', type: 'ai', source: 'combined', status: 'accepted' },
      { title: '가족 점심', time: '12:30', sub: '1시간 30분', type: 'normal' },
      { title: '영화 약속', time: '17:30', sub: '2시간', type: 'normal' },
    ],
    22: [
      { title: '신규 캠페인 킥오프', time: '09:00', sub: '1시간', type: 'normal' },
      { title: '고객 미팅', time: '11:00', sub: '1시간', type: 'normal' },
      { title: '디자인 집중 작업', time: '14:00', sub: '2시간', type: 'normal' },
      { title: '필라테스', time: '19:30', sub: '1시간', type: 'normal' },
    ],
    23: [
      { title: '회의 1', time: '09:00', sub: '45분', type: 'normal', risk: true },
      { title: '회의 2', time: '10:00', sub: '45분', type: 'normal', risk: true },
      { title: '회의 3', time: '11:00', sub: '45분', type: 'normal', risk: true },
      { title: '회복 블록', time: '12:20', sub: 'AI 회복 루틴', type: 'ai', source: 'calendar', status: 'pending' },
      { title: '저녁 모임', time: '19:00', sub: '2시간', type: 'normal' },
    ],
    24: [
      { title: '자료 리서치', time: '09:30', sub: '1시간 30분', type: 'normal' },
      { title: '친구 점심', time: '12:30', sub: '1시간', type: 'normal' },
      { title: '치과 정기검진', time: '17:30', sub: '1시간', type: 'normal' },
    ],
    25: [
      { title: '제품 리뷰', time: '09:00', sub: '1시간', type: 'normal' },
      { title: '파트너 미팅', time: '10:30', sub: '1시간', type: 'normal', risk: true },
      { title: '법무 확인', time: '13:30', sub: '45분', type: 'normal' },
      { title: '팀 회식', time: '18:30', sub: '2시간', type: 'normal' },
    ],
    27: [
      { title: '청소/정리', time: '09:30', sub: '1시간', type: 'normal' },
      { title: '가족 약속', time: '12:00', sub: '2시간', type: 'normal' },
      { title: '개인 프로젝트', time: '16:00', sub: '2시간', type: 'normal' },
    ],
    29: [
      { title: '월말 보고', time: '09:00', sub: '1시간', type: 'normal', risk: true },
      { title: '예산 리뷰', time: '11:00', sub: '1시간', type: 'normal' },
      { title: '외부 미팅 이동', time: '14:00', sub: '1시간 30분', type: 'normal' },
      { title: '친구 저녁', time: '19:00', sub: '1시간 30분', type: 'normal' },
    ],
    30: [
      { title: '월말 회고', time: '10:00', sub: '1시간', type: 'normal' },
      { title: '정산 처리', time: '13:00', sub: '1시간', type: 'normal' },
      { title: '운동', time: '18:30', sub: '1시간', type: 'normal' },
    ],
  };

  return events[day] || [];
}
