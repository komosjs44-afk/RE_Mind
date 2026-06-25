import { conditionReport } from '../../data/schedule';

const BEFORE = 84;
const AFTER = 42;

export default function ImprovementCard() {
  const improvement = BEFORE - AFTER;
  const effects = conditionReport.preventionEffects;

  return (
    <section className="mx-4 mt-3 rounded-[24px] border border-border bg-card p-5 shadow-sm">
      <span className="text-[11px] font-semibold uppercase tracking-wide text-text-secondary">AI 재설계 효과</span>
      <h2 className="mt-1 text-[16px] font-semibold text-text-primary">추천 적용 시 과부하 개선</h2>

      <div className="mt-4 flex items-center gap-4">
        <ScoreBlock label="재설계 전" score={BEFORE} tone="bad" />
        <div className="flex flex-col items-center gap-1">
          <i className="ti ti-arrow-right text-[22px] text-text-secondary" />
          <span className="text-[13px] font-bold text-healthy">-{improvement}점</span>
        </div>
        <ScoreBlock label="재설계 후" score={AFTER} tone="good" />
      </div>

      <div className="mt-4 border-t border-border pt-4">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-text-secondary">적용된 개선 사항</p>
        <div className="mt-2 grid gap-2">
          {effects.map((e, i) => (
            <div key={i} className="flex items-center justify-between gap-3">
              <p className="truncate text-[12px] text-text-primary">{e.action}</p>
              <span className="flex-none rounded-full bg-healthy-soft px-2 py-0.5 text-[10px] font-semibold text-healthy">
                {e.effect}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ScoreBlock({ label, score, tone }) {
  const scoreCls = tone === 'bad' ? 'text-risk' : 'text-healthy';
  return (
    <div className="flex flex-1 flex-col items-center rounded-[18px] bg-bg py-4">
      <p className="text-[11px] text-text-secondary">{label}</p>
      <p className={`mt-1 text-[36px] font-bold leading-none ${scoreCls}`}>{score}</p>
      <p className="mt-0.5 text-[10px] text-text-secondary">점</p>
    </div>
  );
}
