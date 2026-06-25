import { View, Text, Pressable, Animated } from 'react-native';
import { useEffect, useRef } from 'react';

export default function Toast({ toast, onClose }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const isVisible = Boolean(toast?.message);

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: isVisible ? 1 : 0,
      duration: 220,
      useNativeDriver: true,
    }).start();
  }, [isVisible, opacity]);

  if (!toast?.message && opacity.__getValue() === 0) return null;

  return (
    <Animated.View
      style={{ opacity }}
      className="absolute bottom-24 left-0 right-0 mx-8 z-50"
      pointerEvents={isVisible ? 'auto' : 'none'}
    >
      <View className="flex-row items-center justify-between gap-4 rounded-[22px] bg-navy px-[18px] py-3.5 shadow-lg">
        <Text className="flex-1 text-[13px] font-medium leading-relaxed text-white">
          {toast?.message}
        </Text>
        {toast?.actionLabel ? (
          <Pressable
            className="flex-none rounded-full bg-white/10 px-3 py-1.5"
            onPress={toast.onAction}
          >
            <Text className="text-[12px] font-semibold text-white">{toast.actionLabel}</Text>
          </Pressable>
        ) : (
          <Pressable onPress={onClose} className="p-1">
            <Text className="text-[12px] text-white/60">닫기</Text>
          </Pressable>
        )}
      </View>
    </Animated.View>
  );
}
