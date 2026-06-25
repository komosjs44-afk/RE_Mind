const FATIGUE_LABEL = ['', '매우 낮음', '낮음', '보통', '높음', '매우 높음'];

export default function HealthcareStatus({ data }) {
  const connected = Boolean(data?.source === 'healthkit');
  const sleepWarn = data?.sleepHours < 6;
  const stepsOk = data?.steps >= 5000;

  return (
    <article className="mx-4 mt-3 rounded-[24px] border border-border bg-card p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-text-secondary">건강 데이터</p>
          <h3 className="mt-1 text-[18px] font-semibold leading-snug text-text-primary">
            {sleepWarn
              ? '수면 부족 상태로 오늘 일정이 더 부담될 수 있습니다'
              : '오늘 컨디션은 일정 실행에 무리 없는 수준입니다'}
          </h3>
          <p className="mt-2 text-[12px] leading-relaxed text-text-secondary">
            {connected ? 'Apple Health에서 자동으로 동기화됩니다.' : '수동 입력 데이터를 기반으로 분석합니다.'}
          </p>
        </div>
        <span className={`rounded-full px-3 py-1 text-[11px] font-semibold ${connected ? 'bg-ai-soft text-ai' : 'bg-card text-text-secondary'}`}>
          {connected ? '연동됨' : '수동'}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <MetricCard
          icon="moon"
          label="수면"
          value={data ? `${data.sleepHours}h` : '-'}
          note={data?.sleepHours < 6 ? '권장 7h보다 짧습니다' : '수면 시간 양호합니다'}
          tone={sleepWarn ? 'text-warning' : 'text-healthy'}
        />
        <MetricCard
          icon="walk"
          label="걸음 수"
          value={data ? `${data.steps.toLocaleString()}보` : '-'}
          note={stepsOk ? '활동량이 충분합니다' : '활동량이 낮습니다'}
          tone={stepsOk ? 'text-healthy' : 'text-text-secondary'}
        />
        {data?.fatigueLevel != null && (
          <MetricCard
            icon="battery-3"
            label="피로도"
            value={`${data.fatigueLevel}/5`}
            note={FATIGUE_LABEL[data.fatigueLevel]}
            tone={data.fatigueLevel >= 4 ? 'text-risk' : 'text-text-secondary'}
          />
        )}
        <div className="rounded-[18px] bg-bg px-3 py-3">
          <div className="flex items-center gap-1.5">
            <i className="ti ti-heart text-[14px] text-ai" />
            <span className="text-[11px] font-medium text-text-secondary">Apple Health</span>
          </div>
          <p className={`mt-2 text-[14px] font-semibold ${connected ? 'text-ai' : 'text-text-secondary'}`}>
            {connected ? '연동됨' : '미연결'}
          </p>
          <p className="mt-1 text-[10px] leading-snug text-text-secondary">
            {connected ? '자동 동기화 중' : '연동하면 자동 분석'}
          </p>
        </div>
      </div>
    </article>
  );
}

function MetricCard({ icon, label, value, note, tone }) {
  return (
    <div className="rounded-[18px] bg-bg px-3 py-3">
      <div className="flex items-center gap-1.5">
        <i className={`ti ti-${icon} text-[14px] ${tone}`} />
        <span className="text-[11px] font-medium text-text-secondary">{label}</span>
      </div>
      <p className={`mt-2 text-[15px] font-semibold ${tone}`}>{value}</p>
      <p className="mt-1 text-[10px] leading-snug text-text-secondary">{note}</p>
    </div>
  );
}
