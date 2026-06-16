export default function CalendarEmptyState() {
  return (
    <div className="rounded-lg bg-bg px-4 py-5 text-center shadow-sm">
      <div className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-card text-ai">
        <i className="ti ti-calendar-heart text-lg" />
      </div>
      <p className="mt-3 text-[13px] font-semibold text-text-primary">등록된 일정이 없습니다.</p>
      <p className="mt-1 text-[12px] leading-relaxed text-text-secondary">
        캘린더를 연결하면 더 정확한 번아웃 분석이 가능합니다. 오늘은 일정이 적어 회복 루틴을 추천할 수 있어요.
      </p>
      <button className="mt-3 rounded-full bg-card px-3 py-2 text-[11px] font-medium text-ai">
        회복 루틴 확인
      </button>
    </div>
  );
}
