import Button from '../ui/Button';
import Pill from '../ui/Pill';

const taskTypeLabel = { exam: '시험', assignment: '과제', presentation: '발표' };
const taskTypeIcon = { exam: 'pencil', assignment: 'file-text', presentation: 'presentation' };

export default function TodayConditionCard({ health, calendar, academicTasks = [], recommendation, onAccept }) {
  const urgentTasks = academicTasks.filter((t) => t.daysLeft <= 3);
  const overloaded = calendar?.workHours >= 4 || urgentTasks.length >= 2;
  const isAccepted = recommendation?.status === 'accepted';

  return (
    <section className="mx-4 mt-4 rounded-[32px] bg-navy p-5 text-white shadow-[0_18px_40px_rgba(17,24,39,0.22)]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <Pill tone="white" icon="sparkles">AI 오늘 컨디션 분석</Pill>
          <h1 className="mt-3 text-[26px] font-semibold leading-tight">
            {overloaded
              ? '오늘 일정 과부하 구간이 있습니다'
              : '오늘 일정은 실행 가능한 수준입니다'}
          </h1>
          <p className="mt-2 text-[13px] leading-relaxed text-white/72">
            {health
              ? `수면 ${health.sleepHours}h · 걸음 ${health.steps.toLocaleString()}보 기준으로 분석했습니다.`
              : '건강 데이터를 입력하면 더 정확한 분석이 가능합니다.'}
          </p>
        </div>
        <div className={`flex h-[72px] w-[72px] flex-none items-center justify-center rounded-full text-[28px] font-semibold ${overloaded ? 'bg-risk/20' : 'bg-healthy/20'}`}>
          {overloaded ? '⚡' : '✓'}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2">
        <MetricChip icon="moon" label="수면" value={health ? `${health.sleepHours}h` : '-'} warn={health?.sleepHours < 6} />
        <MetricChip icon="walk" label="걸음" value={health ? `${(health.steps / 1000).toFixed(1)}k` : '-'} />
        <MetricChip icon="calendar-event" label="일정" value={`${calendar?.totalCount ?? '-'}개`} warn={overloaded} />
      </div>

      {urgentTasks.length > 0 && (
        <div className="mt-4 rounded-[22px] bg-white/10 p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-white/60">마감 임박</p>
          <div className="mt-2 grid gap-1.5">
            {urgentTasks.slice(0, 3).map((task) => (
              <div key={task.id} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <i className={`ti ti-${taskTypeIcon[task.type] || 'file'} text-[13px] text-white/70`} />
                  <span className="truncate text-[13px] font-medium text-white">{task.title}</span>
                </div>
                <span className={`flex-none rounded-full px-2 py-0.5 text-[11px] font-semibold ${task.daysLeft <= 1 ? 'bg-risk/30 text-risk' : 'bg-warning/30 text-warning'}`}>
                  D-{task.daysLeft}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {isAccepted ? (
        <div className="mt-4 flex min-h-[56px] items-center justify-center gap-2 rounded-[20px] bg-white text-[13px] font-semibold text-navy">
          <i className="ti ti-check" />
          캘린더에 반영 완료
        </div>
      ) : recommendation ? (
        <Button
          variant="ai"
          className="mt-4 w-full bg-white text-navy hover:bg-white/90"
          icon="calendar-plus"
          onClick={() => onAccept(recommendation.id)}
        >
          {recommendation.title} 추가하기
        </Button>
      ) : null}
    </section>
  );
}

function MetricChip({ icon, label, value, warn = false }) {
  return (
    <div className="rounded-[18px] bg-white/10 px-3 py-2.5 text-center">
      <i className={`ti ti-${icon} text-[16px] ${warn ? 'text-warning' : 'text-white/70'}`} />
      <p className="mt-1 text-[11px] font-medium text-white/60">{label}</p>
      <p className={`mt-0.5 text-[15px] font-semibold ${warn ? 'text-warning' : 'text-white'}`}>{value}</p>
    </div>
  );
}
