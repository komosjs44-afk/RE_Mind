import { View, Text } from 'react-native';
import TablerIcon from '../ui/TablerIcon';

export default function CalendarEmptyState() {
  return (
    <View className="rounded-[20px] bg-bg px-4 py-5 items-center">
      <View className="h-10 w-10 items-center justify-center rounded-full bg-card">
        <TablerIcon name="calendar-heart" size={20} color="#5C6AC4" />
      </View>
      <Text className="mt-3 text-[13px] font-semibold text-text-primary">등록된 일정이 없습니다.</Text>
      <Text className="mt-1 text-[12px] leading-relaxed text-text-secondary text-center">
        캘린더가 비어 있으면 AI는 회복 루틴을 먼저 제안합니다.
      </Text>
    </View>
  );
}
