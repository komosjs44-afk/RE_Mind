import { personalization } from '../../data/schedule';

export default function PersonalRhythmCard() {
  const focusWindow = personalization.preferences.find(([label]) => label === '집중 선호 시간');

  return (
    <section className="mx-4 mt-4 rounded-lg border border-border bg-card p-5 shadow-sm">
      <span className="text-[11px] font-semibold uppercase tracking-wide text-text-secondary">Personal Rhythm</span>
      <div className="mt-3 flex items-center justify-between">
        <div>
          <p className="text-[12px] font-medium text-text-secondary">Morning Focus</p>
          <p className="mt-1 text-[24px] font-semibold text-text-primary">{focusWindow?.[1]}</p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ai-soft text-ai">
          <i className="ti ti-bolt text-xl" />
        </div>
      </div>
    </section>
  );
}
