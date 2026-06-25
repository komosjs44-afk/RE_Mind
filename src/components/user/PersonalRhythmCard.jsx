import { View, Text } from 'react-native';
import TablerIcon from '../ui/TablerIcon';

const defaultRhythm = [
  ['집중 선호 시간', '09:00~12:00'],
  ['수면 목표', '01:00 이전 취침'],
  ['알림 회피 시간', '23:00~07:30'],
  ['회복 선호', '짧은 산책, 스트레칭'],
];

export default function PersonalRhythmCard() {
  return (
    <View className="mx-4 mt-3 rounded-[24px] border border-border bg-card p-5 shadow-sm">
      <View className="flex-row items-center justify-between gap-3">
        <View className="flex-1">
          <Text className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">개인 리듬</Text>
          <Text className="mt-1 text-[17px] font-bold text-text-primary">AI 재설계에 반영되는 생활 패턴</Text>
        </View>
        <View className="h-11 w-11 items-center justify-center rounded-full bg-ai-soft">
          <TablerIcon name="bolt" size={20} color="#5C6AC4" />
        </View>
      </View>
      <View className="mt-3 gap-2">
        {defaultRhythm.map(([label, value]) => (
          <View key={label} className="flex-row items-center justify-between gap-3 rounded-[18px] bg-bg px-3 py-2.5">
            <Text className="text-[12px] font-medium text-text-secondary">{label}</Text>
            <Text className="text-right text-[12px] font-semibold text-text-primary">{value}</Text>
          </View>
        ))}
      </View>
      <Text className="mt-3 text-[11px] leading-relaxed text-text-secondary">
        아래 프로필 입력값을 수정하면 AI 추천 일정에 자동 반영됩니다.
      </Text>
    </View>
  );
}
