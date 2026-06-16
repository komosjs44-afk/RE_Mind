export function getRiskTier(score) {
  if (score <= 30) {
    return { tier: 'healthy', label: '낮음', color: 'text-healthy', bg: 'bg-healthy', soft: 'bg-healthy-soft', stroke: 'stroke-healthy' };
  }
  if (score <= 60) {
    return { tier: 'warning', label: '보통', color: 'text-warning', bg: 'bg-warning', soft: 'bg-warning-soft', stroke: 'stroke-warning' };
  }
  return { tier: 'risk', label: '높음', color: 'text-risk', bg: 'bg-risk', soft: 'bg-risk-soft', stroke: 'stroke-risk' };
}
