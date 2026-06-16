export default function CalendarEmptyState() {
  return (
    <div className="rounded-[20px] bg-bg px-4 py-5 text-center shadow-sm">
      <div className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-card text-ai">
        <i className="ti ti-calendar-heart text-lg" />
      </div>
      <p className="mt-3 text-[13px] font-semibold text-text-primary">등록된 일정이 없습니다.</p>
      <p className="mt-1 text-[12px] leading-relaxed text-text-secondary">
        캘린더가 비어 있으면 AI는 회복 루틴을 먼저 제안합니다.
      </p>
    </div>
  );
}
