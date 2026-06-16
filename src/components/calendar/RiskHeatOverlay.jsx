export default function RiskHeatOverlay({ gridRow }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none z-[5] rounded-2xl border-l-4 border-risk/55 bg-gradient-to-r from-risk/16 via-warning/10 to-transparent"
      style={{ gridRow, gridColumn: '1 / -1' }}
    />
  );
}
