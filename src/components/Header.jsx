import { useState } from 'react';

export default function Header({ title, notifications = [] }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="absolute left-1/2 top-3 z-10 h-9 w-[126px] -translate-x-1/2 rounded-full bg-black" />
      <div className="flex items-end justify-between px-6 pb-2 pt-[16px] text-[12px] font-medium text-text-primary">
        <span>9:41</span>
        <span className="inline-flex gap-1">
          <i className="ti ti-wifi" /> <i className="ti ti-battery" />
        </span>
      </div>
      <header className="relative flex items-center justify-between border-b border-border bg-bg/90 px-5 py-3.5 backdrop-blur-md">
        <div>
          <h1 className="text-2xl font-semibold text-text-primary">{title}</h1>
          <p className="mt-1 text-[13px] text-text-secondary">2026년 6월 16일 화요일</p>
        </div>
        <button
          className="relative grid h-[38px] w-[38px] place-items-center rounded-full bg-card text-text-secondary transition-all active:scale-[0.98]"
          aria-label="알림"
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          <i className="ti ti-bell text-xl" />
          {notifications.length > 0 && (
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-risk" />
          )}
        </button>

        {open && (
          <div className="animate-sheet-up absolute right-4 top-[68px] z-40 w-[292px] rounded-[22px] border border-border bg-card p-3.5 shadow-lg">
            <div className="mb-2.5 flex items-center justify-between">
              <span className="text-[12px] font-semibold text-text-primary">오늘 알림</span>
              <button className="min-h-8 text-[11px] font-medium text-text-secondary" onClick={() => setOpen(false)}>
                닫기
              </button>
            </div>
            {notifications.length === 0 ? (
              <p className="rounded-[18px] bg-bg px-3 py-4 text-center text-[12px] font-medium text-text-secondary">
                현재 확인할 알림이 없습니다.
              </p>
            ) : (
              <div className="flex flex-col gap-2">
                {notifications.map((item) => (
                  <article key={item.id} className="rounded-[18px] bg-bg px-3 py-2.5">
                    <p className="text-[12px] font-semibold text-text-primary">{item.title}</p>
                    <p className="mt-1 text-[11px] leading-relaxed text-text-secondary">{item.detail}</p>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}
      </header>
    </>
  );
}
