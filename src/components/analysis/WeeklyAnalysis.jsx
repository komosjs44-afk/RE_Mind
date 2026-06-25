import { conditionReport } from '../../data/schedule';

export default function WeeklyAnalysis() {
  const trend = conditionReport.weeklyTrend;
  const max = Math.max(...trend.map((d) => d.score));

  return (
    <section className="mx-4 mt-3 rounded-[24px] border border-border bg-card p-5 shadow-sm">
      <span className="text-[11px] font-semibold uppercase tracking-wide text-text-secondary">주간 분석</span>
      <h2 className="mt-1 text-[16px] font-semibold text-text-primary">이번 주 과부하 추이</h2>

      <div className="mt-5 flex items-end gap-1.5" style={{ height: '100px' }}>
        {trend.map((d, i) => {
          const isToday = d.day === '오늘';
          const barH = Math.max(Math.round((d.score / max) * 80), 6);
          const barCls = isToday ? 'bg-risk' : d.score >= 65 ? 'bg-warning/70' : 'bg-ai/50';
          return (
            <div key={i} className="flex flex-1 flex-col items-center gap-1">
              <span className={`text-[10px] font-semibold ${isToday ? 'text-risk' : 'text-text-secondary'}`}>
                {d.score}
              </span>
              <div
                className={`w-full rounded-t-md ${barCls}`}
                style={{ height: `${barH}px` }}
              />
              <span className={`text-[10px] font-medium ${isToday ? 'text-risk font-bold' : 'text-text-secondary'}`}>
                {d.day}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-4 border-t border-border pt-4">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-text-secondary">반복 패턴</p>
        <div className="mt-2 grid gap-1.5">
          {conditionReport.repeatedPatterns.map((p, i) => (
            <p key={i} className="text-[12px] leading-relaxed text-text-secondary">· {p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
