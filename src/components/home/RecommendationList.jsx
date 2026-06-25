import { useState } from 'react';
import Pill from '../ui/Pill';
import TimePickerBottomSheet from '../ui/TimePickerBottomSheet';

const typeIcon = { study: 'book', task: 'file-text', recovery: 'heart', focus: 'focus-2', habit: 'repeat' };

export default function RecommendationList({
  recommendations,
  calendarEvents,
  acceptRecommendation,
  moveRecommendation,
  delayRecommendation,
  dismissRecommendation,
}) {
  if (!recommendations || recommendations.length === 0) return null;

  return (
    <section className="mx-4 mt-3 rounded-[24px] border border-border bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-text-secondary">추천 일정</span>
        <Pill tone="neutral">{recommendations.length}개</Pill>
      </div>
      <div className="mt-3 grid gap-2">
        {recommendations.map((item) => (
          <RecommendationItem
            key={item.id}
            item={item}
            calendarEvents={calendarEvents}
            onAccept={acceptRecommendation}
            onMove={moveRecommendation}
            onDelay={delayRecommendation}
            onDismiss={dismissRecommendation}
          />
        ))}
      </div>
    </section>
  );
}

function RecommendationItem({ item, calendarEvents, onAccept, onMove, onDelay, onDismiss }) {
  const [expanded, setExpanded] = useState(false);
  const [timePickerOpen, setTimePickerOpen] = useState(false);
  const isAccepted = item.status === 'accepted';
  const icon = typeIcon[item.type] || 'sparkles';

  return (
    <article className="rounded-[18px] bg-bg">
      <button
        className="flex w-full items-center gap-3 px-3 py-3 text-left"
        onClick={() => setExpanded((v) => !v)}
      >
        <div className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-card text-ai">
          <i className={`ti ti-${icon} text-[15px]`} />
        </div>
        <div className="min-w-0 flex-1">
          <p className={`truncate text-[13px] font-semibold ${isAccepted ? 'text-ai' : 'text-text-primary'}`}>
            {item.title}
          </p>
          <p className="mt-0.5 text-[11px] text-text-secondary">
            {item.time}{item.endTime ? `~${item.endTime}` : ''} · {item.expectedEffect}
          </p>
        </div>
        {isAccepted ? (
          <span className="flex-none rounded-full bg-ai-soft px-2 py-1 text-[11px] font-semibold text-ai">반영됨</span>
        ) : (
          <i className={`ti ti-chevron-${expanded ? 'up' : 'down'} flex-none text-[14px] text-text-secondary`} />
        )}
      </button>

      {expanded && !isAccepted && (
        <div className="border-t border-border/50 px-3 pb-3 pt-2">
          <p className="text-[12px] leading-relaxed text-text-secondary">{item.reason}</p>
          <div className="mt-3 flex gap-1.5">
            <ActionBtn icon="calendar-plus" label="수락" tone="primary" onClick={() => onAccept(item.id)} />
            <ActionBtn icon="clock-edit" label="시간 이동" onClick={() => setTimePickerOpen(true)} />
            <ActionBtn icon="clock" label="15분 뒤" onClick={() => onDelay(item.id)} />
            <ActionBtn icon="x" label="제외" onClick={() => onDismiss(item.id)} />
          </div>
        </div>
      )}

      <TimePickerBottomSheet
        open={timePickerOpen}
        onClose={() => setTimePickerOpen(false)}
        recommendation={item}
        calendarEvents={calendarEvents ?? []}
        onConfirm={(newTime) => {
          onMove(item.id, newTime);
          setTimePickerOpen(false);
        }}
      />
    </article>
  );
}

function ActionBtn({ icon, label, tone = 'default', onClick }) {
  return (
    <button
      className={`flex flex-1 flex-col items-center gap-0.5 rounded-[14px] py-2 text-center transition-all active:scale-[0.96] ${tone === 'primary' ? 'bg-navy text-white' : 'bg-card text-text-secondary'}`}
      onClick={onClick}
    >
      <i className={`ti ti-${icon} text-[15px]`} />
      <span className="text-[9px] font-semibold">{label}</span>
    </button>
  );
}
