import { View, Text, ScrollView } from 'react-native';
import { parseTime } from '../../utils/time';
import TablerIcon from '../ui/TablerIcon';

const typeIcon = { class: 'school', work: 'briefcase', meeting: 'users', personal: 'home', free: 'sun', study: 'book', task: 'file-text', recovery: 'heart', ai: 'sparkles' };
const typeColor = { class: '#5C6AC4', work: '#F4C27A', meeting: '#5C6AC4', personal: '#A7D7C5', free: '#A7D7C5', ai: '#5C6AC4' };

export default function DayTimeline({ events }) {
  const sorted = [...events].sort((a, b) => parseTime(a.time) - parseTime(b.time));

  return (
    <View className="gap-2">
      {sorted.map((event, i) => {
        const isAI = event.type === 'ai';
        const isRisk = event.risk;
        const icon = typeIcon[event.type] || 'calendar';
        const iconColor = isAI ? '#5C6AC4' : isRisk ? '#EFA8A8' : typeColor[event.type] || '#7A7F87';

        return (
          <View
            key={`${event.title}-${event.time}-${i}`}
            className={`flex-row gap-3 rounded-[18px] p-3 ${isAI ? 'bg-ai-soft border border-ai/20' : isRisk ? 'bg-risk-soft border border-risk/20' : 'bg-bg'}`}
          >
            <View className="items-center gap-1 pt-0.5">
              <Text className="text-[11px] font-semibold text-text-secondary">{event.time}</Text>
              <View className="flex-1 w-[1px] bg-border" />
            </View>
            <View className="flex-1">
              <View className="flex-row items-center gap-2">
                <TablerIcon name={icon} size={13} color={iconColor} />
                <Text className={`flex-1 text-[13px] font-semibold ${isAI ? 'text-ai' : isRisk ? 'text-risk' : 'text-text-primary'}`} numberOfLines={1}>
                  {event.title}
                </Text>
                {isAI && (
                  <View className="rounded-full bg-ai px-1.5 py-0.5">
                    <Text className="text-[9px] font-bold text-white">AI</Text>
                  </View>
                )}
                {isRisk && !isAI && (
                  <View className="rounded-full bg-risk px-1.5 py-0.5">
                    <Text className="text-[9px] font-bold text-white">위험</Text>
                  </View>
                )}
              </View>
              {event.sub && (
                <Text className="mt-0.5 text-[11px] text-text-secondary">{event.sub}</Text>
              )}
              {event.endTime && (
                <Text className="mt-0.5 text-[11px] text-text-secondary">~{event.endTime}</Text>
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
}
