import RiskDelta from '../home/RiskDelta';
import RiskRadial from '../home/RiskRadial';
import { conditionReport } from '../../data/schedule';

export default function NextWeekSimulation({ prediction }) {
  const currentScore = prediction?.currentRiskScore ?? 75;
  const afterScore = prediction?.riskAfterIntervention ?? 55;

  return (
    <section className="mx-4 mt-3 rounded-[28px] bg-navy p-5 text-white shadow-sm">
      <span className="text-[11px] font-semibold uppercase tracking-wide text-white/60">다음 주 일정 과부하 시뮬레이션</span>

      <div className="mt-4 flex items-center justify-between gap-4">
        <RiskRadial score={currentScore} targetScore={afterScore} dark size={142} />
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-semibold leading-snug">
            AI 추천 일정을 적용하면 다음 주 과부하를 낮출 수 있습니다.
          </p>
          <div className="mt-3">
            <RiskDelta before={currentScore} after={afterScore} size="lg" />
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-5 gap-1.5">
        {conditionReport.nextWeekPrediction.map((item) => (
          <div key={item.day} className="rounded-[16px] bg-white/10 px-1 py-2 text-center">
            <p className="text-[10px] font-medium text-white/60">{item.day}</p>
            <p className="mt-1 text-[14px] font-semibold text-white">{item.score}</p>
            <p className="mt-0.5 text-[9px] font-medium text-white/50">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-[18px] bg-white/10 p-3">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-white/60">AI 추천 적용 시 예상 효과</p>
        <div className="mt-2 grid gap-2">
          {conditionReport.preventionEffects.map((item) => (
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
