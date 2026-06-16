import RiskDelta from './RiskDelta';

export default function ActionReasonBottomSheet({ intervention, currentRiskScore }) {
  const afterRisk = currentRiskScore - intervention.riskReduction;

  return (
    <div className="grid gap-3">
      <ReasonSection icon="brain" label="왜 지금인가?">
        <p>{intervention.reason}</p>
        <p className="mt-1 text-text-secondary">근거: {intervention.evidence}</p>
      </ReasonSection>

      <ReasonSection icon="alert-triangle" label="안 하면 어떤가?" tone="risk">
        <p>{intervention.consequence}</p>
      </ReasonSection>

      <ReasonSection icon="trending-down" label="하면 무엇이 바뀌나?" tone="ai">
        <p>{intervention.expectedEffect}</p>
        <div className="mt-2">
          <RiskDelta before={currentRiskScore} after={afterRisk} />
        </div>
      </ReasonSection>
    </div>
  );
}

function ReasonSection({ icon, label, tone = 'default', children }) {
  const labelTone = tone === 'risk' ? 'text-risk' : tone === 'ai' ? 'text-ai' : 'text-text-secondary';

  return (
    <div className="rounded-[20px] bg-bg p-4">
      <p className={`flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide ${labelTone}`}>
        <i className={`ti ti-${icon}`} />
        {label}
      </p>
      <div className="mt-2 text-[13px] leading-relaxed text-text-primary">{children}</div>
    </div>
  );
}
