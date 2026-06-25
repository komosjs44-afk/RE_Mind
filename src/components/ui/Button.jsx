import { Pressable, Text } from 'react-native';
import TablerIcon from './TablerIcon';

const variants = {
  primary:   { container: 'bg-navy',     text: 'text-white',          iconColor: '#fff' },
  secondary: { container: 'bg-bg border border-border', text: 'text-text-primary', iconColor: '#2B2F38' },
  text:      { container: 'bg-transparent', text: 'text-text-secondary', iconColor: '#7A7F87' },
  ai:        { container: 'bg-ai',       text: 'text-white',          iconColor: '#fff' },
};

export default function Button({ variant = 'primary', icon, children, onPress, disabled, className = '' }) {
  const v = variants[variant] || variants.primary;
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={`min-h-[52px] flex-row items-center justify-center gap-1.5 rounded-[20px] px-4 ${v.container} ${disabled ? 'opacity-50' : ''} ${className}`}
    >
      {icon && <TablerIcon name={icon} size={16} color={v.iconColor} />}
      <Text className={`text-[13px] font-semibold ${v.text}`}>{children}</Text>
    </Pressable>
  );
}
