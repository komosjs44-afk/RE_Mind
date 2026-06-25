import { useState } from 'react';
import TimePickerBottomSheet from '../ui/TimePickerBottomSheet';

const typeIcon = { study: 'book', task: 'file-text', recovery: 'heart', focus: 'focus-2', habit: 'repeat' };

export default function PrimaryRecommendationCard({
  recommendation,
  calendarEvents,
  isRecalculating,
  onAccept,
  onMove,
  onDelay,
  onDismiss,
}) {
  const [showMore, setShowMore] = useState(false);
  const [timePickerOpen, setTimePickerOpen] = useState(false);

  if (!recommendation) return null;
  const isAccepted = recommendation.status === 'accepted';
  const icon = typeIcon[recommendation.type] || 'sparkles';

  return (
    <section className="mx-4 mt-3 rounded-[24px] border border-border bg-card p-4 shadow-sm">
      <div className="mb-3 flex items-center gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-text-secondary">대표 AI 추천</span>
        {isAccepted && (
          <span className="rounded-full bg-ai-soft px-2 py-0.5 text-[10px] font-semibold text-ai">반영됨</span>
        )}
      </div>

      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-ai-soft text-ai">
          <i className={`ti ti-${icon} text-[17px]`} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[16px] font-semibold leading-snug text-text-primary">{recommendation.title}</p>
          <p className="mt-1 text-[12px] text-text-secondary">
            {recommendation.time}
            {recommendation.endTime ? `~${recommendation.endTime}` : ''} · {recommendation.expectedEffect}
          </p>
        </div>
      </div>

      {isRecalculating && (
        <div className="mt-3 rounded-[16px] bg-ai-soft px-4 py-3 text-center">
          <p className="text-[13px] font-semibold text-ai">AI가 나머지 일정을 재설계하는 중...</p>
          <p className="mt-0.5 text-[11px] text-ai/70">잠시만 기다려주세요</p>
        </div>
      )}

      {!isRecalculating && (
        <div className="mt-4 flex gap-2">
          {!isAccepted ? (
            <>
              <button
                className="flex-1 rounded-[16px] bg-navy py-3 text-[13px] font-semibold text-white transition-all active:scale-[0.98]"
                onClick={() => onAccept(recommendation.id)}
              >
                수락
              </button>
              <button
                className="flex-1 rounded-[16px] border border-border bg-bg py-3 text-[13px] font-semibold text-text-primary transition-all active:scale-[0.98]"
                onClick={() => setTimePickerOpen(true)}
              >
                시간 이동
              </button>
              <button
                className="rounded-[16px] border border-border bg-bg px-4 py-3 text-[13px] font-semibold text-text-secondary transition-all active:scale-[0.98]"
                onClick={() => setShowMore((v) => !v)}
              >
                <i className="ti ti-dots text-[15px]" />
              </button>
            </>
          ) : (
            <button
              className="flex-1 rounded-[16px] border border-border bg-bg py-3 text-[13px] font-semibold text-text-secondary transition-all active:scale-[0.98]"
              onClick={() => setTimePickerOpen(true)}
            >
              시간 이동
            </button>
          )}
        </div>
      )}

      {showMore && !isRecalculating && (
        <div className="mt-2 grid grid-cols-2 gap-2">
          <MoreBtn icon="clock" label="15분 뒤" onClick={() => { onDelay(recommendation.id); setShowMore(false); }} />
          <MoreBtn icon="x" label="제외" tone="danger" onClick={() => { onDismiss(recommendation.id); setShowMore(false); }} />
        </div>
      )}

      <TimePickerBottomSheet
        open={timePickerOpen}
        onClose={() => setTimePickerOpen(false)}
        recommendation={recommendation}
        calendarEvents={calendarEvents ?? []}
        onConfirm={(newTime) => {
          onMove(recommendation.id, newTime);
          setTimePickerOpen(false);
        }}
      />
    </section>
  );
}

function MoreBtn({ icon, label, tone = 'default', onClick }) {
  const cls =
    tone === 'danger'
      ? 'border-risk/30 bg-risk-soft/50 text-risk'
      : 'border-border bg-bg text-text-secondary';
  return (
    <button
      className={`flex flex-col items-center gap-1 rounded-[14px] border py-2.5 transition-all active:scale-[0.96] ${cls}`}
      onClick={onClick}
    >
      <i className={`ti ti-${icon} text-[15px]`} />
      <span className="text-[10px] font-semibold">{label}</span>
    </button>
  );
}
