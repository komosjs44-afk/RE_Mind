import { Fragment } from 'react';
import {
  sortEventsByTime,
  calculateGaps,
  findRecoverySlot,
  buildScheduleRiskReasons,
  getEventStartMinutes,
} from '../../utils/scheduleRiskAnalysis';

const gapTone = {
  risk: 'bg-risk-soft text-risk',
  warning: 'bg-warning-soft text-warning',
  recovery: 'bg-healthy-soft text-healthy',
};

const gapLabel = {
  risk: '여유 없음',
  warning: '빠듯함',
  recovery: '여유 있음',
};

export default function DailyPlanDiagnosis({ events = [], overload, health, recommendations = [] }) {
  if (events.length === 0) {
    return (
      <section className="mx-4 mt-3 rounded-[24px] border border-border bg-card p-5 text-center shadow-sm">
        <p className="text-[13px] font-semibold text-text-primary">오늘 일정 데이터가 없습니다.</p>
        <p className="mt-1 text-[12px] leading-relaxed text-text-secondary">
          Google Calendar를 연동하면 일정 실행 가능성 분석을 볼 수 있습니다.
        </p>
      </section>
    );
  }

  const sorted = sortEventsByTime(events);
  const gaps = calculateGaps(events);
  const reasons = buildScheduleRiskReasons(events, health);
  const recoverySlot = findRecoverySlot(events);
  const hasParsedTime = sorted.some((e) => getEventStartMinutes(e) !== 9999);
  const acceptedCount = recommendations.filter((r) => r.status === 'accepted').length;

  return (
    <section className="mx-4 mt-3 rounded-[24px] border border-border bg-card p-5 shadow-sm">
      <span className="text-[11px] font-semibold uppercase tracking-wide text-text-secondary">오늘 일정 실행 가능성 진단</span>
      <p className="mt-1 text-[12px] leading-relaxed text-text-secondary">
        실제 일정 흐름에서 과부하 구간과 회복 블록 삽입 가능 시간을 분석합니다.
      </p>
      {!hasParsedTime && (
        <p className="mt-2 text-[11px] font-medium text-warning">일정 시간 정보가 부족해 순서 기반으로만 분석했습니다.</p>
      )}

      <div className="mt-4 rounded-[20px] bg-risk-soft p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-risk">과부하 구간</p>
        <p className="mt-1 text-[16px] font-semibold leading-snug text-text-primary">
          {overload?.predictedPeakRiskTime
            ? `${overload.predictedPeakRiskTime} 일정 집중 구간`
            : '과부하 구간 계산 중'}
        </p>
        <p className="mt-1 text-[12px] leading-relaxed text-text-secondary">
          알바·수업·팀플이 겹쳐 회복 시간 없이 고부하 구간이 이어집니다.
        </p>
      </div>

      <div className="mt-4">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-text-secondary">오늘 일정 흐름</p>
        <div className="mt-2 flex flex-col">
          {sorted.map((event, index) => (
            <Fragment key={`${event.title}-${event.time}-${index}`}>
              <div className={`rounded-[16px] px-3 py-2.5 ${event.risk ? 'bg-risk-soft' : 'bg-bg'}`}>
                <div className="flex items-center justify-between gap-3">
                  <span className="flex-none text-[12px] font-semibold text-text-primary">{event.time}</span>
                  <span className={`truncate text-[12px] font-medium ${event.risk ? 'text-risk' : 'text-text-secondary'}`}>
                    {event.title}
                  </span>
                </div>
              </div>
              {gaps[index] && (
                <div className="flex items-center gap-2 py-1 pl-3">
                  <span className="text-[11px] text-text-secondary">↓</span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${gapTone[gaps[index].level]}`}>
                    빈 시간 {gaps[index].gapMinutes}분 · {gapLabel[gaps[index].level]}
                  </span>
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </div>

      <div className="mt-4 grid gap-2">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-text-secondary">분석 근거</p>
        {reasons.map((reason, index) => (
          <p key={reason} className="rounded-[16px] bg-bg px-3 py-2.5 text-[12px] leading-relaxed text-text-primary">
            {index + 1}. {reason}
          </p>
        ))}
      </div>

      <div className="mt-4 rounded-[20px] bg-healthy-soft p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-healthy">회복 블록 추천 위치</p>
        {recoverySlot ? (
          <>
            <p className="mt-1 text-[14px] font-semibold text-text-primary">
              {recoverySlot.startLabel}~{recoverySlot.endLabel}
            </p>
            <p className="mt-1 text-[12px] leading-relaxed text-text-secondary">
              {recoverySlot.afterEvent.title} 이후, {recoverySlot.beforeEvent.title} 전 회복 가능 구간입니다.
            </p>
          </>
        ) : (
          <p className="mt-1 text-[12px] leading-relaxed text-text-secondary">
            충분한 빈 시간이 없습니다. 가장 짧은 일정 이후 15분 회복 블록을 권장합니다.
          </p>
        )}
      </div>

      {acceptedCount > 0 && (
        <div className="mt-4 rounded-[20px] bg-ai-soft p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-ai">반영된 AI 재설계</p>
          <p className="mt-1 text-[13px] leading-relaxed text-text-primary">
            {acceptedCount}개 추천 일정이 수락되어 오늘 계획에 반영됐습니다.
          </p>
        </div>
      )}
    </section>
  );
}
