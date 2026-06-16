import RiskRadial from './RiskRadial';
import Pill from '../ui/Pill';
import Button from '../ui/Button';
import { getRiskTier } from '../../utils/riskTier';

export default function HeroRiskCard({ prediction, onAccept }) {
  const { currentRiskScore, predictedPeakRiskTime, mainRiskFactors } = prediction;
  const tier = getRiskTier(currentRiskScore);
  const factorLabels = mainRiskFactors.slice(0, 3).map((factor) => getFactorLabel(factor.source));

  return (
    <section className="mx-4 mt-4 rounded-lg bg-navy p-6 text-white shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <Pill tone="white" icon="sparkles">오늘 위험 판단</Pill>
        <span className={`text-[11px] font-semibold uppercase ${tier.color}`}>{tier.label}</span>
      </div>

      <div className="mt-4 flex items-center gap-4">
        <RiskRadial score={currentRiskScore} dark />
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-semibold leading-snug text-white">
            오늘 {predictedPeakRiskTime}에 과부하 가능성이 높아요.
          </p>
          <p className="mt-3 text-[13px] leading-relaxed text-white/75">
            분석은 숫자를 보여주려는 용도가 아니라, 지금 어떤 일정을 조정해야 하는지 판단하기 위한 근거입니다.
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {factorLabels.map((label) => (
          <Pill key={label} tone="white">{label}</Pill>
        ))}
      </div>
      <Button variant="ai" className="mt-5 w-full" icon="calendar-plus" onClick={onAccept}>
        오늘 행동 일정에 추가
      </Button>
    </section>
  );
}

function getFactorLabel(source) {
  const labels = {
    health: '수면/컨디션 신호',
    screentime: '야간 스크린타임',
    calendar: '회의 과밀',
  };

  return labels[source] || '행동 패턴';
}
