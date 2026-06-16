const variants = {
  primary: 'bg-navy text-white hover:bg-navy/90',
  secondary: 'bg-bg text-text-primary border border-border hover:bg-border/40',
  text: 'bg-transparent text-text-secondary hover:text-text-primary',
  ai: 'bg-ai text-white hover:bg-ai/90',
};

export default function Button({ variant = 'primary', icon, children, className = '', ...props }) {
  return (
    <button
      className={`min-h-[56px] px-4 rounded-[20px] text-[13px] font-semibold inline-flex items-center justify-center gap-1.5 transition-colors disabled:pointer-events-none disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ai/40 focus-visible:ring-offset-2 ${variants[variant]} ${className}`}
      {...props}
    >
      {icon && <i className={`ti ti-${icon}`} />}
      {children}
    </button>
  );
}
