import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../../src/context/AppContext';
import Header from '../../src/components/Header';
import TodaySummaryCard from '../../src/components/home/TodaySummaryCard';
import PrimaryRecommendationCard from '../../src/components/home/PrimaryRecommendationCard';
import ReasonCard from '../../src/components/home/ReasonCard';
import RecommendationList from '../../src/components/home/RecommendationList';
import Toast from '../../src/components/ui/Toast';

export default function HomeScreen() {
  const {
    overload, health, calendarSummary, calendarEvents, academicTasks,
    notifications, primaryRecommendation, secondaryRecommendations, isRecalculating,
    toast, closeToast,
    acceptRecommendation, moveRecommendation, delayRecommendation, dismissRecommendation,
  } = useApp();

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={['top']}>
      <Header title="RE:Plan" notifications={notifications} />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
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
      </ScrollView>
      <Toast toast={toast} onClose={closeToast} />
    </SafeAreaView>
  );
}
