import * as TablerIcons from '@tabler/icons-react-native';

function toPascalCase(name) {
  return 'Icon' + name.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join('');
}

export default function TablerIcon({ name, size = 16, color = '#2B2F38', stroke = 1.5, ...props }) {
  const ComponentName = toPascalCase(name);
  const IconComponent = TablerIcons[ComponentName];
  if (!IconComponent) return null;
  return <IconComponent size={size} color={color} stroke={stroke} {...props} />;
}
