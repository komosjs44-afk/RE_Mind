export default function CalendarEventBlock({ event, style }) {
  const focusDemand = event.risk ? 'High' : event.title.includes('집중') ? 'Medium' : 'Low';
  const fatigue = event.risk ? 'Medium' : 'Low';

  return (
    <article
      className={`z-20 min-h-0 rounded-md border bg-card px-4 py-2.5 shadow-sm ${event.risk ? 'border-risk/35' : 'border-border'}`}
      style={style}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="break-keep text-[13px] font-semibold leading-snug text-text-primary">{event.title}</p>
          <p className="mt-0.5 break-keep text-[11px] font-medium leading-snug text-text-secondary">
            {event.time}
            {event.sub ? ` · ${event.sub}` : ''}
          </p>
        </div>
        {event.risk && (
          <span className="flex-none rounded-full bg-risk-soft px-2 py-0.5 text-[10px] font-semibold text-risk">Risk</span>
        )}
      </div>
      <div className="mt-1.5 flex flex-wrap gap-1.5">
        <Meta label="Focus" value={focusDemand} risk={focusDemand === 'High'} />
        <Meta label="Fatigue" value={fatigue} risk={fatigue === 'Medium'} />
      </div>
    </article>
  );
}

function Meta({ label, value, risk }) {
  return (
    <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-medium ${risk ? 'bg-warning-soft text-warning' : 'bg-bg text-text-secondary'}`}>
      {label}: {value}
    </span>
  );
}
