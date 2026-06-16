const categoryLabel = { calendar: '일정', health: '건강', screentime: '스크린' };
const categoryIcon = { calendar: 'calendar', health: 'heart-rate-monitor', screentime: 'device-mobile' };

export default function WhyAiThinksCards({ factors }) {
  return (
    <section className="mx-4 mt-3 rounded-[24px] border border-border bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wide text-text-secondary">위험 원인</span>
          <h2 className="mt-1 text-[16px] font-semibold text-text-primary">AI가 본 핵심 신호 3개</h2>
        </div>
        <i className="ti ti-brain text-[22px] text-ai" />
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {factors.slice(0, 3).map((factor) => (
          <article key={factor.source} className="rounded-[18px] bg-bg p-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-card text-ai">
              <i className={`ti ti-${categoryIcon[factor.source] || 'info-circle'} text-[15px]`} />
            </div>
            <p className="mt-2 text-[10px] font-medium text-text-secondary">{categoryLabel[factor.source] || '행동'}</p>
            <p className="mt-1 text-[12px] font-semibold leading-snug text-text-primary">{factor.title}</p>
            <p className="mt-1 text-[10px] leading-snug text-text-secondary">{factor.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
