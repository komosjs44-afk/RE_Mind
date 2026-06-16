import WeeklyRiskStory from './analysis/WeeklyRiskStory';
import DailyScheduleRiskDiagnosis from './analysis/DailyScheduleRiskDiagnosis';
import BehaviorImpactRanking from './analysis/BehaviorImpactRanking';
import NextWeekSimulation from './analysis/NextWeekSimulation';
import RecommendedActionCTA from './analysis/RecommendedActionCTA';

export default function Analysis({ prediction, dataSources, interventions, dailyEvents = [], healthData, onGoHome }) {
  return (
    <main className="page no-scrollbar h-[calc(100%-112px)] overflow-y-auto pb-24">
      <section className="mx-4 mt-4 rounded-[28px] bg-navy p-5 text-white shadow-sm">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-white/55">AI Report</p>
        <h1 className="mt-2 text-[24px] font-semibold leading-tight">이번 주 위험 변화가 오후에 몰렸습니다</h1>
        <p className="mt-2 text-[13px] leading-relaxed text-white/70">
          회의 과밀, 수면 감소, 야간 스크린 사용이 같은 날 겹치며 오늘 위험도 72까지 상승했습니다.
        </p>
      </section>
      <WeeklyRiskStory />
      <DailyScheduleRiskDiagnosis events={dailyEvents} prediction={prediction} healthData={healthData} interventions={interventions} />
      <BehaviorImpactRanking dataSources={dataSources} />
      <NextWeekSimulation prediction={prediction} />
      <RecommendedActionCTA interventions={interventions} onGoHome={onGoHome} />
    </main>
  );
}
