import TodayAnalysis from './analysis/TodayAnalysis';
import WeeklyAnalysis from './analysis/WeeklyAnalysis';
import ImprovementCard from './analysis/ImprovementCard';

export default function Analysis({ overload }) {
  return (
    <main className="page no-scrollbar h-[calc(100%-112px)] overflow-y-auto pb-24">
      <section className="mx-4 mt-4 rounded-[28px] bg-navy p-5 text-white shadow-sm">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-white/55">AI Report</p>
        <h1 className="mt-2 text-[24px] font-semibold leading-tight">오늘 일정 과부하 구간이 분석됐습니다</h1>
        <p className="mt-2 text-[13px] leading-relaxed text-white/70">
          수면 부족, 알바·수업 충돌, 시험·과제 마감이 같은 날 겹쳐 실행 가능성이 낮아졌습니다.
          AI가 우선순위를 재설계했습니다.
        </p>
      </section>
      <TodayAnalysis overload={overload} />
      <WeeklyAnalysis />
      <ImprovementCard />
    </main>
  );
}
