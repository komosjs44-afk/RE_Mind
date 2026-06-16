export default function CompletedDaySchedule({ events }) {
  return (
    <section className="mx-4 mb-4 mt-6 rounded-lg border border-border bg-card p-4 shadow-sm">
      <span className="text-[11px] font-semibold uppercase tracking-wide text-text-secondary">완성된 하루 스케줄</span>
      <div className="mt-3 flex flex-col gap-2">
        {events.map((event) => (
          <article key={`${event.id || event.title}-${event.time}`} className="flex min-h-[48px] items-center gap-3 rounded-md bg-bg px-3 py-2.5">
            <span className="w-11 flex-none text-[12px] font-medium text-text-primary">{event.time}</span>
            <div className={`h-2.5 w-2.5 flex-none rounded-full ${event.type === 'ai' ? 'bg-ai' : event.risk ? 'bg-risk' : 'bg-text-secondary/30'}`} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-medium text-text-primary">{event.title}</p>
              <p className="truncate text-[10px] font-medium text-text-secondary">
                {event.type === 'ai' ? `AI 조정 · ${getStatusLabel(event)}` : event.sub}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function getStatusLabel(event) {
  if (event.status === 'accepted') return '수용됨';
  if (event.moved) return '시간 이동됨';
  if (event.status === 'snoozed') return '다시 보기';
  return '제안됨';
}
