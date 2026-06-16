import { useState } from 'react';
import RiskDelta from './home/RiskDelta';
import BottomSheet from './ui/BottomSheet';
import Button from './ui/Button';

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
    <article className={`rounded-[24px] border p-4 ${isAccepted ? 'border-ai/20 bg-ai-soft' : 'border-border bg-card'} shadow-sm`}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-[14px] font-semibold text-text-primary">{intervention.title}</h3>
          <p className="mt-1 text-[12px] font-medium text-text-secondary">
            {intervention.time}{intervention.endTime ? ` ~ ${intervention.endTime}` : ''}
          </p>
        </div>
        <RiskDelta before={currentRiskScore} after={afterRisk} />
      </div>

      {isSnoozed && <p className="mt-3 rounded-[16px] bg-warning-soft px-3 py-2 text-[11px] font-semibold text-warning">다시 보기 예약됨</p>}

      <button className="mt-3 min-h-8 text-[12px] font-semibold text-ai transition-all active:scale-[0.98]" onClick={() => setEvidenceOpen(true)}>
        근거 보기
      </button>

      {isAccepted ? (
        <div className="mt-3 flex items-center gap-1.5 text-[12px] font-semibold text-ai">
          <i className="ti ti-check" />
          캘린더에 반영됨
        </div>
      ) : (
        <>
          <div className="mt-2 grid grid-cols-4 gap-2">
            <Button variant="text" className="min-h-10 px-2 text-[12px] text-navy" onClick={() => acceptIntervention(intervention.id)}>
              수용
            </Button>
            <Button variant="text" className="min-h-10 px-2 text-[12px]" onClick={() => setShowTimes((prev) => !prev)}>
              이동
            </Button>
            <Button variant="text" className="min-h-10 px-2 text-[12px]" onClick={() => delayIntervention(intervention.id)}>
              15분 뒤
            </Button>
            <Button variant="text" className="min-h-10 px-2 text-[12px]" onClick={() => dismissIntervention(intervention.id)}>
              제외
            </Button>
          </div>
          {showTimes && (
            <div className="mt-3 grid grid-cols-3 gap-2 rounded-[18px] bg-bg p-2">
              {timeOptions.map((time) => (
                <button key={time} className="min-h-9 rounded-[14px] bg-card text-[11px] font-semibold text-ai transition-all active:scale-[0.98]" onClick={() => moveIntervention(intervention.id, time)}>
                  {time}
                </button>
              ))}
            </div>
          )}
        </>
      )}

      <BottomSheet open={evidenceOpen} onClose={() => setEvidenceOpen(false)} title={intervention.title}>
        <dl className="grid gap-3">
          <Detail label="추천 이유" value={intervention.reason} />
          <Detail label="근거 데이터" value={intervention.evidence} />
          <Detail label="예상 효과" value={intervention.expectedEffect} />
        </dl>
      </BottomSheet>
    </article>
  );
}

function Detail({ label, value }) {
  return (
    <div className="rounded-[20px] bg-bg p-4">
      <dt className="text-[10px] font-semibold uppercase text-text-secondary">{label}</dt>
      <dd className="mt-1 text-[13px] leading-relaxed text-text-primary">{value}</dd>
    </div>
  );
}
