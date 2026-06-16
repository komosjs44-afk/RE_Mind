export default function BehaviorImpactRanking({ dataSources }) {
  const ranked = [...dataSources].sort((a, b) => b.impact - a.impact);

  return (
    <section className="mx-4 mt-3 rounded-[24px] border border-border bg-card p-5 shadow-sm">
      <span className="text-[11px] font-semibold uppercase tracking-wide text-text-secondary">위험 원인</span>
      <h2 className="mt-2 text-[17px] font-semibold text-text-primary">72점 산출 근거</h2>
      <p className="mt-2 text-[12px] leading-relaxed text-text-secondary">
        각 연동 데이터에서 감지된 신호를 위험도 영향 순서대로 정렬했습니다.
      </p>

      <div className="mt-3 grid gap-2">
        {ranked.map((item, idx) => (
          <div key={item.id} className="rounded-[18px] bg-bg px-3 py-3">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-card text-[11px] font-semibold text-text-secondary">
                {idx + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-text-primary">{item.source}</p>
                <p className="text-[11px] text-text-secondary">{item.note}</p>
              </div>
              <span className="text-[15px] font-semibold text-risk">+{item.impact}%</span>
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5 pl-10">
              {item.usedSignals.map((signal) => (
                <span key={signal} className="rounded-full bg-card px-2 py-1 text-[10px] font-medium text-text-secondary">
                  {signal}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
