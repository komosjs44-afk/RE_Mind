import { Tabs } from 'expo-router';
import { Home2, Calendar, ChartBar, User } from '@tabler/icons-react-native';

const COLORS = {
  active: '#5C6AC4',
  inactive: '#7A7F87',
  bg: '#ffffff',
  border: '#E9E5DD',
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.active,
        tabBarInactiveTintColor: COLORS.inactive,
        tabBarStyle: {
          backgroundColor: COLORS.bg,
          borderTopColor: COLORS.border,
          borderTopWidth: 1,
          height: 64,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '홈',
          tabBarIcon: ({ color, size }) => <Home2 size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: '캘린더',
          tabBarIcon: ({ color, size }) => <Calendar size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="analysis"
        options={{
          title: 'AI 분석',
          tabBarIcon: ({ color, size }) => <ChartBar size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="user"
        options={{
          title: '내 정보',
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
