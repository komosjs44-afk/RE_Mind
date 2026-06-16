export default function Card({ as: Component = 'section', variant = 'standard', className = '', children, ...props }) {
  const variants = {
    hero: 'rounded-[32px]',
    standard: 'rounded-[24px]',
    compact: 'rounded-[18px]',
  };

  return (
    <Component
      className={`border border-border bg-card shadow-sm ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
