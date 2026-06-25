export default function EvidenceReasoningCard({ prediction, healthData, dataSources, intervention }) {
  const calendarSource = dataSources?.find((s) => s.id === 'google-calendar');
  const healthSource = dataSources?.find((s) => s.id === 'apple-health');
  const academicSource = dataSources?.find((s) => s.id === 'academic-tasks');
  const isAccepted = intervention?.status === 'accepted';
  const baselineRisk = prediction?.baselineRiskScore || prediction?.currentRiskScore || 75;

  const steps = [
    {
      icon: 'heart',
      label: '컨디션',
      title: `수면 ${healthData?.sleepHours ?? '-'}h · 걸음 ${healthData?.steps?.toLocaleString() ?? '-'}보`,
      body: `${healthSource?.source || 'Apple Health'} 기준으로 회복 여력이 낮습니다. 같은 일정도 오늘은 더 부담됩니다.`,
      tone: 'risk',
    },
    {
      icon: 'calendar-time',
      label: '일정 압박',
      title: `${prediction?.predictedPeakRiskTime ?? '18:00~23:00'} 과부하 구간`,
      body: `${calendarSource?.source || 'Google Calendar'} 기준으로 알바·수업이 겹쳐 자유 시간이 없습니다.`,
      tone: 'warning',
    },
    {
      icon: 'school',
      label: '학사 마감',
      title: academicSource?.usedSignals?.slice(0, 2).join(' · ') || '시험 D-3 · 과제 D-2',
      body: `${academicSource?.source || '학사 일정'} 기준으로 마감 전 준비 시간이 오늘 확보되어야 합니다.`,
      tone: 'ai',
    },
    {
      icon: 'sparkles',
      label: 'AI 재설계',
      title: isAccepted
        ? `과부하 지수 ${baselineRisk} → ${prediction?.currentRiskScore ?? '-'}`
        : `추천 수락 시 과부하 지수 ${baselineRisk} → ${prediction?.riskAfterIntervention ?? '-'}`,
      body: isAccepted
        ? `${intervention?.title || 'AI 추천'}이 캘린더에 반영됐습니다.`
        : `${intervention?.title || 'AI 추천'}을 수락하면 오늘 일정 실행 가능성이 올라갑니다.`,
      tone: 'ai',
    },
  ];

  return (
    <section className="mx-4 mt-3 rounded-[24px] border border-border bg-card p-5 shadow-sm">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-text-secondary">판단 흐름</p>
      <h2 className="mt-1 text-[18px] font-semibold text-text-primary">왜 지금 일정 재설계가 필요한가</h2>
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
