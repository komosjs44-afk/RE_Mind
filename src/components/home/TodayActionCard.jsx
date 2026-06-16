import RiskDelta from './RiskDelta';
import Button from '../ui/Button';
import Pill from '../ui/Pill';

const badgeLabel = {
  recovery: '회복 권장',
  movement: '활동 권장',
  focus: '집중 위험',
};

export default function TodayActionCard({ intervention, currentRiskScore, onAccept, onDelay, onDismiss }) {
  if (!intervention) {
    return (
      <section className="mx-4 mt-3 rounded-lg border border-border bg-card p-4 text-center text-[13px] text-text-secondary shadow-sm">
        오늘 추가로 제안할 일정 개입이 없어요.
      </section>
    );
  }

  const isAccepted = intervention.status === 'accepted';
  const isSnoozed = intervention.status === 'snoozed';
  const afterRisk = currentRiskScore - intervention.riskReduction;

  return (
    <section className={`mx-4 mt-3 rounded-lg border p-4 transition-colors ${isAccepted ? 'border-ai/20 bg-ai-soft' : 'border-border bg-card'} shadow-sm`}>
      <Pill tone="ai">{badgeLabel[intervention.type] || 'AI 제안'}</Pill>

      <h2 className="mt-3 text-2xl font-semibold leading-snug text-text-primary">{intervention.title}</h2>
      <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-text-secondary">{intervention.reason}</p>

      <div className="mt-3">
        <RiskDelta before={currentRiskScore} after={afterRisk} />
      </div>

      {isSnoozed && (
        <p className="mt-2 text-[11px] font-semibold text-warning">15분 뒤 다시 보기로 미뤄졌어요.</p>
      )}

      {isAccepted ? (
        <div className="mt-4 flex items-center gap-2 text-[13px] font-semibold text-ai">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ai text-white animate-check-pop">
            <i className="ti ti-check text-sm" />
          </span>
          캘린더에 반영됨
        </div>
      ) : (
        <div className="mt-4 flex flex-col gap-2">
          <Button variant="primary" icon="check" className="w-full" onClick={() => onAccept(intervention.id)}>
            지금 수용하기
          </Button>
          <Button variant="secondary" icon="clock" className="w-full" onClick={() => onDelay(intervention.id)}>
            15분 뒤
          </Button>
          <button className="text-[11px] font-medium text-text-secondary/70" onClick={() => onDismiss(intervention.id)}>
            오늘 제외
          </button>
        </div>
      )}
    </section>
  );
}
