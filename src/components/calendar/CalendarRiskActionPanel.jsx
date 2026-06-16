import Button from '../ui/Button';

export default function CalendarRiskActionPanel({
  prediction,
  calendarData,
  intervention,
  focusModeOn,
  onAccept,
  onDelay,
  onFocusMode,
}) {
  const riskReasons = [
    `${calendarData.continuousMeetingBlocks}개 연속 회의 블록`,
    `집중 가능 시간 ${calendarData.focusTimeAvailable}`,
    '수면, 스크린 타임, 일정 과밀 신호가 같은 시간대에 겹침',
  ];

  return (
    <section className="mx-4 mt-3 rounded-[24px] border border-risk/20 bg-card p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wide text-risk">위험 시간대</span>
          <h2 className="mt-1 text-[22px] font-semibold leading-tight text-text-primary">
            {prediction.predictedPeakRiskTime}
          </h2>
          <p className="mt-2 text-[13px] leading-relaxed text-text-secondary">
            이 구간은 집중 붕괴 가능성이 높습니다. 타임라인의 붉은 오버레이로 위험 범위를 표시했습니다.
          </p>
        </div>
        <div className="rounded-[18px] bg-risk-soft px-3 py-2 text-center">
          <p className="text-[10px] font-semibold text-risk">위험도</p>
          <p className="text-[24px] font-semibold text-risk">{prediction.currentRiskScore}</p>
        </div>
      </div>

      <div className="mt-3 grid gap-1.5">
        {riskReasons.map((reason) => (
          <p key={reason} className="flex items-start gap-2 text-[12px] font-medium text-text-primary">
            <i className="ti ti-alert-circle mt-0.5 text-risk" />
            <span>{reason}</span>
          </p>
        ))}
      </div>

      {intervention && (
        <div className="mt-3 rounded-[18px] bg-ai-soft p-3">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-ai">AI 삽입 제안</p>
          <p className="mt-1 text-[14px] font-semibold text-text-primary">{intervention.title}</p>
          <p className="mt-1 text-[12px] leading-relaxed text-text-secondary">
            {intervention.time}에 회복 블록을 넣어 오후 위험도를 낮춥니다.
          </p>
        </div>
      )}

      <div className="mt-3 grid grid-cols-2 gap-2">
        <Button variant="primary" className="min-h-[52px]" icon="calendar-plus" onClick={() => intervention && onAccept(intervention.id)}>
          일정 반영
        </Button>
        <Button variant={focusModeOn ? 'ai' : 'secondary'} className="min-h-[52px]" icon="focus-2" onClick={onFocusMode}>
          {focusModeOn ? '집중 모드 켜짐' : '집중 모드'}
        </Button>
      </div>
      {intervention && (
        <Button variant="text" className="mt-2 min-h-10 w-full" icon="clock" onClick={() => onDelay(intervention.id)}>
          15분 뒤 다시 보기
        </Button>
      )}
    </section>
  );
}
