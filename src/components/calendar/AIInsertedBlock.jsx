export default function AIInsertedBlock({ event, style }) {
  const isRecovery = event.title?.includes('Recovery') || event.title?.includes('회복') || event.title?.includes('산책');
  const containerClass = isRecovery
    ? 'border-healthy/45 bg-healthy-soft'
    : 'border-ai/35 bg-ai-soft';
  const accentClass = isRecovery ? 'text-healthy' : 'text-ai';
  const badgeClass = isRecovery ? 'bg-healthy text-white' : 'bg-ai text-white';

  return (
    <article
      className={`z-30 min-h-0 rounded-[18px] border px-3 py-2 shadow-sm ${containerClass}`}
      style={style}
    >
      <div className="flex items-center justify-between gap-2">
        <p className={`text-[10px] font-semibold uppercase leading-snug tracking-wide ${accentClass}`}>
          {isRecovery ? 'Recovery Block' : 'AI 개입'}
        </p>
        <span className={`flex-none rounded-full px-2 py-0.5 text-[9px] font-semibold ${badgeClass}`}>
          {getStatusLabel(event)}
        </span>
      </div>
      <p className="mt-1 break-keep text-[13px] font-semibold leading-snug text-text-primary">{event.title}</p>
      <p className={`mt-0.5 break-keep text-[10px] font-medium leading-snug ${accentClass}`}>
        {event.time}
        {event.endTime ? `~${event.endTime}` : ''}
        {event.moved ? ` · ${event.originalTime}에서 조정` : ''}
      </p>
      <div className="mt-1.5 flex flex-wrap gap-2">
        <span className={`rounded-full bg-card px-2 py-0.5 text-[9px] font-medium ${accentClass}`}>스트레스 위험 -9%</span>
        <span className={`rounded-full bg-card px-2 py-0.5 text-[9px] font-medium ${accentClass}`}>집중 유지 +12%</span>
      </div>
    </article>
  );
}

function getStatusLabel(event) {
  if (event.status === 'accepted') return '수용됨';
  if (event.status === 'snoozed') return '다시 알림';
  if (event.moved) return '조정됨';
  return '추천';
}
