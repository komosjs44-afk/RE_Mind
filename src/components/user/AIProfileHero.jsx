import { View, Text } from 'react-native';

export default function AIProfileHero() {
  return (
    <View className="mx-4 mt-4 rounded-[28px] bg-navy p-5 shadow-sm">
      <View className="flex-row items-center gap-4">
        <View className="h-14 w-14 items-center justify-center rounded-full bg-ai-soft">
          <Text className="text-[16px] font-bold text-ai">RE</Text>
        </View>
        <View>
          <Text className="text-[11px] font-bold uppercase tracking-wider text-ai">RE:Plan Profile</Text>
          <Text className="mt-1 text-[20px] font-bold leading-snug text-white">AI가 나를 이해하는 방식</Text>
        </View>
      </View>
      <Text className="mt-4 text-[13px] leading-relaxed text-white/72">
        일정, 건강, 학사 정보를 분석해 AI 일정 재설계와 과부하 예방을 개인화합니다.
      </Text>
      <View className="mt-4 flex-row gap-2">
        <Metric label="집중 시간" value="09:30" />
        <Metric label="수면 목표" value="01:00 전" />
        <Metric label="알림 회피" value="22:30" />
      </View>
    </View>
  );
}

function Metric({ label, value }) {
  return (
    <View className="flex-1 rounded-[18px] bg-white/10 px-3 py-2">
      <Text className="text-[10px] font-medium text-white/55">{label}</Text>
      <Text className="mt-1 text-[13px] font-bold text-white">{value}</Text>
    </View>
  );
}
