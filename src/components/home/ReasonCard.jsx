const sourceIcon = {
  health: 'heartbeat',
  academic: 'school',
  calendar: 'calendar',
  combined: 'sparkles',
};

export default function ReasonCard({ factors = [] }) {
  if (factors.length === 0) return null;

  return (
    <section className="mx-4 mt-3 rounded-[24px] border border-border bg-card p-4 shadow-sm">
      <span className="text-[11px] font-semibold uppercase tracking-wide text-text-secondary">추천 이유</span>
      <div className="mt-3 grid gap-2.5">
        {factors.map((f, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="mt-0.5 flex h-7 w-7 flex-none items-center justify-center rounded-full bg-ai-soft text-ai">
              <i className={`ti ti-${sourceIcon[f.source] || 'info-circle'} text-[13px]`} />
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-text-primary">{f.title}</p>
              <p className="mt-0.5 text-[12px] text-text-secondary">{f.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
