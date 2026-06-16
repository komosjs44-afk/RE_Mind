import { getRiskTier } from '../../utils/riskTier';

export default function HealthcareStatus({ data, prediction }) {
  const tier = getRiskTier(prediction.currentRiskScore);
  const stats = [
    { label: '수면', value: `${data.sleepHours}h`, icon: 'moon' },
    { label: '스트레스', value: data.restingHeartRate, icon: 'heartbeat' },
    { label: '걸음수', value: data.steps.toLocaleString(), icon: 'walk' },
    { label: '에너지', value: data.energyScore, icon: 'battery-3' },
  ];

  return (
    <section className="mx-4 mt-5 rounded-[24px] border border-border bg-card p-5 shadow-[0_4px_20px_rgba(43,47,56,0.05)]">
      <div className="flex items-center justify-between gap-3">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wide text-text-secondary">오늘의 위험 요약</span>
          <p className="mt-1 text-[14px] font-semibold leading-snug text-text-primary">오늘은 회복 우선일입니다.</p>
        </div>
        <span className={`flex-none text-[15px] font-semibold ${tier.color}`}>{prediction.currentRiskScore}</span>
      </div>

      <div className="mt-3 flex items-center justify-between">
        {stats.map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <i className={`ti ti-${item.icon} text-[14px] text-text-secondary`} />
            <div className="leading-tight">
              <p className="text-[12px] font-medium text-text-primary">{item.value}</p>
              <p className="text-[9px] font-medium text-text-secondary">{item.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
