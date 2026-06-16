import WeeklyRiskStory from './analysis/WeeklyRiskStory';
import AnalysisBasis from './analysis/AnalysisBasis';
import BehaviorImpactRanking from './analysis/BehaviorImpactRanking';
import NextWeekSimulation from './analysis/NextWeekSimulation';

export default function Analysis({ prediction, healthData, calendarData, interventions, onGoHome }) {
  return (
    <main className="page no-scrollbar h-[calc(100%-112px)] overflow-y-auto pb-24">
      <WeeklyRiskStory />
      <AnalysisBasis healthData={healthData} calendarData={calendarData} interventions={interventions} onGoHome={onGoHome} />
      <BehaviorImpactRanking />
      <NextWeekSimulation prediction={prediction} />
    </main>
  );
}
