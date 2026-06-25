export default function TodayAnalysis({ overload }) {
  const score = overload?.currentRiskScore ?? 0;
  const afterScore = overload?.riskAfterIntervention ?? 0;
  const factors = overload?.mainRiskFactors ?? [];

  const scoreColor = score >= 70 ? 'text-risk' : score >= 50 ? 'text-warning' : 'text-healthy';
  const barColor = score >= 70 ? 'bg-risk' : score >= 50 ? 'bg-warning' : 'bg-healthy';

  return (
    <section className="mx-4 mt-3 rounded-[24px] border border-border bg-card p-5 shadow-sm">
      <span className="text-[11px] font-semibold uppercase tracking-wide text-text-secondary">오늘 분석</span>

      <div className="mt-3 flex items-center gap-5">
        <div className="flex-none">
          <p className={`text-[44px] font-bold leading-none ${scoreColor}`}>{score}</p>
          <p className="mt-1 text-[11px] text-text-secondary">과부하 지수</p>
        </div>
        <div className="flex-1 grid gap-3">
          <div>
            <div className="mb-1 flex items-center justify-between">
              <span className="text-[11px] text-text-secondary">현재</span>
              <span className="text-[11px] font-semibold text-text-secondary">{score}점</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-bg">
              <div className={`h-full rounded-full transition-all ${barColor}`} style={{ width: `${score}%` }} />
            </div>
          </div>
          <div>
            <div className="mb-1 flex items-center justify-between">
              <span className="text-[11px] text-text-secondary">AI 재설계 후</span>
              <span className="text-[11px] font-semibold text-healthy">{afterScore}점</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-bg">
              <div className="h-full rounded-full bg-healthy transition-all" style={{ width: `${afterScore}%` }} />
            </div>
          </div>
        </div>
      </div>

      {factors.length > 0 && (
        <div className="mt-4 grid gap-2 border-t border-border pt-4">
          {factors.map((f, i) => (
            <div key={i} className="flex items-start justify-between gap-3">
              <p className="text-[12px] text-text-primary">{f.title}</p>
              <p className="flex-none text-right text-[11px] text-text-secondary">{f.detail}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
