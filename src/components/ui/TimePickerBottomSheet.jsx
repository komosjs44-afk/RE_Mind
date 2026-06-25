import { useState, useMemo } from 'react';
import BottomSheet from './BottomSheet';
import Button from './Button';

// 30분 단위 시간 슬롯 생성 (06:00 ~ 23:30)
function generateSlots() {
  const slots = [];
  for (let h = 6; h <= 23; h++) {
    slots.push(`${String(h).padStart(2, '0')}:00`);
    if (h < 23) slots.push(`${String(h).padStart(2, '0')}:30`);
  }
  return slots;
}

function parseMinutes(timeStr) {
  if (!timeStr) return 9999;
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
}

function detectConflict(selectedTime, calendarEvents = [], excludeId = null) {
  const selMin = parseMinutes(selectedTime);
  return calendarEvents.find((event) => {
    if (event.id === excludeId) return false;
    const startMin = parseMinutes(event.time);
    const endMin = event.endTime ? parseMinutes(event.endTime) : startMin + 60;
    return selMin >= startMin && selMin < endMin;
  });
}

const ALL_SLOTS = generateSlots();

export default function TimePickerBottomSheet({ open, onClose, recommendation, calendarEvents = [], onConfirm }) {
  const [selected, setSelected] = useState(recommendation?.time ?? '09:00');
  const [confirming, setConfirming] = useState(false);

  const conflict = useMemo(
    () => detectConflict(selected, calendarEvents, recommendation?.id),
    [selected, calendarEvents, recommendation],
  );

  const handleConfirm = async () => {
    if (confirming) return;
    setConfirming(true);
    try {
      await onConfirm(selected);
      onClose();
    } finally {
      setConfirming(false);
    }
  };

  return (
    <BottomSheet open={open} onClose={onClose} title="시간 이동">
      <div className="mb-3">
        <p className="text-[13px] font-semibold text-text-primary">{recommendation?.title}</p>
        <p className="mt-1 text-[12px] text-text-secondary">
          원하는 시작 시간을 선택하세요. 기존 일정과 겹치는 시간대는 표시됩니다.
        </p>
      </div>

      {/* 시간 슬롯 그리드 */}
      <div className="no-scrollbar max-h-[260px] overflow-y-auto">
        <div className="grid grid-cols-4 gap-1.5 pb-1">
          {ALL_SLOTS.map((slot) => {
            const slotConflict = detectConflict(slot, calendarEvents, recommendation?.id);
            const isSelected = slot === selected;
            const isCurrent = slot === recommendation?.time;

            return (
              <button
                key={slot}
                className={[
                  'relative flex flex-col items-center rounded-[14px] px-1 py-2.5 text-center transition-all active:scale-[0.96]',
                  isSelected
                    ? 'bg-navy text-white shadow-sm'
                    : slotConflict
                      ? 'bg-risk-soft text-risk'
                      : 'bg-bg text-text-primary',
                ].join(' ')}
                onClick={() => setSelected(slot)}
              >
                <span className="text-[13px] font-semibold">{slot}</span>
                {isCurrent && !isSelected && (
                  <span className="mt-0.5 text-[9px] font-medium opacity-60">현재</span>
                )}
                {slotConflict && (
                  <span className="mt-0.5 truncate text-[9px] font-medium leading-tight opacity-70">
                    {slotConflict.title}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 선택된 시간 요약 + 충돌 경고 */}
      <div className={`mt-3 rounded-[18px] p-3.5 ${conflict ? 'bg-risk-soft' : 'bg-healthy-soft'}`}>
        <div className="flex items-center gap-2">
          <i className={`ti ti-${conflict ? 'alert-triangle' : 'check'} text-[15px] ${conflict ? 'text-risk' : 'text-healthy'}`} />
          <p className={`text-[13px] font-semibold ${conflict ? 'text-risk' : 'text-healthy'}`}>
            {selected} 선택됨
          </p>
        </div>
        {conflict ? (
          <p className="mt-1 text-[12px] leading-relaxed text-risk/80">
            이 시간에 <span className="font-semibold">'{conflict.title}'</span> 일정이 있습니다.
            그래도 이 시간으로 배치하려면 아래에서 확정하세요.
          </p>
        ) : (
          <p className="mt-1 text-[12px] leading-relaxed text-healthy/80">
            기존 일정과 충돌하지 않습니다.
          </p>
        )}
      </div>

      {/* 캘린더 이벤트 범례 */}
      {calendarEvents.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {calendarEvents.map((e) => (
            <span key={e.id ?? e.title} className="rounded-full bg-warning-soft px-2 py-1 text-[10px] font-medium text-warning">
              {e.time} {e.title}
            </span>
          ))}
        </div>
      )}

      <div className="mt-4 grid gap-2">
        <Button
          variant="primary"
          icon={conflict ? 'alert-triangle' : 'calendar-plus'}
          className={`w-full ${conflict ? 'bg-risk' : ''}`}
          onClick={handleConfirm}
        >
          {confirming ? '반영 중...' : conflict ? '충돌 무시하고 이 시간으로 확정' : `${selected}으로 캘린더에 반영`}
        </Button>
        <Button variant="secondary" className="w-full" onClick={onClose}>
          취소
        </Button>
      </div>
    </BottomSheet>
  );
}
