import { buildRiskReasons } from '../../utils/riskAnalysis';

export default function RootCauseCard({ dailyEvents, healthData, academicTasks = [] }) {
  const reasons = buildRiskReasons({ dailyEvents, healthData, academicTasks });

  return (
    <section className="mx-4 mt-3 rounded-[24px] border border-border bg-card p-5 shadow-sm">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-text-secondary">과부하 원인 분석</p>
      <h2 className="mt-1 text-[18px] font-semibold text-text-primary">오늘 일정 과부하는 복합 원인입니다</h2>
      <div className="mt-4 grid gap-2">
        {reasons.map((item) => (
          <ReasonItem key={item.source} item={item} />
        ))}
      </div>
    </section>
  );
}

function ReasonItem({ item }) {
  const tones = {
    risk: 'bg-risk-soft text-risk',
    warning: 'bg-warning-soft text-warning',
    ai: 'bg-ai-soft text-ai',
  };

  return (
    <article className="rounded-[18px] bg-bg p-3">
      <div className="flex items-center gap-2">
        <span className={`rounded-full px-2 py-1 text-[10px] font-semibold ${tones[item.tone]}`}>
          {item.source}
        </span>
        <p className="text-[13px] font-semibold text-text-primary">{item.title}</p>
      </div>
      <p className="mt-2 text-[12px] leading-relaxed text-text-secondary">{item.reason}</p>
    </article>
  );
}
