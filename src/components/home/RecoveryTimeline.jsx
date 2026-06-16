export default function RecoveryTimeline({ intervention }) {
  if (!intervention) return null;

  return (
    <section className="mx-4 mt-6 rounded-lg border border-border bg-card p-4 shadow-sm">
      <span className="text-[11px] font-semibold uppercase tracking-wide text-text-secondary">오늘의 회복 타임라인</span>
      <div className="mt-3 flex items-center gap-3 rounded-md bg-bg px-3 py-3">
        <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-ai-soft text-ai">
          <i className="ti ti-clock" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-medium text-text-primary">
            {intervention.time}
            {intervention.endTime ? ` ~ ${intervention.endTime}` : ''}
          </p>
          <p className="text-[11px] font-medium text-text-secondary">집중 회복 시간 추천</p>
        </div>
      </div>
    </section>
  );
}
