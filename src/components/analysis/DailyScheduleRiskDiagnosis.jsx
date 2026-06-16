import { Fragment } from 'react';
import RiskDelta from '../home/RiskDelta';
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
  risk: '위험',
  warning: '주의',
  recovery: '회복 가능',
};

export default function DailyScheduleRiskDiagnosis({ events = [], prediction, healthData, interventions = [] }) {
  if (events.length === 0) {
    return (
      <section className="mx-4 mt-3 rounded-[24px] border border-border bg-card p-5 text-center shadow-sm">
        <p className="text-[13px] font-semibold text-text-primary">오늘 일정 데이터가 부족합니다.</p>
        <p className="mt-1 text-[12px] leading-relaxed text-text-secondary">
          캘린더 데이터가 연결되면 일정 기반 위험 진단을 볼 수 있습니다.
        </p>
      </section>
    );
  }

  const sorted = sortEventsByTime(events);
  const gaps = calculateGaps(events);
  const reasons = buildScheduleRiskReasons(events, healthData);
  const recoverySlot = findRecoverySlot(events);
  const hasParsedTime = sorted.some((event) => getEventStartMinutes(event) !== 9999);
  const hasRiskScore = prediction?.currentRiskScore != null;
  const hasAfterScore = prediction?.riskAfterIntervention != null;
  const acceptedCount = interventions.filter((item) => item.status === 'accepted').length;

  return (
    <section className="mx-4 mt-3 rounded-[24px] border border-border bg-card p-5 shadow-sm">
      <span className="text-[11px] font-semibold uppercase tracking-wide text-text-secondary">오늘 일정 기반 위험 진단</span>
      <p className="mt-1 text-[12px] leading-relaxed text-text-secondary">
        실제 일정 흐름을 기준으로 위험 구간과 회복 가능 시간을 분석합니다.
      </p>
      {!hasParsedTime && (
        <p className="mt-2 text-[11px] font-medium text-warning">일정 시간 정보가 부족해 순서 기반으로만 분석했습니다.</p>
      )}

      <div className="mt-4 rounded-[20px] bg-risk-soft p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-risk">위험 시간대</p>
        <p className="mt-1 text-[16px] font-semibold leading-snug text-text-primary">
          {prediction?.predictedPeakRiskTime ? `${prediction.predictedPeakRiskTime} 집중 붕괴 위험` : '위험 시간대 계산 전입니다'}
        </p>
        <p className="mt-1 text-[12px] leading-relaxed text-text-secondary">
          회의가 연속 배치되어 회복 없이 고강도 업무 구간에 진입합니다.
        </p>
        {hasRiskScore ? (
          <div className="mt-3 flex items-center justify-between gap-3 rounded-[16px] bg-card px-3 py-2.5">
            <span className="text-[11px] font-semibold text-text-secondary">위험도</span>
            {hasAfterScore ? (
              <RiskDelta before={prediction.currentRiskScore} after={prediction.riskAfterIntervention} />
            ) : (
              <span className="text-[15px] font-semibold text-risk">{prediction.currentRiskScore}</span>
            )}
          </div>
        ) : (
          <p className="mt-3 text-[12px] font-medium text-text-secondary">위험 점수 계산 전입니다.</p>
        )}
      </div>

      <div className="mt-4">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-text-secondary">오늘 일정 흐름</p>
        <div className="mt-2 flex flex-col">
          {sorted.map((event, index) => (
            <Fragment key={`${event.title}-${event.time}-${index}`}>
              <div className={`rounded-[16px] px-3 py-2.5 ${event.risk ? 'bg-risk-soft' : 'bg-bg'}`}>
                <div className="flex items-center justify-between gap-3">
                  <span className="flex-none text-[12px] font-semibold text-text-primary">{event.time}</span>
                  <span className={`truncate text-[12px] font-medium ${event.risk ? 'text-risk' : 'text-text-secondary'}`}>{event.title}</span>
                </div>
              </div>
              {gaps[index] && (
                <div className="flex items-center gap-2 py-1 pl-3">
                  <span className="text-[11px] text-text-secondary">↓</span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${gapTone[gaps[index].level]}`}>
                    쉬는 시간 {gaps[index].gapMinutes}분 · {gapLabel[gaps[index].level]}
                  </span>
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </div>

      <div className="mt-4 grid gap-2">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-text-secondary">원인</p>
        {reasons.map((reason, index) => (
          <p key={reason} className="rounded-[16px] bg-bg px-3 py-2.5 text-[12px] leading-relaxed text-text-primary">
            원인 {index + 1}. {reason}
          </p>
        ))}
      </div>

      <div className="mt-4 rounded-[20px] bg-healthy-soft p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-healthy">Recovery Block 추천 위치</p>
        {recoverySlot ? (
          <>
            <p className="mt-1 text-[14px] font-semibold text-text-primary">
              추천 위치: {recoverySlot.startLabel}–{recoverySlot.endLabel}
            </p>
            <p className="mt-1 text-[12px] leading-relaxed text-text-secondary">
              {recoverySlot.afterEvent.title} 다음, {recoverySlot.beforeEvent.title} 진입 전 회복 가능 시간입니다.
            </p>
          </>
        ) : (
          <p className="mt-1 text-[12px] leading-relaxed text-text-secondary">
            오늘은 충분한 빈 시간이 부족합니다. 가장 짧은 회의 이후 15분 회복 블록을 권장합니다.
          </p>
        )}
      </div>

      <div className="mt-4 rounded-[20px] bg-ai-soft p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-ai">기대 효과</p>
        <p className="mt-1 text-[13px] leading-relaxed text-text-primary">
          {hasRiskScore && hasAfterScore
            ? `30분 회복 블록을 추가하면 위험도 ${prediction.currentRiskScore} → ${prediction.riskAfterIntervention}로 낮아질 수 있습니다.`
            : '회복 블록을 추가하면 위험도를 낮출 수 있습니다.'}
        </p>
        {acceptedCount > 0 && (
          <p className="mt-1 text-[11px] font-medium text-ai">이미 {acceptedCount}개 행동을 수용해 반영했습니다.</p>
        )}
      </div>
    </section>
  );
}
