import { View, Text } from 'react-native';
import TablerIcon from './TablerIcon';

const toneStyles = {
  ai:      { container: 'bg-ai-soft',      text: 'text-ai' },
  healthy: { container: 'bg-healthy-soft', text: 'text-healthy' },
  warning: { container: 'bg-warning-soft', text: 'text-warning' },
  risk:    { container: 'bg-risk-soft',     text: 'text-risk' },
  neutral: { container: 'bg-bg border border-border', text: 'text-text-secondary' },
  white:   { container: 'bg-white/15',      text: 'text-white' },
};

export default function Pill({ tone = 'neutral', icon, children }) {
  const styles = toneStyles[tone] || toneStyles.neutral;
  return (
    <View className={`flex-row items-center gap-1 rounded-full px-3 py-1.5 ${styles.container}`}>
      {icon && <TablerIcon name={icon} size={12} color={getIconColor(tone)} />}
      <Text className={`text-[12px] font-semibold ${styles.text}`}>{children}</Text>
    </View>
  );
}

function getIconColor(tone) {
  const map = { ai: '#5C6AC4', healthy: '#A7D7C5', warning: '#F4C27A', risk: '#EFA8A8', neutral: '#7A7F87', white: '#fff' };
  return map[tone] || '#7A7F87';
}
