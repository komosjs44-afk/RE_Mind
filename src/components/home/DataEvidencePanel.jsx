export default function DataEvidencePanel({ sources }) {
  return (
    <section className="mx-4 mt-3 rounded-[24px] border border-border bg-card p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-text-secondary">데이터 근거</p>
          <h2 className="mt-1 text-[18px] font-semibold text-text-primary">72점 판단에 실제로 쓰인 신호</h2>
          <p className="mt-2 text-[12px] leading-relaxed text-text-secondary">
            현재는 MVP 샘플 데이터 기준이며, 실제 연동 후에는 같은 구조로 동기화된 신호를 보여줍니다.
          </p>
        </div>
        <span className="rounded-full bg-ai-soft px-3 py-1 text-[11px] font-semibold text-ai">3개 데이터</span>
      </div>

      <div className="mt-4 grid gap-3">
        {sources.map((source) => (
          <EvidenceSource key={source.id} source={source} />
        ))}
      </div>
    </section>
  );
}

function EvidenceSource({ source }) {
  return (
    <article className="rounded-[18px] bg-bg p-3">
      <div className="flex items-start gap-3">
        <div className="grid h-10 w-10 flex-none place-items-center rounded-full bg-card text-ai">
          <i className={`ti ti-${source.icon} text-[18px]`} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[13px] font-semibold text-text-primary">{source.source}</p>
              <p className="mt-0.5 text-[10px] font-medium text-text-secondary">
                {source.status} · {source.lastSyncedAt} 샘플 기준
              </p>
            </div>
            <span className="rounded-full bg-risk-soft px-2.5 py-1 text-[11px] font-semibold text-risk">{source.impactLabel}</span>
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {source.usedSignals.map((signal) => (
              <span key={signal} className="rounded-full bg-card px-2 py-1 text-[10px] font-medium text-text-secondary">
                {signal}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
