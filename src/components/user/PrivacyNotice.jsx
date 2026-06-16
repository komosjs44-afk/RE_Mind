export default function PrivacyNotice() {
  return (
    <section className="mx-4 mb-4 mt-3 rounded-[24px] border border-border bg-card p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="grid h-10 w-10 flex-none place-items-center rounded-full bg-ai-soft text-ai">
          <i className="ti ti-shield-lock text-[18px]" />
        </div>
        <div>
          <p className="text-[13px] font-semibold text-text-primary">개인 데이터 보호</p>
          <p className="mt-2 text-[12px] leading-relaxed text-text-secondary">
            개인 맞춤 추천은 사용자에게만 제공되며, 조직 리포트는 비식별·집계 데이터만 사용합니다.
            현재 화면의 Calendar, Health, Screen Data는 MVP 샘플 데이터 기반입니다.
          </p>
        </div>
      </div>
    </section>
  );
}
