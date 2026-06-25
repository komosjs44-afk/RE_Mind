import { View, Text } from 'react-native';
import TablerIcon from '../ui/TablerIcon';

const sourceIcon = { health: 'heartbeat', academic: 'school', calendar: 'calendar', combined: 'sparkles' };
const sourceColor = { health: '#EFA8A8', academic: '#5C6AC4', calendar: '#5C6AC4', combined: '#5C6AC4' };

export default function ReasonCard({ factors = [] }) {
  if (factors.length === 0) return null;
  return (
    <View className="mx-4 mt-3 rounded-[24px] border border-border bg-card p-4 shadow-sm">
      <Text className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">추천 이유</Text>
      <View className="mt-3 gap-2.5">
        {factors.map((f, i) => (
          <View key={i} className="flex-row items-start gap-3">
            <View className="mt-0.5 h-7 w-7 items-center justify-center rounded-full bg-ai-soft">
              <TablerIcon name={sourceIcon[f.source] || 'info-circle'} size={13} color={sourceColor[f.source] || '#5C6AC4'} />
            </View>
            <View className="flex-1">
              <Text className="text-[13px] font-semibold text-text-primary">{f.title}</Text>
              <Text className="mt-0.5 text-[12px] text-text-secondary">{f.detail}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
