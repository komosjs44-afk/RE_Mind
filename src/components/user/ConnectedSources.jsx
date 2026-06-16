import { useState } from 'react';

const STORAGE_KEY = 'remind_connected_sources';

const defaultSources = [
  { source: 'Google Calendar', status: '연결됨', enabled: true, icon: 'calendar' },
  { source: 'Samsung Health', status: '연결됨', enabled: true, icon: 'heart-rate-monitor' },
  { source: 'Screen Time', status: '분석 가능', enabled: true, icon: 'device-mobile' },
];

export default function ConnectedSources() {
  const [sources, setSources] = useState(loadSources);

  const updateSources = (nextSources) => {
    setSources(nextSources);
    saveSources(nextSources);
  };

  const toggleSource = (source) => {
    updateSources(
      sources.map((item) => (
        item.source === source
          ? { ...item, enabled: !item.enabled, status: item.enabled ? '꺼짐' : '연결됨' }
          : item
      )),
    );
  };

  const reconnectSource = (source) => {
    updateSources(
      sources.map((item) => (
        item.source === source ? { ...item, enabled: true, status: '재연결됨' } : item
      )),
    );
  };

  return (
    <section className="mx-4 mb-4 mt-4 rounded-lg border border-border bg-card p-5 shadow-sm">
      <span className="text-[11px] font-semibold uppercase tracking-wide text-text-secondary">Connected Sources</span>
      <div className="mt-3 flex flex-col gap-3">
        {sources.map((item) => (
          <article key={item.source} className="rounded-md bg-bg p-3.5">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-card text-ai">
                <i className={`ti ti-${item.icon} text-[16px]`} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[12px] font-semibold text-text-primary">{item.source}</p>
                <p className={`mt-0.5 text-[10px] font-medium ${item.enabled ? 'text-ai' : 'text-text-secondary'}`}>
                  {item.status}
                </p>
              </div>
              <button
                className={`h-7 rounded-full px-3 text-[11px] font-medium ${item.enabled ? 'bg-ai-soft text-ai' : 'bg-card text-text-secondary'}`}
                onClick={() => toggleSource(item.source)}
              >
                {item.enabled ? 'On' : 'Off'}
              </button>
            </div>
            {!item.enabled && (
              <button className="mt-2 text-[11px] font-medium text-ai" onClick={() => reconnectSource(item.source)}>
                reconnect mock
              </button>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

function loadSources() {
  if (typeof window === 'undefined') return defaultSources;

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultSources;
  } catch (error) {
    console.error('Failed to load connected sources', error);
    return defaultSources;
  }
}

function saveSources(nextSources) {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSources));
  } catch (error) {
    console.error('Failed to save connected sources', error);
  }
}
