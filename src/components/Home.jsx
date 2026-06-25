import TodayConditionCard from './home/TodayConditionCard';
import TodayActionCard from './home/TodayActionCard';
import WhyAiThinksCards from './home/WhyAiThinksCards';
import RootCauseCard from './home/RootCauseCard';
import HealthcareStatus from './home/HealthcareStatus';
import DataEvidencePanel from './home/DataEvidencePanel';
import EvidenceReasoningCard from './home/EvidenceReasoningCard';
import RecommendationQueue from './home/RecommendationQueue';

export default function Home({
  overload,
  health,
  calendarSummary,
  academicTasks,
  dataSources,
  dayEvents,
  primaryRecommendation,
  secondaryRecommendations,
  acceptRecommendation,
  moveRecommendation,
  delayRecommendation,
  dismissRecommendation,
}) {
  const acceptedReduction = primaryRecommendation?.status === 'accepted' ? primaryRecommendation.riskReduction : 0;
  const displayedScore = Math.max((overload?.currentRiskScore ?? 0) - acceptedReduction, 0);
  const effectiveOverload = overload
    ? {
        ...overload,
        currentRiskScore: displayedScore,
        baselineRiskScore: overload.currentRiskScore,
        riskAfterIntervention: Math.max(overload.currentRiskScore - (primaryRecommendation?.riskReduction ?? overload.preventionImpactScore ?? 0), 0),
        acceptedReduction,
      }
    : null;

  return (
    <main className="page no-scrollbar h-[calc(100%-112px)] overflow-y-auto pb-24">
      <TodayConditionCard
        health={health}
        calendar={calendarSummary}
        academicTasks={academicTasks}
        recommendation={primaryRecommendation}
        onAccept={acceptRecommendation}
      />
      <TodayActionCard
        intervention={primaryRecommendation}
        currentRiskScore={displayedScore}
        baselineRiskScore={overload?.currentRiskScore}
        onAccept={acceptRecommendation}
        onDelay={delayRecommendation}
        onDismiss={dismissRecommendation}
      />
      <WhyAiThinksCards factors={overload?.mainRiskFactors ?? []} />
      <RootCauseCard dailyEvents={dayEvents} healthData={health} />
      <HealthcareStatus data={health} />
      <DataEvidencePanel sources={dataSources} />
      <EvidenceReasoningCard
        prediction={effectiveOverload}
        healthData={health}
        dataSources={dataSources}
        intervention={primaryRecommendation}
      />
      <RecommendationQueue recommendations={secondaryRecommendations} />
    </main>
  );
}
