import { conditionReport } from '../../data/schedule';
import { getRiskTier } from '../../utils/riskTier';

const WIDTH = 300;
const HEIGHT = 110;
const PADDING = 10;
const PEAK_DAYS = ['수', '목', '오늘'];
const dotFill = { healthy: 'fill-healthy', warning: 'fill-warning', risk: 'fill-risk' };

export default function WeeklyConditionStory() {
  const data = conditionReport.weeklyTrend;
  const stepX = (WIDTH - PADDING * 2) / (data.length - 1);
  const points = data.map((d, i) => ({
    ...d,
    x: PADDING + i * stepX,
    y: PADDING + (1 - d.score / 100) * (HEIGHT - PADDING * 2),
  }));
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');

  return (
    <section className="mx-4 mt-3 rounded-[24px] border border-border bg-card p-5 shadow-sm">
      <span className="text-[11px] font-semibold uppercase tracking-wide text-text-secondary">이번 주 컨디션 변화</span>
      <h2 className="mt-2 text-[17px] font-semibold leading-snug text-text-primary">
        수요일부터 과부하 지수가 반복 상승했습니다
      </h2>
      <p className="mt-2 text-[13px] leading-relaxed text-text-secondary">
        알바 + 수업이 겹친 날과 시험 준비가 부족한 날에 과부하 지수가 뚜렷하게 올라갔습니다.
      </p>

      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="mt-4 w-full" style={{ height: HEIGHT }}>
        <path d={path} fill="none" strokeWidth="2.5" className="stroke-text-secondary/25" />
        {points.map((p) => (
          <circle
            key={p.day}
            cx={p.x}
            cy={p.y}
            r={PEAK_DAYS.includes(p.day) ? 5 : 3.5}
            className={dotFill[getRiskTier(p.score).tier]}
          />
        ))}
      </svg>
      <div className="mt-1 flex justify-between px-1.5">
        {data.map((d) => (
          <span key={d.day} className={`text-[10px] font-medium ${PEAK_DAYS.includes(d.day) ? 'text-risk' : 'text-text-secondary'}`}>
            {d.day}
          </span>
        ))}
      </div>
    </section>
  );
}
