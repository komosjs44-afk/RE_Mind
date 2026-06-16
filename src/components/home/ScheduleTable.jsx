const statusLabel = {
  accepted: '수용됨',
  snoozed: '조정됨',
  dismissed: '제외됨',
  pending: '제안',
  active: '대기',
};

export default function ScheduleTable({ events, onAccept, onMove, onDelay }) {
  return (
    <section className="mx-4 mt-5 rounded-[24px] border border-border bg-card p-5 shadow-[0_4px_20px_rgba(43,47,56,0.05)]">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-text-secondary">오늘 스케줄 표</span>
        <span className="text-[11px] font-medium text-text-secondary">{events.length}개 일정</span>
      </div>

      <div className="mt-3 overflow-hidden rounded-lg border border-border">
        {events.map((event) => {
          const isAi = event.type === 'ai';
          return (
            <div key={`${event.id || event.title}-${event.time}`} className="grid grid-cols-[50px_1fr] gap-2 border-b border-border bg-card px-3 py-2.5 last:border-b-0">
              <div className="text-[12px] font-medium text-text-primary">{event.time}</div>
              <div className="min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-[13px] font-medium text-text-primary">{event.title}</p>
                    <p className="mt-0.5 truncate text-[11px] font-medium text-text-secondary">
                      {isAi ? event.expectedEffect : event.sub}
                    </p>
                  </div>
                  {isAi && (
                    <span className="flex-none rounded-full bg-ai-soft px-2 py-1 text-[10px] font-medium text-ai">
                      {statusLabel[event.status] || '제안'}
                    </span>
                  )}
                </div>

                {isAi && (
                  <div className="mt-2 rounded-md bg-bg px-3 py-2">
                    <p className="line-clamp-2 text-[11px] font-medium leading-relaxed text-text-secondary">AI 조언: {event.reason}</p>
                    <div className="mt-2 flex items-center gap-3">
                      {event.status === 'accepted' ? (
                        <span className="text-[11px] font-semibold text-ai">일정에 반영됨</span>
                      ) : (
                        <>
                          <button className="text-[11px] font-medium text-navy" onClick={() => onAccept(event.id)}>
                            수용
                          </button>
                          <button className="text-[11px] font-medium text-text-secondary" onClick={() => onMove(event.id, event.alternatives?.[0] || '14:00')}>
                            이동
                          </button>
                          <button className="text-[11px] font-medium text-text-secondary" onClick={() => onDelay(event.id)}>
                            15분 조정
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
