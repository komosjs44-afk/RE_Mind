export default function RecommendedActionCTA({ interventions, onGoHome }) {
  const acceptedCount = interventions.filter((item) => item.status === 'accepted').length;
  const movedCount = interventions.filter((item) => item.moved).length;

  return (
    <section className="mx-4 mt-3 rounded-[24px] border border-border bg-card p-5 shadow-sm">
      <span className="text-[11px] font-semibold uppercase tracking-wide text-text-secondary">지금 할 일</span>
      <h2 className="mt-2 text-[17px] font-semibold text-text-primary">
        오늘 회복 여력이 낮은 채로 오후로 넘어가면 위험도가 더 올라갑니다
      </h2>
      <p className="mt-2 text-[12px] leading-relaxed text-text-secondary">
        지금 추천 행동을 수용하면 같은 일정에서도 위험도를 낮출 수 있습니다.
      </p>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <Metric label="수용한 개입" value={`${acceptedCount}개`} />
        <Metric label="이동한 일정" value={`${movedCount}개`} />
      </div>

      <button className="mt-4 h-12 w-full rounded-[18px] bg-navy text-[13px] font-semibold text-white transition-all active:scale-[0.98]" onClick={onGoHome}>
        추천 행동 보러 가기
      </button>
    </section>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-[18px] bg-bg px-3 py-3">
      <p className="text-[11px] font-semibold text-text-secondary">{label}</p>
      <p className="mt-1 text-[16px] font-semibold text-text-primary">{value}</p>
    </div>
  );
}
