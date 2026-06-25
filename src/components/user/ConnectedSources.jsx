import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { dataSourceSummary } from '../../data/schedule';
import TablerIcon from '../ui/TablerIcon';

const STORAGE_KEY = 'replan_connected_sources';
const defaultSources = dataSourceSummary.elevated;

export default function ConnectedSources() {
  const [sources, setSources] = useState(defaultSources);

  const toggleSource = (id) => {
    const next = sources.map((item) =>
      item.id === id
        ? {
            ...item,
            enabled: item.enabled === false,
            status: item.enabled === false ? (item.syncState === 'manual' ? '수동 입력' : '샘플 데이터 기반') : '연결 해제',
            syncState: item.enabled === false ? item.originalSyncState ?? item.syncState : 'paused',
          }
        : item,
    );
    setSources(next);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next)).catch(console.error);
  };

  return (
    <View className="mx-4 mb-4 mt-3 rounded-[24px] border border-border bg-card p-5 shadow-sm">
      <View className="flex-row items-start justify-between gap-3">
        <View className="flex-1">
          <Text className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">연동 센터</Text>
          <Text className="mt-1 text-[17px] font-bold text-text-primary">AI 재설계에 쓰이는 데이터 출처</Text>
        </View>
        <View className="rounded-full bg-ai-soft px-3 py-1">
          <Text className="text-[11px] font-bold text-ai">
            {sources.filter((item) => item.enabled !== false).length}개 활성
          </Text>
        </View>
      </View>

      <View className="mt-3 gap-3">
        {sources.map((item) => (
          <SourceCard key={item.id} item={item} onToggle={() => toggleSource(item.id)} />
        ))}
      </View>

      <View className="mt-4 rounded-[18px] bg-bg p-3">
        <Text className="text-[11px] font-bold text-text-secondary">Coming Soon</Text>
        <Text className="mt-1 text-[12px] text-text-secondary">Samsung Health · Screen Time 연동은 추후 지원 예정입니다.</Text>
      </View>
    </View>
  );
}

function SourceCard({ item, onToggle }) {
  const enabled = item.enabled !== false;
  const stateLabel =
    item.syncState === 'paused' ? '일시 중지' :
    item.syncState === 'manual' ? '수동 입력' :
    item.status;

  return (
    <View className="rounded-[18px] bg-bg p-3.5">
      <View className="flex-row items-center gap-3">
        <View className={`h-10 w-10 items-center justify-center rounded-full bg-card`}>
          <TablerIcon name={item.icon} size={17} color={enabled ? '#5C6AC4' : '#7A7F87'} />
        </View>
        <View className="flex-1">
          <Text className="text-[13px] font-semibold text-text-primary">{item.source}</Text>
          <Text className={`mt-0.5 text-[10px] font-medium ${enabled ? 'text-ai' : 'text-text-secondary'}`}>
            {stateLabel} · {item.lastSyncedAt}
          </Text>
        </View>
        <Pressable
          className={`h-8 rounded-full px-3 items-center justify-center ${enabled ? 'bg-ai-soft' : 'bg-card'}`}
          onPress={onToggle}
        >
          <Text className={`text-[11px] font-bold ${enabled ? 'text-ai' : 'text-text-secondary'}`}>
            {enabled ? 'On' : 'Off'}
          </Text>
        </Pressable>
      </View>

      <Text className="mt-2 text-[11px] leading-relaxed text-text-secondary">{item.note}</Text>
      <View className="mt-2 flex-row flex-wrap gap-1.5">
        {item.usedSignals.map((signal) => (
          <View key={signal} className="rounded-full bg-card px-2 py-1">
            <Text className="text-[10px] font-medium text-text-secondary">{signal}</Text>
          </View>
        ))}
      </View>
      <View className="mt-3 flex-row items-center justify-between rounded-[14px] bg-card px-3 py-2">
        <Text className="text-[10px] font-bold text-text-secondary">오늘 판단 영향</Text>
        <Text className="text-[12px] font-bold text-warning">{item.impactLabel}</Text>
      </View>
    </View>
  );
}
