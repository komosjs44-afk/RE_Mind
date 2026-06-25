import { View, Text, Pressable, ScrollView, Modal } from 'react-native';
import TablerIcon from './TablerIcon';

export default function BottomSheet({ open, onClose, title, children }) {
  return (
    <Modal visible={open} transparent animationType="slide" onRequestClose={onClose}>
      <View className="flex-1 justify-end">
        <Pressable className="absolute inset-0 bg-black/40" onPress={onClose} />
        <View className="rounded-t-[32px] bg-card pt-3 pb-8 shadow-2xl max-h-[82%]">
          <View className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-border" />
          <View className="mb-4 flex-row items-center justify-between px-5">
            {title && <Text className="text-[16px] font-semibold text-text-primary">{title}</Text>}
            <Pressable
              className="h-9 w-9 items-center justify-center rounded-full bg-bg"
              onPress={onClose}
            >
              <TablerIcon name="x" size={16} color="#7A7F87" />
            </Pressable>
          </View>
          <ScrollView showsVerticalScrollIndicator={false} className="px-5">
            {children}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
