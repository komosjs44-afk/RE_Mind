import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import TimePickerBottomSheet from '../ui/TimePickerBottomSheet';
import TablerIcon from '../ui/TablerIcon';

const typeIcon = { study: 'book', task: 'file-text', recovery: 'heart', focus: 'focus-2', habit: 'repeat' };
const typeColor = { study: '#5C6AC4', task: '#5C6AC4', recovery: '#A7D7C5', focus: '#5C6AC4', habit: '#F4C27A' };

export default function PrimaryRecommendationCard({
  recommendation,
  calendarEvents,
  isRecalculating,
  onAccept,
  onMove,
  onDelay,
  onDismiss,
}) {
  const [showMore, setShowMore] = useState(false);
  const [timePickerOpen, setTimePickerOpen] = useState(false);

  if (!recommendation) return null;
  const isAccepted = recommendation.status === 'accepted';
  const iconName = typeIcon[recommendation.type] || 'sparkles';
  const iconColor = typeColor[recommendation.type] || '#5C6AC4';

  return (
    <View className="mx-4 mt-3 rounded-[24px] border border-border bg-card p-4 shadow-sm">
      <View className="mb-3 flex-row items-center gap-2">
        <Text className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">대표 AI 추천</Text>
        {isAccepted && (
          <View className="rounded-full bg-ai-soft px-2 py-0.5">
            <Text className="text-[10px] font-semibold text-ai">반영됨</Text>
          </View>
        )}
      </View>

      <View className="flex-row items-start gap-3">
        <View className="h-10 w-10 items-center justify-center rounded-full bg-ai-soft">
          <TablerIcon name={iconName} size={18} color={iconColor} />
        </View>
        <View className="flex-1">
          <Text className="text-[16px] font-bold leading-snug text-text-primary">{recommendation.title}</Text>
          <Text className="mt-1 text-[12px] text-text-secondary">
            {recommendation.time}{recommendation.endTime ? `~${recommendation.endTime}` : ''} · {recommendation.expectedEffect}
          </Text>
        </View>
      </View>

      {isRecalculating && (
        <View className="mt-3 rounded-[16px] bg-ai-soft px-4 py-3 items-center">
          <Text className="text-[13px] font-bold text-ai">AI가 나머지 일정을 재설계하는 중...</Text>
          <Text className="mt-0.5 text-[11px] text-ai/70">잠시만 기다려주세요</Text>
        </View>
      )}

      {!isRecalculating && (
        <View className="mt-4 flex-row gap-2">
          {!isAccepted ? (
            <>
              <Pressable
                className="flex-1 rounded-[16px] bg-navy py-3 items-center"
                onPress={() => onAccept(recommendation.id)}
              >
                <Text className="text-[13px] font-bold text-white">수락</Text>
              </Pressable>
              <Pressable
                className="flex-1 rounded-[16px] border border-border bg-bg py-3 items-center"
                onPress={() => setTimePickerOpen(true)}
              >
                <Text className="text-[13px] font-semibold text-text-primary">시간 이동</Text>
              </Pressable>
              <Pressable
                className="rounded-[16px] border border-border bg-bg px-4 py-3 items-center justify-center"
                onPress={() => setShowMore((v) => !v)}
              >
                <TablerIcon name="dots" size={16} color="#7A7F87" />
              </Pressable>
            </>
          ) : (
            <Pressable
              className="flex-1 rounded-[16px] border border-border bg-bg py-3 items-center"
              onPress={() => setTimePickerOpen(true)}
            >
              <Text className="text-[13px] font-semibold text-text-secondary">시간 이동</Text>
            </Pressable>
          )}
        </View>
      )}

      {showMore && !isRecalculating && (
        <View className="mt-2 flex-row gap-2">
          <MoreBtn icon="clock" label="15분 뒤" onPress={() => { onDelay(recommendation.id); setShowMore(false); }} />
          <MoreBtn icon="x" label="제외" tone="danger" onPress={() => { onDismiss(recommendation.id); setShowMore(false); }} />
        </View>
      )}

      <TimePickerBottomSheet
        open={timePickerOpen}
        onClose={() => setTimePickerOpen(false)}
        recommendation={recommendation}
        calendarEvents={calendarEvents ?? []}
        onConfirm={(newTime) => {
          onMove(recommendation.id, newTime);
          setTimePickerOpen(false);
        }}
      />
    </View>
  );
}

function MoreBtn({ icon, label, tone = 'default', onPress }) {
  const borderCls = tone === 'danger' ? 'border-risk/30' : 'border-border';
  const bgCls = tone === 'danger' ? 'bg-risk-soft' : 'bg-bg';
  const textCls = tone === 'danger' ? 'text-risk' : 'text-text-secondary';
  const iconColor = tone === 'danger' ? '#EFA8A8' : '#7A7F87';
  return (
    <Pressable
      className={`flex-1 items-center gap-1 rounded-[14px] border py-2.5 ${borderCls} ${bgCls}`}
      onPress={onPress}
    >
      <TablerIcon name={icon} size={15} color={iconColor} />
      <Text className={`text-[10px] font-bold ${textCls}`}>{label}</Text>
    </Pressable>
  );
}
