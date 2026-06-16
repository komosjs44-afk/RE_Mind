export default function AIInsertedBlock({ event, style }) {
  return (
    <article
      className="z-30 min-h-0 rounded-md border border-ai/30 bg-ai-soft px-3 py-2 shadow-sm"
      style={style}
    >
      <div className="flex items-center justify-between gap-2">
        <p className="text-[10px] font-semibold uppercase leading-snug tracking-wide text-ai">AI Intervention</p>
        <span className="flex-none rounded-full bg-ai px-2 py-0.5 text-[9px] font-medium text-white">
          {getStatusLabel(event)}
        </span>
      </div>
      <p className="mt-1 break-keep text-[13px] font-semibold leading-snug text-text-primary">{event.title}</p>
      <p className="mt-0.5 break-keep text-[10px] font-medium leading-snug text-ai/80">
        {event.time}
        {event.endTime ? `~${event.endTime}` : ''}
        {event.moved ? ` · ${event.originalTime}에서 조정` : ''}
      </p>
      <div className="mt-1.5 flex flex-wrap gap-2">
        <span className="rounded-full bg-card px-2 py-0.5 text-[9px] font-medium text-ai">Stress -9%</span>
        <span className="rounded-full bg-card px-2 py-0.5 text-[9px] font-medium text-ai">Focus +12%</span>
      </div>
    </article>
  );
}

function getStatusLabel(event) {
  if (event.status === 'accepted') return 'Accepted';
  if (event.status === 'snoozed') return 'Snoozed';
  if (event.moved) return 'Moved';
  return 'AI';
}
