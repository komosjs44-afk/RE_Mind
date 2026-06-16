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
    `확보된 집중 가능 시간 ${calendarData.focusTimeAvailable}`,
    '수면, 스크린타임, 일정 과밀 신호가 같은 시간대에 겹침',
  ];

  return (
    <section className="mx-4 mt-3 rounded-lg border border-risk/15 bg-card shadow-sm">
      <div className="bg-risk-soft px-4 py-4 rounded-t-lg">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wide text-risk">AI Risk Window</span>
            <h2 className="mt-1 text-[22px] font-semibold leading-tight text-text-primary">
              {prediction.predictedPeakRiskTime}
            </h2>
            <p className="mt-2 text-[13px] leading-relaxed text-text-secondary">
              이 시간대에 집중이 흐트러질 가능성이 높아요. 짧은 회복 블록을 넣으면 오후 과부하를 낮출 수 있습니다.
            </p>
          </div>
          <div className="rounded-md bg-card px-3 py-2 text-center">
            <p className="text-[10px] font-semibold text-text-secondary">Risk</p>
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
      </div>

      <div className="px-4 py-4">
        <div className="rounded-md bg-ai-soft p-3">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-ai">AI 조언</p>
          <p className="mt-1 text-[14px] font-semibold text-text-primary">
            {intervention?.title || '20분 회복 블록 삽입'}
          </p>
          <p className="mt-1 text-[12px] leading-relaxed text-text-secondary">
            {intervention?.time || '15:30'}에 회복 행동을 넣고 방해 알림을 줄이는 제안입니다.
          </p>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <button
            className="min-h-11 rounded-md bg-navy px-3 text-[12px] font-semibold text-white"
            onClick={() => intervention && onAccept(intervention.id)}
          >
            일정에 반영
          </button>
          <button
            className={`min-h-11 rounded-md px-3 text-[12px] font-semibold ${focusModeOn ? 'bg-healthy-soft text-healthy' : 'bg-bg text-text-primary'}`}
            onClick={onFocusMode}
          >
            {focusModeOn ? '집중 모드 켜짐' : '집중 모드 켜기'}
          </button>
        </div>
        {intervention && (
          <button className="mt-2 min-h-9 w-full rounded-md bg-bg text-[12px] font-medium text-text-secondary" onClick={() => onDelay(intervention.id)}>
            15분 뒤 다시 보기
          </button>
        )}
      </div>
    </section>
  );
}
