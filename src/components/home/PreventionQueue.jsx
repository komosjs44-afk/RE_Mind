import InterventionCard from '../InterventionCard';

export default function PreventionQueue({
  interventions,
  currentRiskScore,
  acceptIntervention,
  moveIntervention,
  delayIntervention,
  dismissIntervention,
}) {
  if (interventions.length === 0) return null;

  return (
    <section className="mx-4 mt-6">
      <div className="mb-2 flex items-center justify-between px-1">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-text-secondary">다른 예방 행동</span>
        <span className="text-[11px] font-medium text-text-secondary">{interventions.length}개</span>
      </div>
      <div className="flex flex-col gap-2">
        {interventions.map((item) => (
          <InterventionCard
            key={item.id}
            intervention={item}
            currentRiskScore={currentRiskScore}
            acceptIntervention={acceptIntervention}
            moveIntervention={moveIntervention}
            delayIntervention={delayIntervention}
            dismissIntervention={dismissIntervention}
          />
        ))}
      </div>
    </section>
  );
}
