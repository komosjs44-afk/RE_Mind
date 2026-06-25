import { View, Text } from 'react-native';
import TablerIcon from '../ui/TablerIcon';
import { conditionReport } from '../../data/schedule';

const BEFORE = 84;
const AFTER = 42;

export default function ImprovementCard() {
  const improvement = BEFORE - AFTER;
  const effects = conditionReport.preventionEffects;

  return (
    <View className="mx-4 mt-3 rounded-[24px] border border-border bg-card p-5 shadow-sm">
      <Text className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">AI 재설계 효과</Text>
      <Text className="mt-1 text-[16px] font-bold text-text-primary">추천 적용 시 과부하 개선</Text>

      <View className="mt-4 flex-row items-center gap-4">
        <ScoreBlock label="재설계 전" score={BEFORE} tone="bad" />
        <View className="items-center gap-1">
          <TablerIcon name="arrow-right" size={22} color="#7A7F87" />
          <Text className="text-[13px] font-bold text-healthy">-{improvement}점</Text>
        </View>
        <ScoreBlock label="재설계 후" score={AFTER} tone="good" />
      </View>

      <View className="mt-4 border-t border-border pt-4">
        <Text className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">적용된 개선 사항</Text>
        <View className="mt-2 gap-2">
          {effects.map((e, i) => (
            <View key={i} className="flex-row items-center justify-between gap-3">
              <Text className="flex-1 text-[12px] text-text-primary" numberOfLines={1}>{e.action}</Text>
              <View className="rounded-full bg-healthy-soft px-2 py-0.5">
                <Text className="text-[10px] font-bold text-healthy">{e.effect}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

function ScoreBlock({ label, score, tone }) {
  const scoreCls = tone === 'bad' ? 'text-risk' : 'text-healthy';
  return (
    <View className="flex-1 items-center rounded-[18px] bg-bg py-4">
      <Text className="text-[11px] text-text-secondary">{label}</Text>
      <Text className={`mt-1 text-[36px] font-bold leading-none ${scoreCls}`}>{score}</Text>
      <Text className="mt-0.5 text-[10px] text-text-secondary">점</Text>
    </View>
  );
}
