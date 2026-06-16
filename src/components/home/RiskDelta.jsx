import { getRiskTier } from '../../utils/riskTier';

export default function RiskDelta({ before, after, size = 'md' }) {
  const beforeTier = getRiskTier(before);
  const afterTier = getRiskTier(after);
  const delta = before - after;
  const numberClass = size === 'lg' ? 'text-2xl' : 'text-[15px]';

  return (
    <div className="inline-flex items-center gap-2">
      <span className={`font-semibold ${numberClass} ${beforeTier.color}`}>{before}</span>
      <i className="ti ti-arrow-right text-text-secondary text-sm" />
      <span className={`font-semibold ${numberClass} ${afterTier.color}`}>{after}</span>
      <span className="rounded-full bg-ai-soft px-2 py-1 text-[11px] font-medium text-ai">-{delta}</span>
    </div>
  );
}
