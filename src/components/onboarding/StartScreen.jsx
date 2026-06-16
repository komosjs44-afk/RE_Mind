import Button from '../ui/Button';

const logoModules = import.meta.glob('../../assets/images/remind-logo.{png,jpg,jpeg,svg}', {
  eager: true,
  import: 'default',
});
const logoSrc = Object.values(logoModules)[0];

export default function StartScreen({ onStart }) {
  return (
    <div className="relative flex-1 bg-bg">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 50% 44%, transparent 55%, rgba(17,24,39,0.05) 100%)' }}
      />

      <div className="absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2">
        <div className="relative flex items-center justify-center">
          <div className="absolute h-72 w-72 rounded-full bg-ai/10 blur-[64px]" />
          {logoSrc ? (
            <img src={logoSrc} alt="RE:Mind Logo" className="relative h-52 w-52 object-contain" />
          ) : (
            <div className="relative flex h-52 w-52 items-center justify-center rounded-[32px] bg-card shadow-lg">
              <span className="text-4xl font-bold text-text-primary">R</span>
            </div>
          )}
        </div>
      </div>

      <Button
        variant="primary"
        className="absolute bottom-12 left-1/2 h-[60px] w-[82%] -translate-x-1/2 rounded-[20px] text-[15px] shadow-sm"
        onClick={onStart}
      >
        시작하기
      </Button>
    </div>
  );
}
