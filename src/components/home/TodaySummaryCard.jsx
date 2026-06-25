export default function TodaySummaryCard({ health, calendarSummary, academicTasks = [], overload }) {
  const urgentTasks = academicTasks.filter((t) => t.daysLeft <= 3);
  const riskScore = overload?.currentRiskScore ?? 0;
  const isOverload = riskScore >= 65;

  return (
    <section className="mx-4 mt-4 rounded-[28px] bg-navy p-5 text-white shadow-sm">
      <div className="flex items-center gap-2">
        <span className="rounded-full bg-ai-soft px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-ai">
          RE:Plan AI
        </span>
        <span className="text-[11px] text-white/50">{overload?.confidence ?? 82}% 신뢰도</span>
      </div>

      <h1 className="mt-3 text-[22px] font-semibold leading-tight">
        {isOverload ? '오늘 일정이 과부하 상태입니다' : '오늘 일정 밀도가 적당합니다'}
      </h1>
      <p className="mt-1 text-[13px] leading-relaxed text-white/65">
        {overload?.predictedPeakRiskTime
          ? `${overload.predictedPeakRiskTime} 구간이 가장 바쁩니다. AI가 일정을 재설계했습니다.`
          : 'AI가 오늘 하루를 분석했습니다.'}
      </p>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <Metric label="수면" value={`${health?.sleepHours ?? '—'}h`} warn={(health?.sleepHours ?? 7) < 6} />
        <Metric label="걸음수" value={(health?.steps ?? 0).toLocaleString()} />
        <Metric label="피로도" value={`${health?.fatigueLevel ?? '—'}/5`} warn={(health?.fatigueLevel ?? 0) >= 4} />
      </div>

      {urgentTasks.length > 0 && (
        <div className="mt-4 border-t border-white/15 pt-4">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-white/50">마감 임박</p>
          <div className="mt-2 grid gap-1.5">
            {urgentTasks.slice(0, 2).map((task) => (
              <div key={task.id} className="flex items-center justify-between gap-2">
                <span className="truncate text-[12px] font-medium text-white/85">{task.title}</span>
                <span className="flex-none rounded-full bg-risk px-2 py-0.5 text-[10px] font-semibold text-white">
                  D-{task.daysLeft}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function Metric({ label, value, warn = false }) {
  return (
    <div className="rounded-[18px] bg-white/10 px-3 py-2">
      <p className="text-[10px] font-medium text-white/55">{label}</p>
      <p className={`mt-1 text-[14px] font-semibold ${warn ? 'text-warning' : 'text-white'}`}>{value}</p>
    </div>
  );
}
