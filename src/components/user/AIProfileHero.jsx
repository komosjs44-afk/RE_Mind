export default function AIProfileHero() {
  return (
    <section className="mx-4 mt-4 rounded-[28px] bg-navy p-5 text-white shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 flex-none items-center justify-center rounded-full bg-ai-soft text-[16px] font-semibold text-ai">
          RE
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-ai">RE:Plan Profile</p>
          <h1 className="mt-1 text-[20px] font-semibold leading-snug">AI가 나를 이해하는 방식</h1>
        </div>
      </div>
      <p className="mt-4 text-[13px] leading-relaxed text-white/72">
        일정, 건강, 학사 정보를 분석해 AI 일정 재설계와 과부하 예방을 개인화합니다.
      </p>
      <div className="mt-4 grid grid-cols-3 gap-2">
        <Metric label="집중 시간" value="09:30" />
        <Metric label="수면 목표" value="00:30" />
        <Metric label="알림 회피" value="22:30" />
      </div>
    </section>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-[18px] bg-white/10 px-3 py-2">
      <p className="text-[10px] font-medium text-white/55">{label}</p>
      <p className="mt-1 text-[13px] font-semibold text-white">{value}</p>
    </div>
  );
}
