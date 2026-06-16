export default function AIProfileHero() {
  return (
    <section className="mx-4 mt-4 rounded-lg bg-navy p-6 text-white shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 flex-none items-center justify-center rounded-full bg-ai-soft text-[16px] font-semibold text-ai">
          RE
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-ai">AI Profile Center</p>
          <h1 className="mt-1 text-[18px] font-semibold leading-snug">AI가 당신을 이해하는 방식</h1>
        </div>
      </div>
      <p className="mt-4 text-[13px] leading-relaxed text-white/70">
        일정, 건강, 스크린타임 데이터를 함께 읽어 당신의 리듬을 학습하고 있어요.
      </p>
    </section>
  );
}
