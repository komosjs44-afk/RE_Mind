export default function AnalysisBasis({ healthData, calendarData, interventions, onGoHome }) {
  const acceptedCount = interventions.filter((item) => item.status === 'accepted').length;
  const movedCount = interventions.filter((item) => item.moved).length;

  const criteria = [
    `수면 ${healthData.sleepHours}h / 수면 부채 ${healthData.sleepDebt}h`,
    `안정 심박 ${healthData.restingHeartRate}, HRV ${healthData.hrv}ms`,
    `오늘 회의 ${calendarData.meetingCount}개 / 연속 회의 블록 ${calendarData.continuousMeetingBlocks}개`,
    `집중 가능 시간 ${calendarData.focusTimeAvailable}, 위험 시간대 ${calendarData.overloadTimeRange}`,
  ];

  return (
    <section className="mx-4 mt-4 rounded-lg border border-border bg-card p-6 shadow-sm">
      <span className="text-[11px] font-semibold uppercase tracking-wide text-text-secondary">분석 기준</span>
      <h2 className="mt-2 text-[16px] font-semibold text-text-primary">건강 데이터와 일정 데이터를 함께 봤어요</h2>
      <div className="mt-3 rounded-lg bg-bg p-4">
        <p className="text-[11px] font-semibold text-text-secondary">위험 원인 산정 기준</p>
        <div className="mt-3 flex flex-col gap-2">
          {criteria.map((item) => (
            <p key={item} className="text-[13px] font-medium text-text-primary">
              <i className="ti ti-point-filled mr-2 text-ai" />
              {item}
            </p>
          ))}
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <Metric label="수용한 개입" value={`${acceptedCount}개`} />
        <Metric label="이동한 일정" value={`${movedCount}개`} />
      </div>
      <button className="mt-4 h-11 w-full rounded-lg bg-navy text-[13px] font-semibold text-white" onClick={onGoHome}>
        추천 행동으로 이동
      </button>
    </section>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-lg bg-bg px-3 py-3">
      <p className="text-[11px] font-semibold text-text-secondary">{label}</p>
      <p className="mt-1 text-[16px] font-semibold text-text-primary">{value}</p>
    </div>
  );
}
