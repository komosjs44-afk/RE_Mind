import { useState } from 'react';
import RiskDelta from './home/RiskDelta';
import BottomSheet from './ui/BottomSheet';

export default function InterventionCard({
  intervention,
  currentRiskScore,
  acceptIntervention,
  moveIntervention,
  delayIntervention,
  dismissIntervention,
}) {
  const [evidenceOpen, setEvidenceOpen] = useState(false);
  const [showTimes, setShowTimes] = useState(false);
  const isAccepted = intervention.status === 'accepted';
  const isSnoozed = intervention.status === 'snoozed';
  const afterRisk = currentRiskScore - intervention.riskReduction;
  const timeOptions = intervention.alternatives?.length ? intervention.alternatives : ['11:30', '14:00', '17:30'];

  return (
    <article className={`rounded-lg border p-4 ${isAccepted ? 'border-ai/20 bg-ai-soft' : 'border-border bg-card'} shadow-sm`}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-[14px] font-semibold text-text-primary">{intervention.title}</h3>
          <p className="mt-1 text-[12px] font-medium text-text-secondary">
            {intervention.time}{intervention.endTime ? ` ~ ${intervention.endTime}` : ''}
          </p>
        </div>
        <RiskDelta before={currentRiskScore} after={afterRisk} />
      </div>

      {isSnoozed && <p className="mt-3 text-[11px] font-semibold text-warning">다시 보기 예약됨</p>}

      <button className="mt-3 min-h-8 text-[12px] font-medium text-ai" onClick={() => setEvidenceOpen(true)}>
        근거 보기
      </button>

      {isAccepted ? (
        <div className="mt-3 flex items-center gap-1.5 text-[12px] font-semibold text-ai">
          <i className="ti ti-check" />
          캘린더에 반영됨
        </div>
      ) : (
        <>
          <div className="mt-2 flex items-center gap-3">
            <button className="min-h-8 text-[12px] font-semibold text-navy" onClick={() => acceptIntervention(intervention.id)}>
              수용
            </button>
            <button className="min-h-8 text-[12px] font-medium text-text-secondary" onClick={() => setShowTimes((prev) => !prev)}>
              다른 시간
            </button>
            <button className="min-h-8 text-[12px] font-medium text-text-secondary" onClick={() => delayIntervention(intervention.id)}>
              15분 뒤
            </button>
            <button className="min-h-8 text-[12px] font-medium text-text-secondary/60" onClick={() => dismissIntervention(intervention.id)}>
              제외
            </button>
          </div>
          {showTimes && (
            <div className="mt-3 grid grid-cols-3 gap-2 rounded-lg bg-bg p-2">
              {timeOptions.map((time) => (
                <button key={time} className="min-h-8 rounded-md bg-card text-[11px] font-semibold text-ai" onClick={() => moveIntervention(intervention.id, time)}>
                  {time}
                </button>
              ))}
            </div>
          )}
        </>
      )}

      <BottomSheet open={evidenceOpen} onClose={() => setEvidenceOpen(false)} title={intervention.title}>
        <dl className="space-y-3">
          <div>
            <dt className="text-[10px] font-semibold uppercase text-text-secondary">추천 이유</dt>
            <dd className="mt-1 text-[13px] text-text-primary">{intervention.reason}</dd>
          </div>
          <div>
            <dt className="text-[10px] font-semibold uppercase text-text-secondary">근거 데이터</dt>
            <dd className="mt-1 text-[13px] text-text-primary">{intervention.evidence}</dd>
          </div>
          <div>
            <dt className="text-[10px] font-semibold uppercase text-text-secondary">예상 효과</dt>
            <dd className="mt-1 text-[13px] text-text-primary">{intervention.expectedEffect}</dd>
          </div>
        </dl>
      </BottomSheet>
    </article>
  );
}
