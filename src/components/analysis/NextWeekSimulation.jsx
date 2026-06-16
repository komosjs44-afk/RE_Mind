import RiskRadial from '../home/RiskRadial';
import { burnoutReport } from '../../data/schedule';

export default function NextWeekSimulation({ prediction }) {
  const { currentRiskScore, riskAfterIntervention, preventionImpactScore } = prediction;
  const evidence = [
    '이번 주 수·목 위험도 상승 패턴',
    '오후 회의 밀도와 연속 회의 블록',
    '수면 감소와 야간 스크린타임 증가',
  ];

  return (
    <section className="mx-4 mt-4 rounded-lg bg-navy p-6 text-white shadow-sm">
      <span className="text-[11px] font-semibold uppercase tracking-wide text-white/60">Next Week Simulation</span>

      <div className="mt-4 flex justify-center">
        <RiskRadial score={currentRiskScore} targetScore={riskAfterIntervention} dark size={160} />
      </div>

      <div className="mt-5 flex items-center justify-center gap-6 text-center">
        <div>
          <p className="text-[10px] font-medium uppercase text-white/50">Without Intervention</p>
          <p className="mt-1 text-[20px] font-bold text-risk">{currentRiskScore}</p>
        </div>
        <div>
          <p className="text-[10px] font-medium uppercase text-white/50">With Intervention</p>
          <p className="mt-1 text-[20px] font-bold text-warning">{riskAfterIntervention}</p>
        </div>
        <div>
          <p className="text-[10px] font-medium uppercase text-white/50">AI 적용 시</p>
          <p className="mt-1 text-[20px] font-bold text-ai">-{preventionImpactScore}</p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-5 gap-1.5">
        {burnoutReport.nextWeekPrediction.map((item) => (
          <div key={item.day} className="rounded-md bg-white/10 px-1 py-2 text-center">
            <p className="text-[10px] font-medium text-white/60">{item.day}</p>
            <p className="mt-1 text-[14px] font-semibold text-white">{item.score}</p>
            <p className="mt-0.5 text-[9px] font-medium text-white/50">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-md bg-white/10 p-3">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-white/60">근거 기반 시뮬레이션</p>
        <div className="mt-2 flex flex-col gap-2">
          {evidence.map((item) => (
            <div key={item} className="flex items-start gap-2 text-[12px] font-medium text-white/75">
              <i className="ti ti-point-filled mt-0.5 text-ai" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
