import RiskDelta from '../home/RiskDelta';
import RiskRadial from '../home/RiskRadial';
import { burnoutReport } from '../../data/schedule';

export default function NextWeekSimulation({ prediction }) {
  const { currentRiskScore, riskAfterIntervention } = prediction;

  return (
    <section className="mx-4 mt-3 rounded-[28px] bg-navy p-5 text-white shadow-sm">
      <span className="text-[11px] font-semibold uppercase tracking-wide text-white/60">다음 주 예측</span>

      <div className="mt-4 flex items-center justify-between gap-4">
        <RiskRadial score={currentRiskScore} targetScore={riskAfterIntervention} dark size={142} />
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-semibold leading-snug">Recovery Block을 적용하면 피크 위험을 낮출 수 있습니다.</p>
          <div className="mt-3">
            <RiskDelta before={currentRiskScore} after={riskAfterIntervention} size="lg" />
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-5 gap-1.5">
        {burnoutReport.nextWeekPrediction.map((item) => (
          <div key={item.day} className="rounded-[16px] bg-white/10 px-1 py-2 text-center">
            <p className="text-[10px] font-medium text-white/60">{item.day}</p>
            <p className="mt-1 text-[14px] font-semibold text-white">{item.score}</p>
            <p className="mt-0.5 text-[9px] font-medium text-white/50">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-[18px] bg-white/10 p-3">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-white/60">근거 기반 시뮬레이션</p>
        <div className="mt-2 grid gap-2">
          {burnoutReport.preventionEffects.map((item) => (
            <div key={item.action} className="flex items-center justify-between gap-3 text-[12px] font-medium text-white/78">
              <span>{item.action}</span>
              <span className="font-semibold text-ai">{item.effect}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
