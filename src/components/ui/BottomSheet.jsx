export default function BottomSheet({ open, onClose, title, children }) {
  if (!open) return null;

  return (
    <div className="absolute inset-0 z-50">
      <div className="absolute inset-0 bg-black/35 backdrop-blur-[1px]" onClick={onClose} />
      <div className="animate-sheet-up absolute bottom-0 left-0 right-0 max-h-[74%] overflow-y-auto rounded-t-[32px] bg-card p-6 pb-[calc(2rem+env(safe-area-inset-bottom))] shadow-[0_-24px_60px_rgba(17,24,39,0.22)]">
        <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-border" />
        <div className="mb-4 flex items-center justify-between gap-3">
          {title && <h3 className="text-[16px] font-semibold text-text-primary">{title}</h3>}
          <button className="grid h-9 w-9 place-items-center rounded-full bg-bg text-text-secondary transition-all active:scale-[0.96]" onClick={onClose} aria-label="닫기">
            <i className="ti ti-x" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
