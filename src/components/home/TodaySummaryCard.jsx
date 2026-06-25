import { View, Text } from 'react-native';
import TablerIcon from '../ui/TablerIcon';

export default function TodaySummaryCard({ health, calendarSummary, academicTasks = [], overload }) {
  const urgentTasks = academicTasks.filter((t) => t.daysLeft <= 3);
  const riskScore = overload?.currentRiskScore ?? 0;
  const isOverload = riskScore >= 65;

  return (
    <View className="mx-4 mt-4 rounded-[28px] bg-navy p-5 shadow-sm">
      <View className="flex-row items-center gap-2">
        <View className="rounded-full bg-ai-soft px-2.5 py-1">
          <Text className="text-[10px] font-bold uppercase tracking-wider text-ai">RE:Plan AI</Text>
        </View>
        <Text className="text-[11px] text-white/50">{overload?.confidence ?? 82}% 신뢰도</Text>
      </View>

      <Text className="mt-3 text-[22px] font-bold leading-tight text-white">
        {isOverload ? '오늘 일정이 과부하 상태입니다' : '오늘 일정 밀도가 적당합니다'}
      </Text>
      <Text className="mt-1 text-[13px] leading-relaxed text-white/65">
        {overload?.predictedPeakRiskTime
          ? `${overload.predictedPeakRiskTime} 구간이 가장 바쁩니다. AI가 일정을 재설계했습니다.`
          : 'AI가 오늘 하루를 분석했습니다.'}
      </Text>

      <View className="mt-4 flex-row gap-2">
        <Metric label="수면" value={`${health?.sleepHours ?? '—'}h`} warn={(health?.sleepHours ?? 7) < 6} />
        <Metric label="걸음수" value={(health?.steps ?? 0).toLocaleString()} />
        <Metric label="피로도" value={`${health?.fatigueLevel ?? '—'}/5`} warn={(health?.fatigueLevel ?? 0) >= 4} />
      </View>

      {urgentTasks.length > 0 && (
        <View className="mt-4 border-t border-white/15 pt-4">
          <Text className="text-[10px] font-bold uppercase tracking-wider text-white/50">마감 임박</Text>
          <View className="mt-2 gap-1.5">
            {urgentTasks.slice(0, 2).map((task) => (
              <View key={task.id} className="flex-row items-center justify-between gap-2">
                <Text className="flex-1 text-[12px] font-medium text-white/85" numberOfLines={1}>
                  {task.title}
                </Text>
                <View className="rounded-full bg-risk px-2 py-0.5">
                  <Text className="text-[10px] font-bold text-white">D-{task.daysLeft}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

function Metric({ label, value, warn = false }) {
  return (
    <View className="flex-1 rounded-[18px] bg-white/10 px-3 py-2">
      <Text className="text-[10px] font-medium text-white/55">{label}</Text>
      <Text className={`mt-1 text-[14px] font-bold ${warn ? 'text-warning' : 'text-white'}`}>{value}</Text>
    </View>
  );
}
