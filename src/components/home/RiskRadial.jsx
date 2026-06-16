import { getRiskTier } from '../../utils/riskTier';

function Arc({ size, radius, strokeWidth, value, trackClassName, arcClassName }) {
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - value / 100);

  return (
    <>
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={strokeWidth} className={trackClassName} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        className={arcClassName}
      />
    </>
  );
}

export default function RiskRadial({ score, targetScore, size = 152, strokeWidth = 12, dark = false }) {
  const outerRadius = (size - strokeWidth) / 2;
  const innerRadius = outerRadius - strokeWidth - 6;
  const tier = getRiskTier(score);
  const targetTier = targetScore != null ? getRiskTier(targetScore) : null;
  const trackClassName = dark ? 'stroke-white/15' : 'stroke-border';

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <Arc size={size} radius={outerRadius} strokeWidth={strokeWidth} value={score} trackClassName={trackClassName} arcClassName={tier.stroke} />
        {targetScore != null && (
          <Arc size={size} radius={innerRadius} strokeWidth={strokeWidth} value={targetScore} trackClassName={trackClassName} arcClassName={targetTier.stroke} />
        )}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-[38px] font-bold leading-none ${dark ? 'text-white' : 'text-text-primary'}`}>{score}</span>
        <span className={`mt-1 text-[10px] font-medium uppercase tracking-wide ${dark ? 'text-white/60' : 'text-text-secondary'}`}>Burnout Risk</span>
      </div>
    </div>
  );
}
