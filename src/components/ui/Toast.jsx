export default function Toast({ toast, onClose }) {
  const isVisible = Boolean(toast?.message);

  return (
    <div
      aria-live="polite"
      className={`fixed left-1/2 bottom-24 z-[999] flex min-w-[280px] max-w-[360px] -translate-x-1/2 items-center justify-between gap-4 rounded-[22px] bg-navy px-[18px] py-3.5 text-[13px] font-medium text-white shadow-[0_18px_44px_rgba(17,24,39,0.28)] transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
    >
      <span className="leading-relaxed">{toast?.message}</span>
      {toast?.actionLabel && (
        <button className="flex-none rounded-full bg-white/10 px-3 py-1.5 text-[12px] text-white transition-all active:scale-[0.98]" onClick={toast.onAction}>
          {toast.actionLabel}
        </button>
      )}
      {isVisible && !toast?.actionLabel && (
        <button className="sr-only" onClick={onClose}>
          닫기
        </button>
      )}
    </div>
  );
}
