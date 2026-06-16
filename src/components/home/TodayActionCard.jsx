import { useState } from 'react';
import RiskDelta from './RiskDelta';
import Button from '../ui/Button';
import Pill from '../ui/Pill';
import BottomSheet from '../ui/BottomSheet';
import ActionReasonBottomSheet from './ActionReasonBottomSheet';

const badgeLabel = {
  recovery: '회복 권장',
  movement: '에너지 회복',
  focus: '집중 보호',
};

export default function TodayActionCard({ intervention, currentRiskScore, baselineRiskScore, onAccept, onDelay, onDismiss }) {
  const [evidenceOpen, setEvidenceOpen] = useState(false);

  if (!intervention) {
    return (
      <section className="mx-4 mt-3 rounded-[24px] border border-border bg-card p-5 text-center text-[13px] text-text-secondary shadow-sm">
        오늘 표시할 추가 개입이 없습니다.
      </section>
    );
  }

  const status = intervention.status || 'pending';
  const isAccepted = status === 'accepted';
  const isSnoozed = status === 'snoozed';
  const beforeRisk = baselineRiskScore || currentRiskScore;
  const afterRisk = Math.max(beforeRisk - intervention.riskReduction, 0);

  return (
    <section className={`mx-4 mt-3 rounded-[24px] border p-5 transition-colors ${isAccepted ? 'border-ai/20 bg-ai-soft' : 'border-border bg-card'} shadow-sm`}>
      <div className="flex items-start justify-between gap-3">
        <Pill tone={isAccepted ? 'ai' : 'neutral'} icon={isAccepted ? 'check' : 'bolt'}>
          {isAccepted ? '수용됨' : badgeLabel[intervention.type] || 'AI 제안'}
        </Pill>
        {!isAccepted && <span className="text-[12px] font-semibold text-ai">-{intervention.riskReduction}</span>}
      </div>

      <h2 className="mt-3 text-[22px] font-semibold leading-snug text-text-primary">{intervention.title}</h2>
      <p className="mt-2 text-[13px] leading-relaxed text-text-secondary">{intervention.reason}</p>

      <div className="mt-4 rounded-[18px] bg-bg p-3">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[12px] font-medium text-text-secondary">{isAccepted ? '반영된 위험 변화' : '예상 위험 변화'}</span>
          <RiskDelta before={beforeRisk} after={afterRisk} />
        </div>
        <p className="mt-2 text-[11px] leading-relaxed text-text-secondary">
          근거: {intervention.evidence}
        </p>
      </div>

      <button
        className="mt-3 inline-flex min-h-9 items-center gap-1.5 rounded-full px-1 text-[12px] font-semibold text-ai transition-all active:scale-[0.98]"
        onClick={() => setEvidenceOpen(true)}
      >
        <i className="ti ti-info-circle" />
        판단 근거 자세히 보기
      </button>

      {isSnoozed && (
        <p className="mt-3 rounded-[16px] bg-warning-soft px-3 py-2 text-[12px] font-semibold text-warning">
          {intervention.time}에 다시 알림 예정
        </p>
      )}

      {isAccepted ? (
        <div className="mt-4 flex items-center gap-2 text-[13px] font-semibold text-ai">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ai text-white animate-check-pop">
            <i className="ti ti-check text-sm" />
          </span>
          캘린더에 반영되었습니다
        </div>
      ) : (
        <div className="mt-4 grid gap-2">
          <Button variant="primary" icon="check" className="w-full" onClick={() => onAccept(intervention.id)}>
            지금 수용하기
          </Button>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="secondary" icon="clock" className="min-h-[52px] w-full" onClick={() => onDelay(intervention.id)}>
              15분 뒤
            </Button>
            <Button variant="text" icon="x" className="min-h-[52px] w-full" onClick={() => onDismiss(intervention.id)}>
              오늘 제외
            </Button>
          </div>
        </div>
      )}

      <BottomSheet open={evidenceOpen} onClose={() => setEvidenceOpen(false)} title="AI 판단 근거">
        <ActionReasonBottomSheet intervention={intervention} currentRiskScore={beforeRisk} />
      </BottomSheet>
    </section>
  );
}
