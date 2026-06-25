import { useState } from 'react';
import { dataSourceSummary } from '../../data/schedule';

const STORAGE_KEY = 'remind_connected_sources';
const defaultSources = dataSourceSummary.elevated;

export default function ConnectedSources() {
  const [sources, setSources] = useState(loadSources);

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
    saveSources(next);
  };

  return (
    <section className="mx-4 mb-4 mt-3 rounded-[24px] border border-border bg-card p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wide text-text-secondary">연동 센터</span>
          <h2 className="mt-1 text-[17px] font-semibold text-text-primary">AI 재설계에 쓰이는 데이터 출처</h2>
        </div>
        <span className="rounded-full bg-ai-soft px-3 py-1 text-[11px] font-semibold text-ai">
          {sources.filter((item) => item.enabled !== false).length}개 활성
        </span>
      </div>

      <div className="mt-3 grid gap-3">
        {sources.map((item) => (
          <SourceCard key={item.id} item={item} onToggle={() => toggleSource(item.id)} />
        ))}
      </div>

      <div className="mt-4 rounded-[18px] bg-bg p-3">
        <p className="text-[11px] font-semibold text-text-secondary">Coming Soon</p>
        <p className="mt-1 text-[12px] text-text-secondary">Samsung Health · Screen Time 연동은 추후 지원 예정입니다.</p>
      </div>
    </section>
  );
}

function SourceCard({ item, onToggle }) {
  const enabled = item.enabled !== false;
  const stateLabel =
    item.syncState === 'paused' ? '일시 중지' :
    item.syncState === 'manual' ? '수동 입력' :
    item.status;

  return (
    <article className="rounded-[18px] bg-bg p-3.5">
      <div className="flex items-center gap-3">
        <div className={`flex h-10 w-10 flex-none items-center justify-center rounded-full bg-card ${enabled ? 'text-ai' : 'text-text-secondary'}`}>
          <i className={`ti ti-${item.icon} text-[17px]`} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-semibold text-text-primary">{item.source}</p>
          <p className={`mt-0.5 text-[10px] font-medium ${enabled ? 'text-ai' : 'text-text-secondary'}`}>
            {stateLabel} · {item.lastSyncedAt}
          </p>
        </div>
        <button
          className={`h-8 rounded-full px-3 text-[11px] font-semibold transition-all active:scale-[0.98] ${enabled ? 'bg-ai-soft text-ai' : 'bg-card text-text-secondary'}`}
          onClick={onToggle}
        >
          {enabled ? 'On' : 'Off'}
        </button>
      </div>

      <p className="mt-2 text-[11px] leading-relaxed text-text-secondary">{item.note}</p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {item.usedSignals.map((signal) => (
          <span key={signal} className="rounded-full bg-card px-2 py-1 text-[10px] font-medium text-text-secondary">
            {signal}
          </span>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between rounded-[14px] bg-card px-3 py-2">
        <span className="text-[10px] font-semibold text-text-secondary">오늘 판단 영향</span>
        <span className="text-[12px] font-semibold text-warning">{item.impactLabel}</span>
      </div>
    </article>
  );
}

function loadSources() {
  if (typeof window === 'undefined') return defaultSources;
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved ? mergeSaved(JSON.parse(saved)) : defaultSources;
  } catch {
    return defaultSources;
  }
}

function mergeSaved(saved) {
  return defaultSources.map((source) => ({
    ...source,
    originalSyncState: source.syncState,
    ...(saved.find((item) => item.id === source.id) || {}),
  }));
}

function saveSources(sources) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(sources));
}
