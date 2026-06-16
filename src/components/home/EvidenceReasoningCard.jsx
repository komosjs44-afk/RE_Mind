export default function EvidenceReasoningCard({ prediction, healthData, dataSources, intervention }) {
  const calendarSource = dataSources.find((source) => source.id === 'google-calendar');
  const healthSource = dataSources.find((source) => source.id === 'samsung-health');
  const screenSource = dataSources.find((source) => source.id === 'screen-time');
  const isAccepted = intervention?.status === 'accepted';
  const baselineRisk = prediction.baselineRiskScore || prediction.currentRiskScore;
  const steps = [
    {
      icon: 'heart-rate-monitor',
      label: '몸 상태',
      title: `수면 ${healthData.sleepHours}h · 스트레스 ${healthData.stressScore}점`,
      body: `${healthSource?.source || 'Health'}에서 회복 여력이 낮게 잡혔습니다. 같은 업무량도 오늘은 더 크게 부담으로 작용합니다.`,
      tone: 'risk',
    },
    {
      icon: 'calendar-time',
      label: '일정 압박',
      title: `${prediction.predictedPeakRiskTime} 회의 과밀`,
      body: `${calendarSource?.source || 'Calendar'} 기준으로 오후 일정이 연속됩니다. 쉬는 시간이 끊기면 피크 위험이 올라갑니다.`,
      tone: 'warning',
    },
    {
      icon: 'device-mobile',
      label: '집중 방해',
      title: screenSource?.usedSignals?.slice(0, 2).join(' · ') || '야간 사용 · 앱 전환 증가',
      body: `${screenSource?.source || 'Screen Time'} 신호는 수면 회복과 다음 날 집중 유지에 부담을 줍니다.`,
      tone: 'ai',
    },
    {
      icon: 'sparkles',
      label: 'AI 판단',
      title: `위험도 ${baselineRisk} → ${prediction.currentRiskScore}`,
      body: isAccepted
        ? `${intervention?.title || 'Recovery Block'}이 반영되어 피크 위험 예측이 내려갔습니다.`
        : `${intervention?.title || 'Recovery Block'}을 넣으면 피크 위험을 낮출 수 있습니다.`,
      tone: 'ai',
    },
  ];

  return (
    <section className="mx-4 mt-3 rounded-[24px] border border-border bg-card p-5 shadow-sm">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-text-secondary">판단 흐름</p>
      <h2 className="mt-1 text-[18px] font-semibold text-text-primary">왜 지금 회복 행동이 필요한가</h2>
      <div className="mt-4 grid gap-3">
        {steps.map((step, index) => (
          <ReasonStep key={step.label} step={step} index={index} isLast={index === steps.length - 1} />
        ))}
      </div>
    </section>
  );
}

function ReasonStep({ step, index, isLast }) {
  const tones = {
    risk: 'bg-risk-soft text-risk',
    warning: 'bg-warning-soft text-warning',
    ai: 'bg-ai-soft text-ai',
  };

  return (
    <div className="grid grid-cols-[32px_1fr] gap-3">
      <div className="flex flex-col items-center">
        <span className={`grid h-8 w-8 place-items-center rounded-full ${tones[step.tone]}`}>
          <i className={`ti ti-${step.icon} text-[15px]`} />
        </span>
        {!isLast && <span className="mt-2 h-full min-h-8 w-px bg-border" />}
      </div>
      <div className="pb-3">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-bg px-2 py-0.5 text-[10px] font-semibold text-text-secondary">
            {index + 1}
          </span>
          <p className="text-[11px] font-semibold text-text-secondary">{step.label}</p>
        </div>
        <p className="mt-1 text-[14px] font-semibold text-text-primary">{step.title}</p>
        <p className="mt-1 text-[12px] leading-relaxed text-text-secondary">{step.body}</p>
      </div>
    </div>
  );
}
