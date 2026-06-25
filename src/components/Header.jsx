import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import TablerIcon from './ui/TablerIcon';

export default function Header({ title, notifications = [] }) {
  const [open, setOpen] = useState(false);

  return (
    <View className="border-b border-border bg-bg/90 px-5 py-3.5">
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-2xl font-bold text-text-primary">{title}</Text>
          <Text className="mt-1 text-[13px] text-text-secondary">2026년 6월 25일 목요일</Text>
        </View>
        <Pressable
          className="relative h-[38px] w-[38px] items-center justify-center rounded-full bg-card"
          onPress={() => setOpen((prev) => !prev)}
        >
          <TablerIcon name="bell" size={18} color="#7A7F87" />
          {notifications.length > 0 && (
            <View className="absolute right-1 top-1 h-2 w-2 rounded-full bg-risk" />
          )}
        </Pressable>
      </View>

      {open && (
        <View className="absolute right-4 top-[72px] z-40 w-[292px] rounded-[22px] border border-border bg-card p-3.5 shadow-lg">
          <View className="mb-2.5 flex-row items-center justify-between">
            <Text className="text-[12px] font-bold text-text-primary">오늘 알림</Text>
            <Pressable onPress={() => setOpen(false)}>
              <Text className="text-[11px] font-medium text-text-secondary">닫기</Text>
            </Pressable>
          </View>
          {notifications.length === 0 ? (
            <View className="rounded-[18px] bg-bg px-3 py-4">
              <Text className="text-center text-[12px] font-medium text-text-secondary">
                현재 확인할 알림이 없습니다.
              </Text>
            </View>
          ) : (
            <View className="gap-2">
              {notifications.map((item) => (
                <View key={item.id} className="rounded-[18px] bg-bg px-3 py-2.5">
                  <Text className="text-[12px] font-bold text-text-primary">{item.title}</Text>
                  <Text className="mt-1 text-[11px] leading-relaxed text-text-secondary">{item.detail}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      )}
    </View>
  );
}
