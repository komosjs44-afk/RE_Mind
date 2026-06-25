import Pill from '../ui/Pill';

const typeLabel = { study: '공부', task: '과제', recovery: '회복', focus: '집중' };
const typeIcon = { study: 'book', task: 'file-text', recovery: 'heart', focus: 'focus-2' };

export default function RecommendationQueue({ recommendations }) {
  if (!recommendations || recommendations.length === 0) return null;

  return (
    <section className="mx-4 mt-3 rounded-[24px] border border-border bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wide text-text-secondary">추천 일정 큐</span>
          <h2 className="mt-1 text-[16px] font-semibold text-text-primary">나머지 AI 재설계 제안</h2>
        </div>
        <Pill tone="neutral">{recommendations.length}개</Pill>
      </div>
      <div className="mt-3 grid gap-2">
        {recommendations.map((item) => (
          <article key={item.id} className="rounded-[18px] bg-bg px-3 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-card text-ai">
                <i className={`ti ti-${typeIcon[item.type] || 'sparkles'} text-[15px]`} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-semibold text-text-primary">{item.title}</p>
                <p className="mt-0.5 text-[11px] leading-snug text-text-secondary">
                  {item.time} · {item.expectedEffect}
                </p>
              </div>
              <span className="flex-none rounded-full bg-ai-soft px-2 py-1 text-[11px] font-semibold text-ai">
                {typeLabel[item.type] || 'AI'}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
