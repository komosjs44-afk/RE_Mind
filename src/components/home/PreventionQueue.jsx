import Pill from '../ui/Pill';

export default function PreventionQueue({ interventions }) {
  if (interventions.length === 0) return null;

  return (
    <section className="mx-4 mt-3 rounded-[24px] border border-border bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wide text-text-secondary">다음 후보</span>
          <h2 className="mt-1 text-[16px] font-semibold text-text-primary">중복 없이 요약된 예방 행동</h2>
        </div>
        <Pill tone="neutral">{interventions.length}개</Pill>
      </div>
      <div className="mt-3 grid gap-2">
        {interventions.map((item) => (
          <article key={item.id} className="rounded-[18px] bg-bg px-3 py-3">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-[13px] font-semibold text-text-primary">{item.title}</p>
                <p className="mt-1 text-[11px] leading-snug text-text-secondary">{item.time} · {item.expectedEffect}</p>
              </div>
              <span className="flex-none rounded-full bg-ai-soft px-2 py-1 text-[11px] font-semibold text-ai">-{item.riskReduction}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
