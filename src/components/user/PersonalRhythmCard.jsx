import { personalization } from '../../data/schedule';

export default function PersonalRhythmCard() {
  const rhythm = [
    ['집중 선호 시간', personalization.preferences.find(([label]) => label === '집중 선호 시간')?.[1]],
    ['수면 목표', '00:30 이전 취침'],
    ['알림 회피 시간', personalization.preferences.find(([label]) => label === '알림 회피 시간')?.[1]],
    ['회복 선호', personalization.preferences.find(([label]) => label === '선호 회복 루틴')?.[1]],
  ];

  return (
    <section className="mx-4 mt-3 rounded-[24px] border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wide text-text-secondary">개인 리듬</span>
          <h2 className="mt-1 text-[17px] font-semibold text-text-primary">추천에 반영되는 생활 패턴</h2>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-ai-soft text-ai">
          <i className="ti ti-bolt text-xl" />
        </div>
      </div>
      <div className="mt-3 grid gap-2">
        {rhythm.map(([label, value]) => (
          <div key={label} className="flex items-center justify-between gap-3 rounded-[18px] bg-bg px-3 py-2.5">
            <span className="text-[12px] font-medium text-text-secondary">{label}</span>
            <span className="text-right text-[12px] font-semibold text-text-primary">{value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
