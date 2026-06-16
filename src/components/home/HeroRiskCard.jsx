import RiskDelta from './RiskDelta';
import RiskRadial from './RiskRadial';
import Pill from '../ui/Pill';
import Button from '../ui/Button';
import { getRiskTier } from '../../utils/riskTier';

const sourceLabels = {
  health: '수면 부족',
  screentime: '야간 사용 증가',
  calendar: '회의 과밀',
};

export default function HeroRiskCard({ prediction, intervention, onAccept }) {
  const tier = getRiskTier(prediction.currentRiskScore);
  const afterRisk = prediction.riskAfterIntervention;
  const isAccepted = intervention?.status === 'accepted';
  const baselineRisk = prediction.baselineRiskScore || prediction.currentRiskScore;

  return (
    <section className="mx-4 mt-4 rounded-[32px] bg-navy p-5 text-white shadow-[0_18px_40px_rgba(17,24,39,0.22)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <Pill tone="white" icon="sparkles">AI 위험 판단</Pill>
          <h1 className="mt-3 text-[28px] font-semibold leading-tight">
            오늘 위험도는 <span className={isAccepted ? 'text-warning' : 'text-risk'}>{prediction.currentRiskScore}</span>입니다
          </h1>
          <p className="mt-2 text-[13px] leading-relaxed text-white/72">
            {isAccepted
              ? `${intervention.title}이 일정에 반영되어 예상 위험도가 ${baselineRisk}에서 ${prediction.currentRiskScore}로 내려갔습니다.`
              : `${prediction.predictedPeakRiskTime} 사이에 집중 붕괴 가능성이 높습니다. 지금 회복 블록을 넣으면 위험도를 낮출 수 있습니다.`}
          </p>
        </div>
        <RiskRadial score={prediction.currentRiskScore} targetScore={isAccepted ? null : afterRisk} size={132} strokeWidth={11} dark />
      </div>

      <div className="mt-5 rounded-[22px] bg-white/10 p-4">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[12px] font-semibold text-white/70">{isAccepted ? '반영된 위험 변화' : '개입 후 예상 변화'}</span>
          <RiskDelta before={baselineRisk} after={isAccepted ? prediction.currentRiskScore : afterRisk} size="lg" />
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {prediction.mainRiskFactors.map((factor) => (
            <div key={factor.source} className="rounded-[18px] bg-white/10 px-3 py-2">
              <p className="text-[11px] font-semibold text-white">{sourceLabels[factor.source]}</p>
              <p className="mt-1 text-[10px] leading-snug text-white/60">{factor.detail}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase text-white/50">지금 추천 행동</p>
          <p className="mt-1 text-[15px] font-semibold">{intervention?.title || '30분 Recovery Block'}</p>
        </div>
        <span className={`rounded-full px-3 py-1 text-[11px] font-semibold ${tier.soft} ${tier.color}`}>{tier.label}</span>
      </div>

      {isAccepted ? (
        <div className="mt-4 flex min-h-[56px] items-center justify-center gap-2 rounded-[20px] bg-white text-[13px] font-semibold text-navy">
          <i className="ti ti-check" />
          일정 반영 완료
        </div>
      ) : (
        <Button variant="ai" className="mt-4 w-full bg-white text-navy hover:bg-white/90" icon="calendar-plus" onClick={() => intervention && onAccept(intervention.id)}>
          추천 행동 일정에 추가
        </Button>
      )}
    </section>
  );
}
