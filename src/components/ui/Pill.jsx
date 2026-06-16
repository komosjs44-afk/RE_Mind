const tones = {
  ai: 'bg-ai-soft text-ai',
  healthy: 'bg-healthy-soft text-healthy',
  warning: 'bg-warning-soft text-warning',
  risk: 'bg-risk-soft text-risk',
  neutral: 'bg-bg text-text-secondary border border-border',
  white: 'bg-white/15 text-white',
};

export default function Pill({ tone = 'neutral', icon, children, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-[12px] font-medium ${tones[tone]} ${className}`}>
      {icon && <i className={`ti ti-${icon}`} />}
      {children}
    </span>
  );
}
