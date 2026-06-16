export default function BottomSheet({ open, onClose, title, children }) {
  if (!open) return null;

  return (
    <div className="absolute inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute left-0 right-0 bottom-0 max-h-[70%] overflow-y-auto rounded-t-lg bg-card p-6 pb-8 shadow-lg">
        <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-border" />
        {title && <h3 className="text-[15px] font-semibold text-text-primary mb-3">{title}</h3>}
        {children}
      </div>
    </div>
  );
}
