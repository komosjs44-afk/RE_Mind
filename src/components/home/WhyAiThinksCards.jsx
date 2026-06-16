const categoryLabel = { calendar: '일정', health: '회복', screentime: '디지털 피로' };
const categoryIcon = { calendar: 'calendar', health: 'heart-rate-monitor', screentime: 'device-mobile' };

export default function WhyAiThinksCards({ factors }) {
  return (
    <section className="mx-4 mt-6 rounded-lg border border-border bg-card p-4 shadow-sm">
      <span className="text-[11px] font-semibold uppercase tracking-wide text-text-secondary">왜 이렇게 판단했나요</span>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {factors.slice(0, 3).map((factor) => (
          <article key={factor.source} className="rounded-md bg-bg p-3 text-center">
            <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-card text-text-secondary">
              <i className={`ti ti-${categoryIcon[factor.source] || 'info-circle'} text-[14px]`} />
            </div>
            <p className="mt-2 text-[10px] font-medium text-text-secondary">{categoryLabel[factor.source] || '행동'}</p>
            <p className="mt-1 text-[12px] font-medium leading-snug text-text-primary">{factor.title}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
