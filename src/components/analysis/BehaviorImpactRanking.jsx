import { burnoutReport } from '../../data/schedule';

export default function BehaviorImpactRanking() {
  const ranked = [...burnoutReport.sourceImpact].sort((a, b) => b.value - a.value);

  return (
    <section className="mx-4 mt-4 rounded-lg border border-border bg-card p-5 shadow-sm">
      <span className="text-[11px] font-semibold uppercase tracking-wide text-text-secondary">Behavior Impact Ranking</span>
      <div className="mt-3 flex flex-col gap-2">
        {ranked.map((item, idx) => (
          <div key={item.source} className="flex items-center gap-3 rounded-lg bg-bg px-3 py-2.5">
            <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-card text-[11px] font-semibold text-text-secondary">
              {idx + 1}
            </span>
            <div className="flex-1">
              <p className="text-[13px] font-medium text-text-primary">{item.detail}</p>
              <p className="text-[11px] text-text-secondary">{item.source}</p>
            </div>
            <span className="text-[15px] font-semibold text-risk">+{item.value}%</span>
          </div>
        ))}
      </div>
    </section>
  );
}
