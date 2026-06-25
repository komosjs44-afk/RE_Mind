import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../../src/context/AppContext';
import Header from '../../src/components/Header';
import TodayAnalysis from '../../src/components/analysis/TodayAnalysis';
import WeeklyAnalysis from '../../src/components/analysis/WeeklyAnalysis';
import ImprovementCard from '../../src/components/analysis/ImprovementCard';
import Toast from '../../src/components/ui/Toast';

export default function AnalysisScreen() {
  const { overload, notifications, toast, closeToast } = useApp();

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={['top']}>
      <Header title="AI 분석" notifications={notifications} />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
        <View className="mx-4 mt-4 rounded-[28px] bg-navy p-5 shadow-sm">
          <Text className="text-[11px] font-bold uppercase tracking-wider text-white/55">AI Report</Text>
          <Text className="mt-2 text-[24px] font-bold leading-tight text-white">
            오늘 일정 과부하 구간이 분석됐습니다
          </Text>
          <Text className="mt-2 text-[13px] leading-relaxed text-white/70">
            수면 부족, 알바·수업 충돌, 시험·과제 마감이 같은 날 겹쳐 실행 가능성이 낮아졌습니다.
            AI가 우선순위를 재설계했습니다.
          </Text>
        </View>
        <TodayAnalysis overload={overload} />
        <WeeklyAnalysis />
        <ImprovementCard />
      </ScrollView>
      <Toast toast={toast} onClose={closeToast} />
    </SafeAreaView>
  );
}
