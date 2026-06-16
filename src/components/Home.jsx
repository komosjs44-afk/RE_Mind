import TodayActionCard from './home/TodayActionCard';
import WhyAiThinksCards from './home/WhyAiThinksCards';
import PreventionQueue from './home/PreventionQueue';
import HealthcareStatus from './home/HealthcareStatus';
import RecoveryTimeline from './home/RecoveryTimeline';
import ScheduleTable from './home/ScheduleTable';
import CompletedDaySchedule from './home/CompletedDaySchedule';

export default function Home({
  prediction,
  healthData,
  dayEvents,
  primaryIntervention,
  secondaryInterventions,
  acceptIntervention,
  moveIntervention,
  delayIntervention,
  dismissIntervention,
}) {
  return (
    <main className="page no-scrollbar h-[calc(100%-112px)] overflow-y-auto pb-24">
      <TodayActionCard
        intervention={primaryIntervention}
        currentRiskScore={prediction.currentRiskScore}
        onAccept={acceptIntervention}
        onDelay={delayIntervention}
        onDismiss={dismissIntervention}
      />
      <WhyAiThinksCards factors={prediction.mainRiskFactors} />
      <HealthcareStatus data={healthData} prediction={prediction} />
      <RecoveryTimeline intervention={primaryIntervention} />
      <PreventionQueue
        interventions={secondaryInterventions}
        currentRiskScore={prediction.currentRiskScore}
        acceptIntervention={acceptIntervention}
        moveIntervention={moveIntervention}
        delayIntervention={delayIntervention}
        dismissIntervention={dismissIntervention}
      />
      <ScheduleTable events={dayEvents} onAccept={acceptIntervention} onMove={moveIntervention} onDelay={delayIntervention} />
      <CompletedDaySchedule events={dayEvents} />
    </main>
  );
}
