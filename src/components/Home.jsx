import TodaySummaryCard from './home/TodaySummaryCard';
import PrimaryRecommendationCard from './home/PrimaryRecommendationCard';
import ReasonCard from './home/ReasonCard';
import RecommendationList from './home/RecommendationList';

export default function Home({
  overload,
  health,
  calendarSummary,
  calendarEvents,
  academicTasks,
  primaryRecommendation,
  secondaryRecommendations,
  isRecalculating,
  acceptRecommendation,
  moveRecommendation,
  delayRecommendation,
  dismissRecommendation,
}) {
  return (
    <main className="page no-scrollbar h-[calc(100%-112px)] overflow-y-auto pb-24">
      <TodaySummaryCard
        health={health}
        calendarSummary={calendarSummary}
        academicTasks={academicTasks}
        overload={overload}
      />
      <PrimaryRecommendationCard
        recommendation={primaryRecommendation}
        calendarEvents={calendarEvents}
        isRecalculating={isRecalculating}
        onAccept={acceptRecommendation}
        onMove={moveRecommendation}
        onDelay={delayRecommendation}
        onDismiss={dismissRecommendation}
      />
      <ReasonCard factors={overload?.mainRiskFactors ?? []} />
      <RecommendationList
        recommendations={secondaryRecommendations}
        calendarEvents={calendarEvents}
        acceptRecommendation={acceptRecommendation}
        moveRecommendation={moveRecommendation}
        delayRecommendation={delayRecommendation}
        dismissRecommendation={dismissRecommendation}
      />
    </main>
  );
}
