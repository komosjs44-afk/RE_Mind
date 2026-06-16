import HeroRiskCard from './home/HeroRiskCard';
import TodayActionCard from './home/TodayActionCard';
import WhyAiThinksCards from './home/WhyAiThinksCards';
import RootCauseCard from './home/RootCauseCard';
import HealthcareStatus from './home/HealthcareStatus';
import EvidenceReasoningCard from './home/EvidenceReasoningCard';
import DataEvidencePanel from './home/DataEvidencePanel';
import PreventionQueue from './home/PreventionQueue';

export default function Home({
  prediction,
  healthData,
  screenData,
  dataSources,
  dayEvents,
  primaryIntervention,
  secondaryInterventions,
  acceptIntervention,
  moveIntervention,
  delayIntervention,
  dismissIntervention,
}) {
  const acceptedRiskReduction = primaryIntervention?.status === 'accepted' ? primaryIntervention.riskReduction : 0;
  const displayedRiskScore = Math.max(prediction.currentRiskScore - acceptedRiskReduction, 0);
  const effectivePrediction = {
    ...prediction,
    currentRiskScore: displayedRiskScore,
    baselineRiskScore: prediction.currentRiskScore,
    riskAfterIntervention: Math.max(prediction.currentRiskScore - (primaryIntervention?.riskReduction || prediction.preventionImpactScore), 0),
    acceptedRiskReduction,
  };

  return (
    <main className="page no-scrollbar h-[calc(100%-112px)] overflow-y-auto pb-24">
      <HeroRiskCard prediction={effectivePrediction} intervention={primaryIntervention} onAccept={acceptIntervention} />
      <TodayActionCard
        intervention={primaryIntervention}
        currentRiskScore={displayedRiskScore}
        baselineRiskScore={prediction.currentRiskScore}
        onAccept={acceptIntervention}
        onDelay={delayIntervention}
        onDismiss={dismissIntervention}
      />
      <WhyAiThinksCards factors={prediction.mainRiskFactors} />
      <RootCauseCard dailyEvents={dayEvents} healthData={healthData} screenData={screenData} />
      <HealthcareStatus data={healthData} prediction={prediction} />
      <DataEvidencePanel sources={dataSources} />
      <EvidenceReasoningCard prediction={effectivePrediction} healthData={healthData} dataSources={dataSources} intervention={primaryIntervention} />
      <PreventionQueue
        interventions={secondaryInterventions}
        currentRiskScore={displayedRiskScore}
        acceptIntervention={acceptIntervention}
        moveIntervention={moveIntervention}
        delayIntervention={delayIntervention}
        dismissIntervention={dismissIntervention}
        compact
      />
    </main>
  );
}
