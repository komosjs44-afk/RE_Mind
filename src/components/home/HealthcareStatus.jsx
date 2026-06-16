const statusItems = [
  {
    key: 'sleepHours',
    label: '수면',
    suffix: 'h',
    icon: 'moon',
    tone: 'text-warning',
    note: '평소보다 짧아 회복 여력이 낮습니다.',
  },
  {
    key: 'stressScore',
    label: '스트레스',
    icon: 'heartbeat',
    tone: 'text-risk',
    note: '긴장도가 이미 높은 상태입니다.',
  },
  {
    key: 'hrv',
    label: 'HRV',
    suffix: 'ms',
    icon: 'activity-heartbeat',
    tone: 'text-risk',
    note: '회복 신호가 약하게 잡혔습니다.',
  },
  {
    key: 'energyScore',
    label: '에너지',
    icon: 'battery-3',
    tone: 'text-ai',
    note: '오후 집중 지속력이 낮습니다.',
  },
];

export default function HealthcareStatus({ data }) {
  return (
    <article className="mx-4 mt-3 rounded-[24px] border border-border bg-card p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-text-secondary">현재 몸 상태</p>
          <h3 className="mt-1 text-[18px] font-semibold leading-snug text-text-primary">
            회복 여력이 낮은 상태에서 오후 일정이 몰려 있습니다
          </h3>
          <p className="mt-2 text-[12px] leading-relaxed text-text-secondary">
            Samsung Health 신호가 수면 부족과 높은 스트레스를 동시에 보여주기 때문에, 같은 일정이라도 오늘은 더 쉽게 지칠 수 있습니다.
          </p>
        </div>
        <span className="rounded-full bg-risk-soft px-3 py-1 text-[11px] font-semibold text-risk">주의</span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        {statusItems.map((item) => (
          <StatusMetric key={item.key} item={item} value={data[item.key]} />
        ))}
      </div>
    </article>
  );
}

function StatusMetric({ item, value }) {
  return (
    <div className="rounded-[18px] bg-bg px-3 py-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <i className={`ti ti-${item.icon} text-[14px] ${item.tone}`} />
          <span className="text-[11px] font-medium text-text-secondary">{item.label}</span>
        </div>
        <p className="text-[14px] font-semibold text-text-primary">
          {value}{item.suffix || ''}
        </p>
      </div>
      <p className="mt-2 text-[10px] leading-snug text-text-secondary">{item.note}</p>
    </div>
  );
}
