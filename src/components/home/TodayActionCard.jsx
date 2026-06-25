import { useState } from 'react';
import Button from '../ui/Button';
import Pill from '../ui/Pill';
import BottomSheet from '../ui/BottomSheet';
import TimePickerBottomSheet from '../ui/TimePickerBottomSheet';
import ActionReasonBottomSheet from './ActionReasonBottomSheet';

const typeLabel = { study: '공부', task: '과제', recovery: '회복', focus: '집중', habit: '루틴' };

export default function TodayActionCard({
  intervention,
  currentRiskScore,
  baselineRiskScore,
  calendarEvents,
  onAccept,
  onMove,
  onDelay,
  onDismiss,
}) {
  const [evidenceOpen, setEvidenceOpen] = useState(false);
  const [timePickerOpen, setTimePickerOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editTime, setEditTime] = useState('');

  if (!intervention) {
    return (
      <section className="mx-4 mt-3 rounded-[24px] border border-border bg-card p-5 text-center text-[13px] text-text-secondary shadow-sm">
        오늘 표시할 AI 추천 일정이 없습니다.
      </section>
    );
  }

  const status = intervention.status || 'active';
  const isAccepted = status === 'accepted';
  const isSnoozed = status === 'snoozed';
  const beforeRisk = baselineRiskScore || currentRiskScore;
  const afterRisk = Math.max(beforeRisk - (intervention.riskReduction ?? 0), 0);

  const handleTimeConfirm = async (newTime) => {
    await onMove(intervention.id, newTime);
  };

  const handleEditSave = () => {
    if (editTitle || editTime) {
      onMove(intervention.id, editTime || intervention.time, editTitle || intervention.title);
    }
    setEditOpen(false);
  };

  return (
    <section className={`mx-4 mt-3 rounded-[24px] border p-5 transition-colors ${isAccepted ? 'border-ai/20 bg-ai-soft' : 'border-border bg-card'} shadow-sm`}>

      {/* 헤더 */}
      <div className="flex items-start justify-between gap-3">
        <Pill tone={isAccepted ? 'ai' : 'neutral'} icon={isAccepted ? 'check' : 'sparkles'}>
          {isAccepted ? 'AI 일정 반영됨' : typeLabel[intervention.type] || 'AI 추천'}
        </Pill>
        {!isAccepted && (
          <span className="rounded-full bg-ai-soft px-2 py-1 text-[11px] font-semibold text-ai">
            과부하 -{intervention.riskReduction}
          </span>
        )}
      </div>

      {/* 제목 + 시간 */}
      <h2 className="mt-3 text-[22px] font-semibold leading-snug text-text-primary">{intervention.title}</h2>
      <div className="mt-1 flex items-center gap-2">
        <i className="ti ti-clock text-[13px] text-text-secondary" />
        <span className="text-[13px] font-medium text-text-secondary">
          {intervention.time}{intervention.endTime ? ` ~ ${intervention.endTime}` : ''}
        </span>
        {isSnoozed && (
          <span className="rounded-full bg-warning-soft px-2 py-0.5 text-[11px] font-semibold text-warning">
            15분 뒤 알림
          </span>
        )}
      </div>

      {/* 이유 + 근거 */}
      <p className="mt-3 text-[13px] leading-relaxed text-text-secondary">{intervention.reason}</p>
      <button
        className="mt-2 inline-flex min-h-9 items-center gap-1.5 rounded-full px-1 text-[12px] font-semibold text-ai transition-all active:scale-[0.98]"
        onClick={() => setEvidenceOpen(true)}
      >
        <i className="ti ti-info-circle" />
        판단 근거 자세히 보기
      </button>

      {/* 과부하 변화 */}
      {!isAccepted && (
        <div className="mt-3 rounded-[18px] bg-bg p-3">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[12px] font-medium text-text-secondary">수락 시 예상 변화</span>
            <div className="flex items-center gap-1.5 text-[14px] font-semibold">
              <span className="text-risk">{beforeRisk}</span>
              <i className="ti ti-arrow-right text-text-secondary text-[12px]" />
              <span className="text-healthy">{afterRisk}</span>
            </div>
          </div>
          <p className="mt-1.5 text-[11px] leading-relaxed text-text-secondary">
            근거: {intervention.evidence}
          </p>
        </div>
      )}

      {/* ── 액션 영역 ── */}
      {isAccepted ? (
        <div className="mt-4 flex items-center gap-2 text-[13px] font-semibold text-ai">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ai text-white">
            <i className="ti ti-check text-sm" />
          </span>
          Google Calendar에 반영됐습니다
        </div>
      ) : (
        <div className="mt-4 grid gap-2">
          {/* 1행: 수락 */}
          <Button variant="primary" icon="calendar-plus" className="w-full" onClick={() => onAccept(intervention.id)}>
            수락 — 캘린더에 추가
          </Button>

          {/* 2행: 시간 이동 + 미루기 */}
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="secondary"
              icon="clock-edit"
              className="min-h-[52px] w-full"
              onClick={() => setTimePickerOpen(true)}
            >
              시간 이동
            </Button>
            <Button
              variant="secondary"
              icon="clock"
              className="min-h-[52px] w-full"
              onClick={() => onDelay(intervention.id)}
            >
              15분 뒤
            </Button>
          </div>

          {/* 3행: 직접 수정 + 제외 */}
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="text"
              icon="edit"
              className="min-h-[52px] w-full"
              onClick={() => {
                setEditTitle(intervention.title);
                setEditTime(intervention.time);
                setEditOpen(true);
              }}
            >
              직접 수정
            </Button>
            <Button
              variant="text"
              icon="x"
              className="min-h-[52px] w-full text-text-secondary"
              onClick={() => onDismiss(intervention.id)}
            >
              제외
            </Button>
          </div>
        </div>
      )}

      {/* 대안 시간 힌트 */}
      {!isAccepted && intervention.alternatives?.length > 0 && (
        <div className="mt-3">
          <p className="text-[11px] font-semibold text-text-secondary">AI 추천 대안 시간</p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {intervention.alternatives.map((alt) => (
              <button
                key={alt}
                className="rounded-full bg-bg px-3 py-1.5 text-[12px] font-semibold text-ai transition-all active:scale-[0.96]"
                onClick={() => onMove(intervention.id, alt)}
              >
                {alt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* TimePicker BottomSheet */}
      <TimePickerBottomSheet
        open={timePickerOpen}
        onClose={() => setTimePickerOpen(false)}
        recommendation={intervention}
        calendarEvents={calendarEvents ?? []}
        onConfirm={handleTimeConfirm}
      />

      {/* 직접 수정 BottomSheet */}
      <BottomSheet open={editOpen} onClose={() => setEditOpen(false)} title="직접 수정">
        <div className="grid gap-3">
          <label className="block rounded-[18px] bg-bg px-4 py-3">
            <span className="text-[10px] font-semibold uppercase tracking-wide text-text-secondary">일정 이름</span>
            <input
              className="mt-1 w-full bg-transparent text-[14px] font-medium text-text-primary outline-none"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder={intervention.title}
            />
          </label>
          <label className="block rounded-[18px] bg-bg px-4 py-3">
            <span className="text-[10px] font-semibold uppercase tracking-wide text-text-secondary">시작 시간</span>
            <input
              type="time"
              className="mt-1 w-full bg-transparent text-[14px] font-medium text-text-primary outline-none"
              value={editTime}
              onChange={(e) => setEditTime(e.target.value)}
            />
          </label>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="secondary" className="min-h-[52px]" onClick={() => setEditOpen(false)}>취소</Button>
            <Button variant="primary" className="min-h-[52px]" icon="check" onClick={handleEditSave}>저장</Button>
          </div>
        </div>
      </BottomSheet>

      {/* 판단 근거 BottomSheet */}
      <BottomSheet open={evidenceOpen} onClose={() => setEvidenceOpen(false)} title="AI 판단 근거">
        <ActionReasonBottomSheet intervention={intervention} currentRiskScore={beforeRisk} />
      </BottomSheet>
    </section>
  );
}
