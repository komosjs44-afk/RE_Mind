import { View, Text } from 'react-native';
import { conditionReport } from '../../data/schedule';

export default function WeeklyAnalysis() {
  const trend = conditionReport.weeklyTrend;
  const max = Math.max(...trend.map((d) => d.score));

  return (
    <View className="mx-4 mt-3 rounded-[24px] border border-border bg-card p-5 shadow-sm">
      <Text className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">주간 분석</Text>
      <Text className="mt-1 text-[16px] font-bold text-text-primary">이번 주 과부하 추이</Text>

      <View className="mt-5 flex-row items-end gap-1.5" style={{ height: 120 }}>
        {trend.map((d, i) => {
          const isToday = d.day === '오늘';
          const barH = Math.max(Math.round((d.score / max) * 80), 6);
          const barCls = isToday ? 'bg-risk' : d.score >= 65 ? 'bg-warning' : 'bg-ai/50';
          return (
            <View key={i} className="flex-1 items-center" style={{ justifyContent: 'flex-end' }}>
              <Text className={`text-[10px] font-semibold mb-1 ${isToday ? 'text-risk' : 'text-text-secondary'}`}>
                {d.score}
              </Text>
              <View className={`w-full rounded-t-md ${barCls}`} style={{ height: barH }} />
              <Text className={`mt-1 text-[10px] font-medium ${isToday ? 'text-risk font-bold' : 'text-text-secondary'}`}>
                {d.day}
              </Text>
            </View>
          );
        })}
      </View>

      <View className="mt-4 border-t border-border pt-4">
        <Text className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">반복 패턴</Text>
        <View className="mt-2 gap-1.5">
          {conditionReport.repeatedPatterns.map((p, i) => (
            <Text key={i} className="text-[12px] leading-relaxed text-text-secondary">· {p}</Text>
          ))}
        </View>
      </View>
    </View>
  );
}
