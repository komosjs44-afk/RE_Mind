import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import Pill from '../ui/Pill';
import TimePickerBottomSheet from '../ui/TimePickerBottomSheet';
import TablerIcon from '../ui/TablerIcon';

const typeIcon = { study: 'book', task: 'file-text', recovery: 'heart', focus: 'focus-2', habit: 'repeat' };

export default function RecommendationList({
  recommendations,
  calendarEvents,
  acceptRecommendation,
  moveRecommendation,
  delayRecommendation,
  dismissRecommendation,
}) {
  if (!recommendations || recommendations.length === 0) return null;

  return (
    <View className="mx-4 mt-3 rounded-[24px] border border-border bg-card p-4 shadow-sm">
      <View className="flex-row items-center justify-between">
        <Text className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">추천 일정</Text>
        <Pill tone="neutral">{recommendations.length}개</Pill>
      </View>
      <View className="mt-3 gap-2">
        {recommendations.map((item) => (
          <RecommendationItem
            key={item.id}
            item={item}
            calendarEvents={calendarEvents}
            onAccept={acceptRecommendation}
            onMove={moveRecommendation}
            onDelay={delayRecommendation}
            onDismiss={dismissRecommendation}
          />
        ))}
      </View>
    </View>
  );
}

function RecommendationItem({ item, calendarEvents, onAccept, onMove, onDelay, onDismiss }) {
  const [expanded, setExpanded] = useState(false);
  const [timePickerOpen, setTimePickerOpen] = useState(false);
  const isAccepted = item.status === 'accepted';
  const iconName = typeIcon[item.type] || 'sparkles';

  return (
    <View className="rounded-[18px] bg-bg overflow-hidden">
      <Pressable
        className="flex-row items-center gap-3 px-3 py-3"
        onPress={() => setExpanded((v) => !v)}
      >
        <View className="h-9 w-9 items-center justify-center rounded-full bg-card">
          <TablerIcon name={iconName} size={15} color="#5C6AC4" />
        </View>
        <View className="flex-1">
          <Text className={`text-[13px] font-semibold ${isAccepted ? 'text-ai' : 'text-text-primary'}`} numberOfLines={1}>
            {item.title}
          </Text>
          <Text className="mt-0.5 text-[11px] text-text-secondary">
            {item.time}{item.endTime ? `~${item.endTime}` : ''} · {item.expectedEffect}
          </Text>
        </View>
        {isAccepted ? (
          <View className="rounded-full bg-ai-soft px-2 py-1">
            <Text className="text-[11px] font-semibold text-ai">반영됨</Text>
          </View>
        ) : (
          <TablerIcon name={expanded ? 'chevron-up' : 'chevron-down'} size={14} color="#7A7F87" />
        )}
      </Pressable>

      {expanded && !isAccepted && (
        <View className="border-t border-border/50 px-3 pb-3 pt-2">
          <Text className="text-[12px] leading-relaxed text-text-secondary">{item.reason}</Text>
          <View className="mt-3 flex-row gap-1.5">
            <ActionBtn icon="calendar-plus" label="수락" tone="primary" onPress={() => onAccept(item.id)} />
            <ActionBtn icon="clock-edit" label="시간 이동" onPress={() => setTimePickerOpen(true)} />
            <ActionBtn icon="clock" label="15분 뒤" onPress={() => onDelay(item.id)} />
            <ActionBtn icon="x" label="제외" onPress={() => onDismiss(item.id)} />
          </View>
        </View>
      )}

      <TimePickerBottomSheet
        open={timePickerOpen}
        onClose={() => setTimePickerOpen(false)}
        recommendation={item}
        calendarEvents={calendarEvents ?? []}
        onConfirm={(newTime) => { onMove(item.id, newTime); setTimePickerOpen(false); }}
      />
    </View>
  );
}

function ActionBtn({ icon, label, tone = 'default', onPress }) {
  const isPrimary = tone === 'primary';
  return (
    <Pressable
      className={`flex-1 items-center gap-0.5 rounded-[14px] py-2 ${isPrimary ? 'bg-navy' : 'bg-card'}`}
      onPress={onPress}
    >
      <TablerIcon name={icon} size={15} color={isPrimary ? '#fff' : '#7A7F87'} />
      <Text className={`text-[9px] font-bold ${isPrimary ? 'text-white' : 'text-text-secondary'}`}>{label}</Text>
    </Pressable>
  );
}
