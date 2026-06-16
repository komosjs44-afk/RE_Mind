import { getRiskLabel, getRiskLevel } from './riskAnalysis';

export function getRiskTier(score) {
  const level = getRiskLevel(score);
  const common = {
    healthy: {
      tier: 'healthy',
      color: 'text-healthy',
      bg: 'bg-healthy',
      soft: 'bg-healthy-soft',
      stroke: 'stroke-healthy',
    },
    warning: {
      tier: 'warning',
      color: 'text-warning',
      bg: 'bg-warning',
      soft: 'bg-warning-soft',
      stroke: 'stroke-warning',
    },
    risk: {
      tier: 'risk',
      color: 'text-risk',
      bg: 'bg-risk',
      soft: 'bg-risk-soft',
      stroke: 'stroke-risk',
    },
  };

  if (level === 'recovery') return { ...common.healthy, label: getRiskLabel(score) };
  if (level === 'warning') return { ...common.warning, label: getRiskLabel(score) };
  return { ...common.risk, label: getRiskLabel(score) };
}
