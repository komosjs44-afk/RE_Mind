import { View, Text } from 'react-native';

export default function TodayAnalysis({ overload }) {
  const score = overload?.currentRiskScore ?? 0;
  const afterScore = overload?.riskAfterIntervention ?? 0;
  const factors = overload?.mainRiskFactors ?? [];

  const scoreColor = score >= 70 ? 'text-risk' : score >= 50 ? 'text-warning' : 'text-healthy';
  const barColor = score >= 70 ? 'bg-risk' : score >= 50 ? 'bg-warning' : 'bg-healthy';

  return (
    <View className="mx-4 mt-3 rounded-[24px] border border-border bg-card p-5 shadow-sm">
      <Text className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">오늘 분석</Text>
      <View className="mt-3 flex-row items-center gap-5">
        <View>
          <Text className={`text-[44px] font-bold leading-none ${scoreColor}`}>{score}</Text>
          <Text className="mt-1 text-[11px] text-text-secondary">과부하 지수</Text>
        </View>
        <View className="flex-1 gap-3">
          <View>
            <View className="mb-1 flex-row items-center justify-between">
              <Text className="text-[11px] text-text-secondary">현재</Text>
              <Text className="text-[11px] font-semibold text-text-secondary">{score}점</Text>
            </View>
            <View className="h-2 overflow-hidden rounded-full bg-bg">
              <View className={`h-full rounded-full ${barColor}`} style={{ width: `${score}%` }} />
            </View>
          </View>
          <View>
            <View className="mb-1 flex-row items-center justify-between">
              <Text className="text-[11px] text-text-secondary">AI 재설계 후</Text>
              <Text className="text-[11px] font-semibold text-healthy">{afterScore}점</Text>
            </View>
            <View className="h-2 overflow-hidden rounded-full bg-bg">
              <View className="h-full rounded-full bg-healthy" style={{ width: `${afterScore}%` }} />
            </View>
          </View>
        </View>
      </View>

      {factors.length > 0 && (
        <View className="mt-4 gap-2 border-t border-border pt-4">
          {factors.map((f, i) => (
            <View key={i} className="flex-row items-start justify-between gap-3">
              <Text className="flex-1 text-[12px] text-text-primary">{f.title}</Text>
              <Text className="flex-none text-right text-[11px] text-text-secondary">{f.detail}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
