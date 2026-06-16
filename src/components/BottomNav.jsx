const tabs = [
  ['home', 'home', '홈'],
  ['cal', 'calendar', '캘린더'],
  ['anal', 'chart-bar', 'AI 분석'],
  ['user', 'user', '내 정보'],
];

export default function BottomNav({ page, setPage }) {
  return (
    <nav className="absolute inset-x-0 bottom-0 grid h-[84px] grid-cols-4 border-t border-border bg-bg/90 px-3 pb-4 pt-2.5 backdrop-blur-md">
      {tabs.map(([id, icon, label]) => {
        const active = page === id;
        return (
          <button
            key={id}
            className={`flex flex-col items-center justify-center gap-1 rounded-lg transition-colors ${active ? 'bg-ai-soft text-ai' : 'text-text-secondary/70'}`}
            onClick={() => setPage(id)}
          >
            <i className={`ti ti-${icon} text-[22px]`} />
            <span className={`text-[10px] ${active ? 'font-semibold' : 'font-medium'}`}>{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
