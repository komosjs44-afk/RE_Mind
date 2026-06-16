import { personalization } from '../../data/schedule';

const labels = ['선호 회복 루틴', '피하고 싶은 알림 시간', '야간 스크린타임 완화 목표'];

export default function RecoveryPreferences() {
  const items = personalization.preferences.filter(([label]) => labels.includes(label));

  return (
    <section className="mx-4 mt-4 rounded-lg border border-border bg-card p-5 shadow-sm">
      <span className="text-[11px] font-semibold uppercase tracking-wide text-text-secondary">Recovery Preferences</span>
      <div className="mt-3 flex flex-col gap-3">
        {items.map(([label, value]) => (
          <article key={label} className="rounded-md bg-bg px-3 py-2.5">
            <span className="text-[11px] font-medium text-text-secondary">{label}</span>
            <p className="mt-1 text-[13px] font-medium text-text-primary">{value}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
