import { useState, useMemo } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import BottomSheet from './BottomSheet';
import Button from './Button';
import TablerIcon from './TablerIcon';

function generateSlots() {
  const slots = [];
  for (let h = 6; h <= 23; h++) {
    slots.push(`${String(h).padStart(2, '0')}:00`);
    if (h < 23) slots.push(`${String(h).padStart(2, '0')}:30`);
  }
  return slots;
}

function parseMinutes(timeStr) {
  if (!timeStr) return 9999;
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
}

function detectConflict(selectedTime, calendarEvents = [], excludeId = null) {
  const selMin = parseMinutes(selectedTime);
  return calendarEvents.find((event) => {
    if (event.id === excludeId) return false;
    const startMin = parseMinutes(event.time);
    const endMin = event.endTime ? parseMinutes(event.endTime) : startMin + 60;
    return selMin >= startMin && selMin < endMin;
  });
}

const ALL_SLOTS = generateSlots();

export default function TimePickerBottomSheet({ open, onClose, recommendation, calendarEvents = [], onConfirm }) {
  const [selected, setSelected] = useState(recommendation?.time ?? '09:00');
  const [confirming, setConfirming] = useState(false);

  const conflict = useMemo(
    () => detectConflict(selected, calendarEvents, recommendation?.id),
    [selected, calendarEvents, recommendation],
  );

  const handleConfirm = async () => {
    if (confirming) return;
    setConfirming(true);
    try {
      await onConfirm(selected);
      onClose();
    } finally {
      setConfirming(false);
    }
  };

  const COLS = 4;
  const rows = [];
  for (let i = 0; i < ALL_SLOTS.length; i += COLS) {
    rows.push(ALL_SLOTS.slice(i, i + COLS));
  }

  return (
    <BottomSheet open={open} onClose={onClose} title="시간 이동">
      <View className="mb-3">
        <Text className="text-[13px] font-semibold text-text-primary">{recommendation?.title}</Text>
        <Text className="mt-1 text-[12px] text-text-secondary">
          원하는 시작 시간을 선택하세요. 기존 일정과 겹치는 시간대는 빨갛게 표시됩니다.
        </Text>
      </View>

      <ScrollView className="max-h-[220px]" showsVerticalScrollIndicator={false}>
        {rows.map((row, rowIdx) => (
          <View key={rowIdx} className="flex-row gap-1.5 mb-1.5">
            {row.map((slot) => {
              const slotConflict = detectConflict(slot, calendarEvents, recommendation?.id);
              const isSelected = slot === selected;
              const isCurrent = slot === recommendation?.time;

              let containerCls = 'bg-bg';
              if (isSelected) containerCls = 'bg-navy';
              else if (slotConflict) containerCls = 'bg-risk-soft';

              return (
                <Pressable
                  key={slot}
                  className={`flex-1 items-center rounded-[14px] py-2.5 ${containerCls}`}
                  onPress={() => setSelected(slot)}
                >
                  <Text className={`text-[12px] font-semibold ${isSelected ? 'text-white' : slotConflict ? 'text-risk' : 'text-text-primary'}`}>
                    {slot}
                  </Text>
                  {isCurrent && !isSelected && (
                    <Text className="text-[9px] text-text-secondary opacity-60 mt-0.5">현재</Text>
                  )}
                  {slotConflict && (
                    <Text className="text-[9px] text-risk mt-0.5" numberOfLines={1}>
                      {slotConflict.title}
                    </Text>
                  )}
                </Pressable>
              );
            })}
          </View>
        ))}
      </ScrollView>

      <View className={`mt-3 rounded-[18px] p-3.5 ${conflict ? 'bg-risk-soft' : 'bg-healthy-soft'}`}>
        <View className="flex-row items-center gap-2">
          <TablerIcon
            name={conflict ? 'alert-triangle' : 'check'}
            size={15}
            color={conflict ? '#EFA8A8' : '#A7D7C5'}
          />
          <Text className={`text-[13px] font-semibold ${conflict ? 'text-risk' : 'text-healthy'}`}>
            {selected} 선택됨
          </Text>
        </View>
        {conflict ? (
          <Text className="mt-1 text-[12px] leading-relaxed text-risk">
            이 시간에 '{conflict.title}' 일정이 있습니다. 그래도 배치하려면 아래에서 확정하세요.
          </Text>
        ) : (
          <Text className="mt-1 text-[12px] text-healthy">기존 일정과 충돌하지 않습니다.</Text>
        )}
      </View>

      <View className="mt-4 gap-2 pb-2">
        <Button
          variant={conflict ? 'ai' : 'primary'}
          icon={conflict ? 'alert-triangle' : 'calendar-plus'}
          onPress={handleConfirm}
          disabled={confirming}
          className="w-full"
        >
          {confirming ? '반영 중...' : conflict ? '충돌 무시하고 확정' : `${selected}으로 캘린더에 반영`}
        </Button>
        <Button variant="secondary" onPress={onClose} className="w-full">
          취소
        </Button>
      </View>
    </BottomSheet>
  );
}
